import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Settings, 
  Search, 
  Sparkles, 
  X, 
  CheckCircle2,
  CheckCheck,
  Brain,
  Mail,
  ShoppingBag,
  Video,
  Tv,
  UserPlus,
  Trash2,
  VolumeX,
  Play,
  RotateCcw,
  Check,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import type { Notification } from '../../types/notifications';
import { useAeirmist } from '../../context/AeirmistContext';
import { getAvatarUrl } from '../../lib/avatar';
import { logger } from '@/src/utils/logger';

import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  getDoc,
  updateDoc, 
  doc, 
  writeBatch, 
  limit, 
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  setDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

interface NotificationCenterProps {
  onClose: () => void;
  onDashboardClick?: () => void;
  onSettingsClick?: () => void;
  onNavigate?: (tab: 'feed' | 'discover' | 'messenger' | 'profile' | 'settings' | 'videos' | 'dashboard') => void;
  onUserClick?: (user: any) => void;
}

// Map database notification types into correct visual categories
const getCategoryForType = (type: string): 'social' | 'messages' | 'marketplace' | 'videos' | 'stories' | 'system' => {
  const typeStr = String(type).toLowerCase();
  
  if ([
    'message', 'message_media', 'message_voice', 'message_video', 
    'call', 'call_missed', 'video_call_missed', 'store_message', 'message_received'
  ].includes(typeStr) || typeStr.includes('msg') || typeStr.includes('call')) {
    return 'messages';
  }
  
  if ([
    'store_follow', 'review_new', 'store_review', 'product_like', 'product_save', 
    'product_report', 'stock_low', 'product_comment', 'marketplace'
  ].some(x => typeStr.includes(x)) || typeStr.includes('store') || typeStr.includes('product') || typeStr.includes('marketplace')) {
    return 'marketplace';
  }
  
  if ([
    'video_milestone', 'video_comment', 'video_comment_reply', 
    'video_share', 'video_save', 'video_follower'
  ].includes(typeStr) || typeStr.includes('video') || typeStr.includes('milestone')) {
    return 'videos';
  }
  
  if ([
    'story_reply', 'story_react', 'story_mention', 'story_share', 
    'ngl_story_reply', 'ngl_reply', 'story'
  ].some(x => typeStr.includes(x))) {
    return 'stories';
  }
  
  if ([
    'security', 'system', 'verification', 'system_verification', 
    'username_change', 'password_change', 'security_login', 'profile_update', 
    'ngl_message', 'ngl'
  ].some(x => typeStr.includes(x)) || typeStr.includes('security') || typeStr.includes('system') || typeStr.includes('ngl') || typeStr.includes('pass') || typeStr.includes('user')) {
    return 'system';
  }
  
  return 'social';
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ 
  onClose, 
  onDashboardClick, 
  onSettingsClick,
  onNavigate,
  onUserClick
}) => {
  const centerRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { db, user, profile, canWrite, acceptFollowRequest, rejectFollowRequest, toggleFollow, isFollowing, addToast } = useAeirmist();
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  
  const [searchQuery, setSearchQuery] = useState('');
  const [mutedUsernames, setMutedUsernames] = useState<string[]>([]);

  useEffect(() => {
    if (!db || !profile?.id) return;
    const fetchMuted = async () => {
      try {
        const d = await getDoc(doc(db, 'profiles', profile.id, 'settings', 'mutedUsers'));
        if (d.exists()) {
          setMutedUsernames(d.data().mutedUsernames || []);
        }
      } catch (err) {
        logger.warn("Mute sync unavailable", err);
      }
    };
    fetchMuted();
  }, [db, profile?.id]);

  const [hiddenTypes, setHiddenTypes] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('aeirmist_hidden_notification_types') || '[]');
    } catch {
      return [];
    }
  });

  // Calculate total unread count
  const unreadCount = notifications.filter(n => !n.isRead && !n.read).length;

  const handleAction = async (notifId: string, action: string) => {
    const notif = notifications.find(n => n.id === notifId);
    if (!notif) return;

    if (processingIds.has(notifId)) return;

    setProcessingIds(prev => {
      const copy = new Set(prev);
      copy.add(notifId);
      return copy;
    });

    try {
      if (action === 'accept_follow') {
        const requestId = notif.metadata?.requestId;
        const fromId = notif.fromUserId;
        if (requestId && fromId) {
          await acceptFollowRequest(requestId, fromId);
          await markRead(notifId);
          const notifUser = (notif.user?.username && notif.user.username !== 'user' && notif.user.username !== 'null') ? notif.user.username : (notif.user?.name || notif.user?.displayName || 'member');
          addToast?.({
            title: "Request Confirmed",
            message: `You accepted the follow request from @${notifUser}.`,
            type: "success"
          });
        }
      } else if (action === 'reject_follow') {
        const requestId = notif.metadata?.requestId;
        if (requestId) {
          await rejectFollowRequest(requestId);
          await markRead(notifId);
          const notifUser = (notif.user?.username && notif.user.username !== 'user' && notif.user.username !== 'null') ? notif.user.username : (notif.user?.name || notif.user?.displayName || 'member');
          addToast?.({
            title: "Request Removed",
            message: `You declined the follow request from @${notifUser}.`,
            type: "info"
          });
        }
      }
    } catch (e) {
      logger.error("Action execution failed", e);
    } finally {
      setProcessingIds(prev => {
        const copy = new Set(prev);
        copy.delete(notifId);
        return copy;
      });
    }
  };

  // Real-time Firestore sync listener
  useEffect(() => {
    if (!db || !user) return;
    
    const q = query(
      collection(db, 'notifications'),
      where('userId', 'in', [profile?.id, user.uid].filter(Boolean)),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mapped = snapshot.docs
        .map(doc => {
          const d = doc.data();
          const type = String(d.type).toLowerCase();
          const isMessage = ['message', 'message_media', 'message_voice', 'message_video', 'store_message'].includes(type) || type.includes('msg') || type === 'store_message_received' || type.includes('call');
          
          if (isMessage) return null;

          const isSecurityAlert = String(d.type || '').toLowerCase().includes('security') || 
                                  String(d.type || '').toLowerCase().includes('device') ||
                                  String(d.type || '').toLowerCase().includes('login');

          return {
            id: doc.id,
            ...d,
            isRead: d.read,
            timestampMs: d.createdAt?.toMillis ? d.createdAt.toMillis() : (d.createdAt ? new Date(d.createdAt).getTime() : Date.now()),
            user: isSecurityAlert ? {
              name: 'Security Alert',
              avatar: null,
              username: 'security',
              isVerified: true
            } : {
              name: d.user?.name || d.fromUser?.displayName || d.metadata?.senderName || 'Aeirmist User',
              avatar: d.user?.avatar || d.fromUser?.photoURL || d.metadata?.senderPhoto || null,
              username: d.user?.username || (d.fromUser?.displayName ? d.fromUser.displayName.toLowerCase().replace(/\s+/g, '') : (d.metadata?.senderUsername || 'user')),
              isVerified: d.user?.isVerified || false
            }
          };
        })
        .filter(Boolean) as any[];

      setNotifications(mapped);
    }, (error) => {
      logger.warn("Notification center synced with offline mesh", error);
    });

    return () => unsubscribe();
  }, [db, user?.uid]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().catch(e => logger.warn("Error requesting notification permission:", e));
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (centerRef.current && !centerRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (target.closest('[id="alerts-nav-item"]') || target.closest('button[onClick*="setIsNotificationsOpen"]')) {
          return;
        }
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Serial list: Filter out muted and hidden types, and order serially by time
  const getSerialNotifications = () => {
    return notifications.filter(n => {
      // 1. Muted users check
      const username = n.user?.username || n.user?.name || '';
      if (mutedUsernames.includes(username)) return false;

      // 2. Hidden type rules check
      if (hiddenTypes.includes(n.type)) return false;

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const content = (n.message || n.content || '').toLowerCase();
        const name = username.toLowerCase();
        return content.includes(q) || name.includes(q);
      }

      return true;
    }).sort((a, b) => (b.timestampMs || 0) - (a.timestampMs || 0));
  };

  const serialNotifications = getSerialNotifications();

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true, isRead: true })));
    if (!db || !user || !canWrite('mark_all_read', 5000)) return;
    try {
      const batch = writeBatch(db);
      notifications.forEach(n => {
        if (!n.read && !n.isRead) {
          batch.update(doc(db, 'notifications', n.id), { read: true });
        }
      });
      await batch.commit();
    } catch (e) {
      logger.error("Mark all read failed:", e);
    }
  };

  const markRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true, isRead: true } : n));
    if (!db || !canWrite(`mark_read_${id}`, 2000)) return;
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (e) {
      logger.error("Mark read failed:", e);
    }
  };

  const deleteNotification = async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (!db) return;
    try {
      await deleteDoc(doc(db, 'notifications', id));
    } catch (e) {
      logger.error("Delete notification failed:", e);
    }
  };

  const handleMuteUser = async (username: string) => {
    if (!db || !profile?.id) return;
    const list = [...mutedUsernames, username];
    setMutedUsernames(list);
    try {
      await setDoc(doc(db, 'profiles', profile.id, 'settings', 'mutedUsers'), {
        mutedUsernames: arrayUnion(username)
      }, { merge: true });
    } catch (err) {
      logger.error(err);
    }
  };

  const handleHideType = (type: string) => {
    const list = [...hiddenTypes, type];
    setHiddenTypes(list);
    localStorage.setItem('aeirmist_hidden_notification_types', JSON.stringify(list));
  };

  // Follow back toggle
  const handleFollowToggle = async (targetId: string) => {
    if (toggleFollow) {
      await toggleFollow(targetId);
    }
  };

  // View source click
  const handleViewSource = (notif: any) => {
    if (!onNavigate) return;
    
    const cat = getCategoryForType(notif.type);
    if (cat === 'messages') {
      onNavigate('messenger');
    } else if (cat === 'videos') {
      onNavigate('videos');
    } else if (cat === 'marketplace') {
      onNavigate('discover');
    } else if (cat === 'stories' || cat === 'social') {
      onNavigate('feed');
    } else if (cat === 'system') {
      onNavigate('settings');
    } else {
      onNavigate('feed');
    }
    onClose();
  };

  return (
    <>
      {/* Dark backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div 
        ref={centerRef}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 240 }}
        className="fixed inset-y-0 right-0 w-full sm:w-[480px] md:w-[460px] z-[1000] bg-[#121316] border-l border-white/[0.08] shadow-[-20px_0_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-[#E4E6EB]"
      >
        {/* Header */}
        <header className="px-4 py-3.5 pt-[calc(0.875rem+env(safe-area-inset-top,0px))] md:pt-3.5 border-b border-white/[0.08] bg-[#18191C]/90 backdrop-blur-xl relative z-10">
          <div className="flex items-center justify-between gap-3 min-w-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <h2 className="text-xl font-bold tracking-tight text-white leading-none">Notifications</h2>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#1877F2] text-white text-xs font-bold shadow-sm">
                  {unreadCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {unreadCount > 0 && (
                <button 
                  type="button"
                  onClick={markAllRead} 
                  className="px-2.5 py-1.5 rounded-lg hover:bg-white/[0.08] text-xs font-semibold text-[#4599FF] hover:text-[#70B4FF] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Mark all as read"
                >
                  <CheckCheck size={15} />
                  <span className="hidden sm:inline">Mark all read</span>
                </button>
              )}
              
              <button 
                type="button"
                onClick={onClose} 
                className="w-8 h-8 rounded-full bg-[#2A2B30] hover:bg-[#3A3B40] text-[#E4E6EB] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Close"
              >
                <X size={17} />
              </button>
            </div>
          </div>
        </header>

        {/* Notifications Serial Scroll List (No Filter Bar, Pure Serial Flow) */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 sm:p-3 space-y-2 bg-[#121316]">
          {serialNotifications.length > 0 ? (
            serialNotifications.map((notif) => (
              <NotificationItem 
                key={notif.id} 
                notification={notif} 
                onMarkRead={() => markRead(notif.id)} 
                onDelete={deleteNotification}
                onHideType={handleHideType}
                onMuteUser={handleMuteUser}
                onViewSource={handleViewSource}
                onAction={handleAction}
                isProcessing={processingIds.has(notif.id)}
                onUserClick={onUserClick}
                isFollowingUser={isFollowing ? isFollowing(notif.fromUserId || notif.user?.id) : false}
                onFollowToggle={handleFollowToggle}
              />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-24 px-6">
              <div className="w-16 h-16 rounded-full bg-[#1E1F24] border border-white/10 flex items-center justify-center mb-4 text-[#1877F2]">
                <Bell size={28} />
              </div>
              <p className="text-base font-bold text-white mb-1">No notifications</p>
              <p className="text-xs text-[#8A8D91] max-w-xs leading-relaxed">
                When you receive likes, comments, or follow requests, they will appear here serially.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default NotificationCenter;
