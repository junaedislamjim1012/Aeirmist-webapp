import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Check, Heart, Mail, UserPlus, ShieldCheck, Sparkles } from 'lucide-react';
import { useAeirmist } from '../../context/AeirmistContext';
import confetti from 'canvas-confetti';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useAeirmist();

  useEffect(() => {
    const newSuccessToast = toasts.find(t => t.type === 'success' && !t.confettiFired);
    if (newSuccessToast) {
      newSuccessToast.confettiFired = true;
      try {
        confetti({
          particleCount: 25,
          spread: 35,
          origin: { y: 0.1 },
          colors: ['#00f2ff', '#ffffff', '#a855f7'],
          disableForReducedMotion: true,
          zIndex: 99999
        });
      } catch {}
    }
  }, [toasts]);

  return (
    <div 
      className="fixed inset-x-0 top-0 z-[99999] flex flex-col items-center pointer-events-none px-3"
      style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-[420px] flex flex-col items-center gap-2.5">
        <AnimatePresence>
          {toasts.map((toast) => {
            const actionType = String(toast.actionType || toast.type || '').toLowerCase();

            // Derive badge icon matching iOS push style
            let badgeIcon = <Bell size={9} className="text-white" />;
            let badgeBg = 'bg-zinc-700';

            if (actionType.includes('like')) {
              badgeIcon = <Heart size={9} className="text-white fill-white" />;
              badgeBg = 'bg-rose-500';
            } else if (actionType.includes('follow')) {
              badgeIcon = <UserPlus size={9} className="text-white" />;
              badgeBg = 'bg-emerald-500';
            } else if (actionType.includes('msg') || actionType.includes('message')) {
              badgeIcon = <Mail size={9} className="text-white" />;
              badgeBg = 'bg-cyan-500';
            } else if (actionType.includes('security')) {
              badgeIcon = <ShieldCheck size={9} className="text-white" />;
              badgeBg = 'bg-blue-500';
            } else if (toast.type === 'success') {
              badgeIcon = <Check size={9} className="text-white" />;
              badgeBg = 'bg-emerald-500';
            }

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -45, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.94, transition: { duration: 0.18 } }}
                transition={{ type: 'spring', damping: 26, stiffness: 360 }}
                className="w-full pointer-events-auto cursor-pointer"
                onClick={() => {
                  toast.onClick?.();
                  removeToast?.(toast.id);
                }}
              >
                {/* iOS Notification Card Container */}
                <div className="relative rounded-[22px] p-3 sm:p-3.5 bg-[#18181c]/90 hover:bg-[#202026]/95 border border-white/15 backdrop-blur-2xl shadow-[0_14px_36px_rgba(0,0,0,0.65)] flex items-center gap-3 transition-all select-none">
                  
                  {/* Left: Avatar or App Icon with Badge */}
                  <div className="relative shrink-0">
                    {toast.avatar ? (
                      <img 
                        src={toast.avatar} 
                        alt={toast.title}
                        className="w-10 h-10 rounded-[14px] object-cover bg-black/60 border border-white/15 shadow-inner"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/icon-192.png';
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/15 flex items-center justify-center text-white shadow-inner">
                        {toast.icon || <Bell size={18} className="text-white" />}
                      </div>
                    )}

                    {/* Corner App Icon Badge */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${badgeBg} border border-black flex items-center justify-center shadow-md`}>
                      {badgeIcon}
                    </div>
                  </div>

                  {/* Middle: Title & Message */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <h4 className="text-[13px] font-bold text-white tracking-tight truncate leading-tight">
                        {toast.title}
                      </h4>
                      <span className="text-[11px] text-zinc-400 font-medium shrink-0 whitespace-nowrap">
                        {toast.timeAgo || 'Just now'}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-200 font-normal leading-snug mt-0.5 line-clamp-2">
                      {toast.message}
                    </p>
                  </div>

                  {/* Right: Optional Image Thumbnail */}
                  {toast.image && (
                    <div className="shrink-0 w-10 h-10 rounded-xl overflow-hidden border border-white/15 bg-black/50">
                      <img 
                        src={toast.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}

                  {/* Subtle Close Action */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeToast?.(toast.id);
                    }}
                    className="p-1 -mr-1 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    title="Dismiss"
                  >
                    <X size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
