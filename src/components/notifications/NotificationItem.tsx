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
  Sparkles
} from 'lucide-react';
import { getAvatarUrl as getAvatarUrlHelper } from '../../lib/avatar';

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

  // Time Formatter matching iOS style: Just Now, 5s ago, 2m ago, 1h ago, Yesterday, 3d ago, etc.
  const formatNotificationTime = (timestampMs: number): string => {
    if (!timestampMs) return 'Just Now';
    const now = Date.now();
    const diffSec = Math.floor((now - timestampMs) / 1000);
    
    if (diffSec < 5) return 'Just Now';
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
    if (diffMo < 12) return `${diffMo}mo ago`;
    
    const diffYr = Math.floor(diffDay / 365);
    return `${diffYr}y ago`;
  };

  const getAvatarUrl = () => {
    return getAvatarUrlHelper(notification.user?.avatar || notification.user?.photoURL, notification.user?.name || notification.user?.username);
  };

  const getUserDisplayName = () => {
    return notification.user?.name || notification.user?.displayName || notification.user?.username || 'Someone';
  };

  const getUserHandle = () => {
    return notification.user?.username ? `@${notification.user.username}` : getUserDisplayName();
  };

  const displayTime = formatNotificationTime(
    notification.timestampMs || 
    (notification.createdAt?.toMillis ? notification.createdAt.toMillis() : Date.now())
  );

  // Derive title, subtitle and action icon matching iOS reference design
  const getCardContent = () => {
    const type = String(notification.type || '').toLowerCase();
    const name = getUserDisplayName();
    const handle = getUserHandle();

    if (type === 'follow_request') {
      return {
        title: name,
        subtitle: `${handle} requested to follow you.`,
        badgeIcon: <UserPlus size={10} className="text-amber-400" />,
        badgeBg: 'bg-amber-500/25 border-amber-400/40 text-amber-400'
      };
    }

    if (type === 'follow_accept') {
      return {
        title: 'Follow request accepted',
        subtitle: `${handle} accepted your follow request.`,
        badgeIcon: <Check size={10} className="text-emerald-400" />,
        badgeBg: 'bg-emerald-500/25 border-emerald-400/40 text-emerald-400'
      };
    }

    if (type === 'follow' || type === 'follow_back') {
      return {
        title: name,
        subtitle: `${handle} started following you.`,
        badgeIcon: <UserPlus size={10} className="text-emerald-400" />,
        badgeBg: 'bg-emerald-500/25 border-emerald-400/40 text-emerald-400'
      };
    }

    if (type === 'message_request') {
      return {
        title: name,
        subtitle: `${handle} sent you a message request.`,
        badgeIcon: <Mail size={10} className="text-aeirmist-cyan" />,
        badgeBg: 'bg-aeirmist-cyan/25 border-aeirmist-cyan/40 text-aeirmist-cyan'
      };
    }

    if (type === 'message' || type.includes('msg')) {
      const rawText = notification.message || 'Sent you a message';
      const cleanText = rawText.startsWith('Sent you') ? rawText : `"${rawText}"`;
      return {
        title: name,
        subtitle: cleanText,
        badgeIcon: <Mail size={10} className="text-aeirmist-cyan" />,
        badgeBg: 'bg-aeirmist-cyan/25 border-aeirmist-cyan/40 text-aeirmist-cyan'
      };
    }

    if (type === 'like' || type === 'post_like' || type === 'comment_like') {
      return {
        title: name,
        subtitle: notification.groupedCount && notification.groupedCount > 1 
          ? `${name} and ${notification.groupedCount - 1} others liked your post.`
          : `${handle} liked your post.`,
        badgeIcon: <Heart size={10} className="text-rose-500 fill-rose-500" />,
        badgeBg: 'bg-rose-500/25 border-rose-400/40 text-rose-500'
      };
    }

    if (type === 'comment' || type === 'comment_reply') {
      return {
        title: name,
        subtitle: notification.groupedCount && notification.groupedCount > 1
          ? `${name} and ${notification.groupedCount - 1} others commented on your post.`
          : (notification.message || `${handle} commented on your post.`),
        badgeIcon: <MessageSquare size={10} className="text-aeirmist-cyan" />,
        badgeBg: 'bg-aeirmist-cyan/25 border-aeirmist-cyan/40 text-aeirmist-cyan'
      };
    }

    if (type === 'share' || type.includes('video') || type.includes('reel')) {
      return {
        title: name,
        subtitle: `${handle} shared a video with you.`,
        badgeIcon: <Video size={10} className="text-purple-400" />,
        badgeBg: 'bg-purple-500/25 border-purple-400/40 text-purple-400'
      };
    }

    if (type === 'mention' || type === 'story_mention') {
      return {
        title: name,
        subtitle: `${handle} mentioned you.`,
        badgeIcon: <Sparkles size={10} className="text-aeirmist-lime" />,
        badgeBg: 'bg-aeirmist-lime/25 border-aeirmist-lime/40 text-aeirmist-lime'
      };
    }

    // Default Fallback
    return {
      title: name,
      subtitle: notification.message || notification.content || 'Sent you an alert.',
      badgeIcon: <Bell size={10} className="text-white/80" />,
      badgeBg: 'bg-white/10 border-white/20 text-white'
    };
  };

  const { title, subtitle, badgeIcon, badgeBg } = getCardContent();
  const isUnread = !(notification.read || notification.isRead);

  // Smart click navigation
  const handleCardClick = (e: React.MouseEvent) => {
    onMarkRead?.(notification.id);

    const isProfileType = [
      'follow', 'follow_accept', 'follow_back', 'store_follow', 'video_follower',
      'like', 'comment_like', 'post_like', 'comment', 'comment_reply', 'mention', 'story_mention'
    ].includes(String(notification.type).toLowerCase());

    if (isProfileType && onUserClick && (notification.user || notification.fromUserId)) {
      const targetUser = {
        ...notification.user,
        id: notification.fromUserId || notification.user?.id || notification.user?.uid,
        uid: notification.fromUserId || notification.user?.uid || notification.user?.id,
        displayName: notification.user?.name || notification.user?.displayName || 'Aeirmist User',
        photoURL: getAvatarUrlHelper(notification.user?.avatar || notification.user?.photoURL, notification.id),
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
      className={`relative group rounded-[22px] p-3.5 sm:p-4 bg-[#14151B]/85 hover:bg-[#1A1C24]/90 border transition-all duration-200 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.45)] cursor-pointer overflow-hidden ${
        isUnread ? 'border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]' : 'border-white/[0.08]'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Left Side: Avatar with Badging */}
        <div className="relative shrink-0">
          <img 
            src={getAvatarUrl()} 
            alt={title} 
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-[16px] object-cover bg-black/60 border border-white/15"
          />

          {/* Top-Right Count Bubble (when grouped, e.g. '11', '54' matching reference) */}
          {notification.groupedCount && notification.groupedCount > 1 ? (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-black text-[10px] font-black flex items-center justify-center shadow-md">
              {notification.groupedCount}
            </span>
          ) : null}

          {/* Bottom-Right Action Icon Badge (matching mini app icon in screenshot) */}
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${badgeBg} border flex items-center justify-center shadow-md backdrop-blur-md`}>
            {badgeIcon}
          </div>
        </div>

        {/* Center: Title, Subtitle, and Optional Action Buttons */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <h4 className="text-[13px] sm:text-sm font-bold text-white tracking-tight truncate">
                {title}
              </h4>
              {notification.user?.isVerified && (
                <ShieldCheck className="text-aeirmist-cyan shrink-0" size={13} />
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[11px] text-white/45 font-medium whitespace-nowrap">
                {displayTime}
              </span>

              {/* Discreet Delete Button */}
              {onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification.id);
                  }}
                  className={`p-1 -mr-1 rounded-lg text-white/30 hover:text-rose-400 hover:bg-rose-500/15 transition-all ${
                    isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0'
                  }`}
                  title="Remove"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-white/70 font-normal leading-relaxed mt-0.5 truncate">
            {subtitle}
          </p>

          {/* Follow Request Inline Actions (Accept / Delete) */}
          {notification.type === 'follow_request' && onAction && (
            <div className="flex items-center gap-2 mt-2.5" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onAction(notification.id, 'accept_follow')}
                disabled={isProcessing}
                className="px-4 py-1.5 rounded-full bg-white text-black hover:bg-white/90 text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-sm active:scale-95"
              >
                {isProcessing ? 'Accepting...' : 'Accept'}
              </button>
              <button
                type="button"
                onClick={() => onAction(notification.id, 'reject_follow')}
                disabled={isProcessing}
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium border border-white/10 transition-all disabled:opacity-50 cursor-pointer active:scale-95"
              >
                {isProcessing ? 'Declining...' : 'Delete'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Media Thumbnail Preview (if post or video attached) */}
        {notification.metadata?.postImage && (
          <div className="shrink-0 w-11 h-11 rounded-xl overflow-hidden border border-white/15 bg-black/50 ml-0.5">
            <img 
              src={notification.metadata.postImage} 
              alt="Post preview"
              className="w-full h-full object-cover" 
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
