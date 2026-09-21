import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Check, Heart, Mail, UserPlus, ShieldCheck, AlertCircle } from 'lucide-react';
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

  // Limit to maximum 2 visible stacked notifications to prevent screen takeover
  const visibleToasts = toasts.slice(-2);

  return (
    <div 
      className="fixed inset-x-0 top-0 z-[99999] flex flex-col items-center pointer-events-none px-3"
      style={{ paddingTop: 'calc(0.5rem + env(safe-area-inset-top, 0px))' }}
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-[380px] flex flex-col items-center gap-2">
        <AnimatePresence mode="popLayout">
          {visibleToasts.map((toast) => {
            const actionType = String(toast.actionType || toast.type || '').toLowerCase();

            // Derive badge icon and accent matching neon aesthetic
            let badgeIcon = <Bell size={8} className="text-white" />;
            let badgeBg = 'bg-zinc-700';
            let borderColor = 'border-white/10 hover:border-cyan-500/30';

            if (actionType.includes('like')) {
              badgeIcon = <Heart size={8} className="text-white fill-white" />;
              badgeBg = 'bg-rose-500';
              borderColor = 'border-rose-500/20';
            } else if (actionType.includes('follow')) {
              badgeIcon = <UserPlus size={8} className="text-white" />;
              badgeBg = 'bg-emerald-500';
              borderColor = 'border-emerald-500/20';
            } else if (actionType.includes('msg') || actionType.includes('message')) {
              badgeIcon = <Mail size={8} className="text-white" />;
              badgeBg = 'bg-aeirmist-cyan';
              borderColor = 'border-aeirmist-cyan/30';
            } else if (actionType.includes('verified') || actionType.includes('verification')) {
              badgeIcon = <ShieldCheck size={8} className="text-white" />;
              badgeBg = 'bg-aeirmist-cyan';
              borderColor = 'border-aeirmist-cyan/50 shadow-[0_0_20px_rgba(0,242,255,0.25)]';
            } else if (actionType.includes('security')) {
              badgeIcon = <ShieldCheck size={8} className="text-white" />;
              badgeBg = 'bg-blue-500';
              borderColor = 'border-blue-500/20';
            } else if (toast.type === 'success') {
              badgeIcon = <Check size={8} className="text-black" />;
              badgeBg = 'bg-aeirmist-lime';
              borderColor = 'border-aeirmist-lime/30';
            } else if (toast.type === 'warning' || toast.type === 'error') {
              badgeIcon = <AlertCircle size={8} className="text-white" />;
              badgeBg = 'bg-aeirmist-magenta';
              borderColor = 'border-aeirmist-magenta/30';
            }

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.92, transition: { duration: 0.15 } }}
                transition={{ type: 'spring', damping: 28, stiffness: 400 }}
                className="w-full pointer-events-auto cursor-pointer"
                onClick={() => {
                  toast.onClick?.();
                  removeToast?.(toast.id);
                }}
              >
                {/* Neon Black & Translucent Glass Notification Card */}
                <div className={`relative rounded-2xl p-2.5 sm:p-3 bg-[#08090d]/92 border ${borderColor} backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.85)] flex items-center gap-2.5 transition-all select-none group`}>
                  
                  {/* Square Profile Avatar with Badge */}
                  <div className="relative shrink-0">
                    {toast.avatar ? (
                      <img 
                        src={toast.avatar} 
                        alt={toast.title}
                        className="w-9 h-9 rounded-xl object-cover bg-black/80 border border-white/15 shadow-inner"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/icon-192.png';
                        }}
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#12141c] to-[#0a0b10] border border-white/15 flex items-center justify-center text-white shadow-inner">
                        {toast.icon || (
                          toast.type === 'success' ? <Check size={16} className="text-aeirmist-lime" /> :
                          toast.type === 'warning' ? <AlertCircle size={16} className="text-aeirmist-magenta" /> :
                          <Bell size={16} className="text-aeirmist-cyan" />
                        )}
                      </div>
                    )}

                    {/* Corner App Icon Badge */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-md ${badgeBg} border border-black flex items-center justify-center shadow-md`}>
                      {badgeIcon}
                    </div>
                  </div>

                  {/* Title & Message */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <h4 className="text-xs font-bold text-white tracking-tight truncate leading-tight">
                        {toast.title}
                      </h4>
                      <span className="text-[9px] font-mono text-white/40 shrink-0 whitespace-nowrap">
                        {toast.timeAgo || 'Just now'}
                      </span>
                    </div>

                    <p className="text-[11px] text-white/70 font-normal leading-snug mt-0.5 line-clamp-1">
                      {toast.message}
                    </p>
                  </div>

                  {/* Right Thumbnail if attached */}
                  {toast.image && (
                    <div className="shrink-0 w-8 h-8 rounded-lg overflow-hidden border border-white/15 bg-black/50">
                      <img 
                        src={toast.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}

                  {/* Dismiss Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeToast?.(toast.id);
                    }}
                    className="p-1 text-white/30 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                    title="Dismiss"
                  >
                    <X size={12} />
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
