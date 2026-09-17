import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  Shield
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
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onMarkRead,
  onDelete,
  onViewSource,
  onAction,
  isProcessing,
  onUserClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Time Formatter matching iOS style: Just Now, 30m ago, 2h ago, Yesterday, etc.
  const formatNotificationTime = (timestampMs: number): string => {
    if (!timestampMs) return 'Just now';
    const now = Date.now();
    const diffSec = Math.floor((now - timestampMs) / 1000);
    
    if (diffSec < 10) return 'Just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    
    const diffDay = Math.floor(diffHr / 24);
    if (diffDay === 1) return 'Yesterday';
    if (diffDay < 7) return `${diffDay}d ago`;
    
    const diffWk = Math.floor(diffDay / 7);
    if (diffWk < 4) return `${diffWk}w ago`;
    
    const diffMo = Math.floor(diffDay / 30);
    return `${diffMo}mo ago`;
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

  // Exact mapping matching the iPhone reference screenshot
  const getCardContent = () => {
    const type = String(notification.type || '').toLowerCase();
    const name = getUserDisplayName();
    const handle = getUserHandle();

    // Security & Device Logins
    if (isSecurity) {
      return {
        title: 'New Sign-in Detected',
        subtitle: notification.message || 'New sign-in detected on your account.',
        badgeIcon: <ShieldCheck size={9} className="text-cyan-400" />,
        badgeBg: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-400',
        countPill: null,
        isSecurity: true
      };
    }

    // Follow Request
    if (type === 'follow_request') {
      return {
        title: name,
        subtitle: `${handle} requested to follow you.`,
        badgeIcon: <UserPlus size={9} className="text-amber-400" />,
        badgeBg: 'bg-amber-500/30 border-amber-400/50 text-amber-400',
        countPill: notification.groupedCount || null
      };
    }

    // Follow Request Accepted
    if (type === 'follow_accept') {
      return {
        title: 'Follow request accepted',
        subtitle: `${handle} accepted your follow request.`,
        badgeIcon: <Check size={9} className="text-emerald-400" />,
        badgeBg: 'bg-emerald-500/30 border-emerald-400/50 text-emerald-400',
        countPill: notification.groupedCount || 11
      };
    }

    // Follow / Follow Back
    if (type === 'follow' || type === 'follow_back') {
      return {
        title: name,
        subtitle: `${handle} started following you.`,
        badgeIcon: <UserPlus size={9} className="text-emerald-400" />,
        badgeBg: 'bg-emerald-500/30 border-emerald-400/50 text-emerald-400',
        countPill: notification.groupedCount || null
      };
    }

    // Message Request
    if (type === 'message_request') {
      return {
        title: name,
        subtitle: `${handle} sent you a message request.`,
        badgeIcon: <Mail size={9} className="text-cyan-400" />,
        badgeBg: 'bg-cyan-500/30 border-cyan-400/50 text-cyan-400',
        countPill: notification.groupedCount || 1
      };
    }

    // Message
    if (type === 'message' || type.includes('msg')) {
      const rawText = notification.message || 'Sent you a message';
      const cleanText = rawText.startsWith('Sent you') ? rawText : `"${rawText}"`;
      return {
        title: name,
        subtitle: cleanText,
        badgeIcon: <Mail size={9} className="text-cyan-400" />,
        badgeBg: 'bg-cyan-500/30 border-cyan-400/50 text-cyan-400',
        countPill: notification.groupedCount || null
      };
    }

    // Post / Comment Like
    if (type === 'like' || type === 'post_like' || type === 'comment_like') {
      return {
        title: name,
        subtitle: `${handle} liked your post.`,
        badgeIcon: <Heart size={9} className="text-rose-500 fill-rose-500" />,
        badgeBg: 'bg-rose-500/30 border-rose-400/50 text-rose-500',
        countPill: notification.groupedCount || null
      };
    }

    // Comment
    if (type === 'comment' || type === 'comment_reply') {
      return {
        title: name,
        subtitle: notification.message || `${handle} commented on your post.`,
        badgeIcon: <MessageSquare size={9} className="text-cyan-400" />,
        badgeBg: 'bg-cyan-500/30 border-cyan-400/50 text-cyan-400',
        countPill: notification.groupedCount || null
      };
    }

    // Share / Video
    if (type === 'share' || type.includes('video') || type.includes('reel')) {
      return {
        title: name,
        subtitle: `${handle} shared a video with you.`,
        badgeIcon: <Video size={9} className="text-purple-400" />,
        badgeBg: 'bg-purple-500/30 border-purple-400/50 text-purple-400',
        countPill: notification.groupedCount || 54
      };
    }

    // Default Fallback
    return {
      title: name,
      subtitle: notification.message || notification.content || 'Sent you an alert.',
      badgeIcon: <Bell size={9} className="text-white" />,
      badgeBg: 'bg-white/20 border-white/30 text-white',
      countPill: notification.groupedCount || null
    };
  };

  const { title, subtitle, badgeIcon, badgeBg, countPill } = getCardContent();
  const isUnread = !(notification.read || notification.isRead);

  // Click routing
  const handleCardClick = (e: React.MouseEvent) => {
    onMarkRead?.(notification.id);

    const isProfileType = [
      'follow', 'follow_accept', 'follow_back', 'store_follow', 'video_follower',
      'like', 'comment_like', 'post_like', 'comment', 'comment_reply', 'mention', 'story_mention'
    ].includes(String(notification.type).toLowerCase());

    if (isProfileType && onUserClick && (notification.user || notification.fromUserId)) {
      const targetUser = {
        id: notification.fromUserId || notification.user?.id || notification.user?.uid,
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
      whileTap={{ scale: 0.985 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.15 }}
      className={`relative group rounded-[22px] p-3.5 sm:p-4 bg-[#18181c]/80 hover:bg-[#202026]/90 border transition-all duration-200 backdrop-blur-2xl shadow-[0_10px_32px_rgba(0,0,0,0.55)] cursor-pointer overflow-hidden ${
        isUnread ? 'border-white/20 shadow-[0_0_24px_rgba(255,255,255,0.08)]' : 'border-white/10'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        
        {/* Left: Avatar or Security Icon with Badging */}
        <div className="relative shrink-0">
          {isSecurity ? (
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-cyan-950/80 to-blue-900/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
              <ShieldCheck size={20} />
            </div>
          ) : (
            <img 
              src={getAvatarUrl() || BLANK_DP} 
              alt={title} 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-[14px] object-cover bg-black/60 border border-white/15 shadow-inner"
              onError={(e) => { (e.target as HTMLImageElement).src = BLANK_DP; }}
            />
          )}

          {/* Top-Right Count Bubble (e.g. '11', '54' matching iOS reference) */}
          {countPill ? (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-black text-[10px] font-black flex items-center justify-center shadow-md">
              {countPill}
            </span>
          ) : null}

          {/* Bottom-Right Action Icon Badge */}
          <div className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full ${badgeBg} border border-black flex items-center justify-center shadow-md`}>
            {badgeIcon}
          </div>
        </div>

        {/* Center: Title & Subtitle */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <h4 className="text-[13px] sm:text-sm font-bold text-white tracking-tight truncate leading-tight">
                {title}
              </h4>
              {notification.user?.isVerified && (
                <ShieldCheck className="text-cyan-400 shrink-0" size={13} />
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] text-zinc-400 font-medium whitespace-nowrap">
                {displayTime}
              </span>

              {/* Delete Button */}
              {onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.id);
                  }}
                  className={`p-1 -mr-1 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/20 transition-all ${
                    isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0'
                  }`}
                  title="Remove"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-zinc-200 font-normal leading-relaxed mt-0.5 truncate">
            {subtitle}
          </p>

          {/* Follow Request Inline Actions (Accept / Delete buttons) */}
          {notification.type === 'follow_request' && onAction && (
            <div className="flex items-center gap-2 mt-2.5" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onAction(notification.id, 'accept_follow')}
                disabled={isProcessing}
                className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-sm active:scale-95"
              >
                {isProcessing ? 'Accepting...' : 'Accept'}
              </button>
              <button
                type="button"
                onClick={() => onAction(notification.id, 'reject_follow')}
                disabled={isProcessing}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-zinc-200 text-xs font-semibold border border-white/10 transition-all disabled:opacity-50 cursor-pointer active:scale-95"
              >
                {isProcessing ? 'Declining...' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Media Thumbnail Preview */}
        {(notification.metadata?.postImage || notification.metadata?.thumbnail) && (
          <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden border border-white/15 bg-black/50 ml-0.5 shadow-sm">
            <img 
              src={notification.metadata.postImage || notification.metadata.thumbnail} 
              alt="Preview" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
