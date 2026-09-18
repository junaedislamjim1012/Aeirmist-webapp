import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  MessageSquare, 
  UserPlus, 
  Bell, 
  Mail, 
  Video, 
  Check, 
  X, 
  ShieldCheck, 
  Sparkles,
  Shield,
  MoreHorizontal,
  CheckCheck,
  Trash2,
  BellOff,
  ShoppingBag,
  Tv
} from 'lucide-react';
import { getAvatarUrl as getAvatarUrlHelper, BLANK_DP } from '../../lib/avatar';

interface NotificationItemProps {
  notification: any;
  onMarkRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onHideType?: (type: string) => void;
  onMuteUser?: (username: string) => void;
  onViewSource?: (notification: any) => void;
  onAction?: (id: string, action: string) => void;
  isProcessing?: boolean;
  onUserClick?: (user: any) => void;
  isFollowingUser?: boolean;
  onFollowToggle?: (userId: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkRead,
  onDelete,
  onHideType,
  onMuteUser,
  onViewSource,
  onAction,
  isProcessing,
  onUserClick,
  isFollowingUser,
  onFollowToggle
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  // Meta / Instagram style time formatter
  const formatNotificationTime = (timestampMs: number): string => {
    if (!timestampMs) return 'Just now';
    const now = Date.now();
    const diffSec = Math.floor((now - timestampMs) / 1000);
    
    if (diffSec < 10) return 'Just now';
    if (diffSec < 60) return `${diffSec}s`;
    
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m`;
    
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h`;
    
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay === 1) return 'Yesterday';
    if (diffDay < 7) return `${diffDay}d`;
    
    const diffWk = Math.floor(diffDay / 7);
    if (diffWk < 4) return `${diffWk}w`;
    
    const diffMo = Math.floor(diffDay / 30);
    return `${diffMo}mo`;
  };

  const isSecurity = String(notification.type || '').toLowerCase().includes('security') || 
                     String(notification.type || '').toLowerCase().includes('device') ||
                     String(notification.type || '').toLowerCase().includes('login');

  const getUserDisplayName = () => {
    if (isSecurity) return 'Security Alert';
    return notification.user?.name || notification.user?.displayName || notification.fromUser?.displayName || 'Aeirmist User';
  };

  const getUserHandle = () => {
    if (isSecurity) return '@security';
    return notification.user?.username ? `@${notification.user.username}` : `@${getUserDisplayName().toLowerCase().replace(/\s+/g, '')}`;
  };

  const getAvatarUrl = () => {
    if (isSecurity) return null;
    return getAvatarUrlHelper(notification.user?.avatar || notification.user?.photoURL || notification.fromUser?.photoURL, notification.user?.name || notification.id);
  };

  const displayTime = formatNotificationTime(
    notification.timestampMs || 
    (notification.createdAt?.toMillis ? notification.createdAt.toMillis() : Date.now())
  );

  // Meta-style sentence configuration and action icons
  const getMetaContent = () => {
    const type = String(notification.type || '').toLowerCase();

    // Security & Logins
    if (isSecurity) {
      return {
        actionText: 'New sign-in detected on your account.',
        badgeIcon: <ShieldCheck size={10} className="text-white" />,
        badgeBg: 'bg-[#00B2FF]',
        category: 'system'
      };
    }

    // Follow Request
    if (type === 'follow_request') {
      return {
        actionText: 'requested to follow you.',
        badgeIcon: <UserPlus size={10} className="text-white" />,
        badgeBg: 'bg-[#F59E0B]',
        category: 'social'
      };
    }

    // Follow Request Accepted
    if (type === 'follow_accept') {
      return {
        actionText: 'accepted your follow request.',
        badgeIcon: <Check size={10} className="text-white" />,
        badgeBg: 'bg-[#00BA7C]',
        category: 'social'
      };
    }

    // Follow / Follow Back
    if (type === 'follow' || type === 'follow_back') {
      return {
        actionText: type === 'follow_back' ? 'followed you back.' : 'started following you.',
        badgeIcon: <UserPlus size={10} className="text-white" />,
        badgeBg: 'bg-[#1877F2]',
        category: 'social'
      };
    }

    // Message Request
    if (type === 'message_request') {
      return {
        actionText: 'sent you a message request.',
        badgeIcon: <Mail size={10} className="text-white" />,
        badgeBg: 'bg-[#00B2FF]',
        category: 'messages'
      };
    }

    // Message
    if (type === 'message' || type.includes('msg')) {
      return {
        actionText: 'sent you a message.',
        snippet: notification.message ? `"${notification.message}"` : null,
        badgeIcon: <Mail size={10} className="text-white" />,
        badgeBg: 'bg-[#00B2FF]',
        category: 'messages'
      };
    }

    // Post / Comment Like
    if (type === 'like' || type === 'post_like' || type === 'comment_like') {
      return {
        actionText: type === 'comment_like' ? 'liked your comment.' : 'liked your post.',
        badgeIcon: <Heart size={10} className="text-white fill-white" />,
        badgeBg: 'bg-[#E41E3F]',
        category: 'social'
      };
    }

    // Comment
    if (type === 'comment' || type === 'comment_reply') {
      return {
        actionText: type === 'comment_reply' ? 'replied to your comment:' : 'commented on your post:',
        snippet: notification.message ? `"${notification.message}"` : null,
        badgeIcon: <MessageSquare size={10} className="text-white fill-white" />,
        badgeBg: 'bg-[#00BA7C]',
        category: 'social'
      };
    }

    // Video / Reel / Share
    if (type === 'share' || type.includes('video') || type.includes('reel')) {
      return {
        actionText: 'shared a video with you.',
        badgeIcon: <Video size={10} className="text-white" />,
        badgeBg: 'bg-[#873CE0]',
        category: 'videos'
      };
    }

    // Story React / Reply
    if (type.includes('story')) {
      return {
        actionText: type.includes('react') ? 'reacted to your story.' : 'replied to your story.',
        badgeIcon: <Tv size={10} className="text-white" />,
        badgeBg: 'bg-[#E41E3F]',
        category: 'stories'
      };
    }

    // Market / Product
    if (type.includes('store') || type.includes('product') || type.includes('market')) {
      return {
        actionText: notification.message || 'interacted with your store.',
        badgeIcon: <ShoppingBag size={10} className="text-white" />,
        badgeBg: 'bg-[#FA7B17]',
        category: 'marketplace'
      };
    }

    // Default Fallback
    return {
      actionText: notification.message || notification.content || 'sent you a notification.',
      badgeIcon: <Bell size={10} className="text-white" />,
      badgeBg: 'bg-[#1877F2]',
      category: 'system'
    };
  };

  const { actionText, snippet, badgeIcon, badgeBg } = getMetaContent();
  const isUnread = !(notification.read || notification.isRead);
  const displayName = getUserDisplayName();
  const targetUserId = notification.fromUserId || notification.user?.id || notification.user?.uid;

  // Handle row click
  const handleCardClick = (e: React.MouseEvent) => {
    onMarkRead?.(notification.id);

    const isProfileType = [
      'follow', 'follow_accept', 'follow_back', 'store_follow', 'video_follower',
      'like', 'comment_like', 'post_like', 'comment', 'comment_reply', 'mention', 'story_mention'
    ].includes(String(notification.type).toLowerCase());

    if (isProfileType && onUserClick && targetUserId) {
      const targetUser = {
        id: targetUserId,
        displayName: notification.user?.name || notification.user?.displayName || 'Aeirmist User',
        photoURL: getAvatarUrl(),
        username: notification.user?.username || 'user'
      };
      onUserClick(targetUser);
    } else {
      onViewSource?.(notification);
    }
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.15 }}
      className={`relative group rounded-xl p-3 sm:p-3.5 transition-all duration-150 cursor-pointer overflow-hidden ${
        isUnread 
          ? 'bg-[#1877F2]/[0.08] hover:bg-[#1877F2]/[0.12] border border-[#1877F2]/20' 
          : 'bg-[#18191A]/60 hover:bg-[#242526] border border-white/[0.04]'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-3 min-w-0">
        
        {/* Left: Avatar with Overlapping Meta Action Badge */}
        <div className="relative shrink-0">
          {isSecurity ? (
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-900/80 to-blue-900/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shadow-inner">
              <ShieldCheck size={22} />
            </div>
          ) : (
            <img 
              src={getAvatarUrl() || BLANK_DP} 
              alt={displayName} 
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover bg-black/60 ring-1 ring-white/10 shadow-sm"
              onError={(e) => { (e.target as HTMLImageElement).src = BLANK_DP; }}
            />
          )}

          {/* Overlapping Meta Action Badge */}
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${badgeBg} ring-2 ring-[#18191A] flex items-center justify-center shadow-md`}>
            {badgeIcon}
          </div>
        </div>

        {/* Center: Meta Typography Single-Sentence Flow */}
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-[13px] sm:text-[13.5px] leading-snug text-[#E4E6EB]">
            <strong 
              className="font-bold text-white hover:underline cursor-pointer inline-flex items-center gap-1 mr-1"
              onClick={(e) => {
                if (onUserClick && targetUserId && !isSecurity) {
                  e.stopPropagation();
                  onUserClick({
                    id: targetUserId,
                    displayName,
                    photoURL: getAvatarUrl(),
                    username: notification.user?.username || 'user'
                  });
                }
              }}
            >
              {displayName}
              {notification.user?.isVerified && (
                <ShieldCheck className="text-[#00B2FF] inline-block shrink-0" size={13} />
              )}
            </strong>
            <span className="text-[#D8DADF]">{actionText}</span>
            <span className="text-xs text-[#8A8D91] font-normal whitespace-nowrap ml-1.5">
              {displayTime}
            </span>
          </p>

          {/* Optional snippet (e.g. comment text) */}
          {snippet && (
            <p className="text-xs text-[#B0B3B8] line-clamp-1 mt-0.5 font-normal">
              {snippet}
            </p>
          )}

          {/* Follow Request Inline Actions (Confirm / Delete buttons) */}
          {notification.type === 'follow_request' && onAction && (
            <div className="flex items-center gap-2 mt-2.5" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onAction(notification.id, 'accept_follow')}
                disabled={isProcessing}
                className="px-4 py-1.5 rounded-lg bg-[#0064E0] hover:bg-[#1877F2] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-sm active:scale-95"
              >
                {isProcessing ? 'Confirming...' : 'Confirm'}
              </button>
              <button
                type="button"
                onClick={() => onAction(notification.id, 'reject_follow')}
                disabled={isProcessing}
                className="px-3.5 py-1.5 rounded-lg bg-[#3A3B3C] hover:bg-[#4E4F50] text-[#E4E6EB] text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer active:scale-95"
              >
                {isProcessing ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Meta-style Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          
          {/* Follow / Follow Back Button for new followers */}
          {(notification.type === 'follow' || notification.type === 'follow_back') && targetUserId && onFollowToggle && (
            <button
              type="button"
              onClick={() => onFollowToggle(targetUserId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                isFollowingUser
                  ? 'bg-[#3A3B3C] hover:bg-[#4E4F50] text-zinc-200'
                  : 'bg-[#0064E0] hover:bg-[#1877F2] text-white shadow-sm'
              }`}
            >
              {isFollowingUser ? 'Following' : 'Follow Back'}
            </button>
          )}

          {/* Media Thumbnail Preview */}
          {(notification.metadata?.postImage || notification.metadata?.thumbnail) && (
            <div className="w-11 h-11 rounded-lg overflow-hidden border border-white/10 bg-black/50 shadow-sm shrink-0">
              <img 
                src={notification.metadata.postImage || notification.metadata.thumbnail} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
            </div>
          )}

          {/* Meta Unread Blue Dot Indicator */}
          {isUnread && (
            <div 
              className="w-2.5 h-2.5 rounded-full bg-[#1877F2] shrink-0 shadow-[0_0_8px_rgba(24,119,242,0.9)]" 
              title="Unread"
            />
          )}

          {/* Meta 3-dots Context Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(prev => !prev);
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[#B0B3B8] hover:text-white hover:bg-white/10 transition-all cursor-pointer ${
                showMenu || isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0 group-hover:opacity-100'
              }`}
              title="More options"
            >
              <MoreHorizontal size={16} />
            </button>

            {/* Dropdown Options */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-8 z-50 w-48 py-1.5 bg-[#242526] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl text-xs"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowMenu(false);
                      onMarkRead?.(notification.id);
                    }}
                    className="w-full px-3.5 py-2 text-left text-[#E4E6EB] hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <CheckCheck size={14} className="text-[#1877F2]" />
                    <span>Mark as read</span>
                  </button>

                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        onDelete(notification.id);
                      }}
                      className="w-full px-3.5 py-2 text-left text-rose-400 hover:bg-rose-500/15 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                      <span>Remove notification</span>
                    </button>
                  )}

                  {onHideType && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        onHideType(notification.type);
                      }}
                      className="w-full px-3.5 py-2 text-left text-[#B0B3B8] hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <BellOff size={14} />
                      <span>Turn off this type</span>
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.div>
  );
};
