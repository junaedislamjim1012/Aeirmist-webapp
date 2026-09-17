import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, ChevronRight, Database } from 'lucide-react';
import { OfflineScreen } from '../offline/OfflineScreen';

export const OfflineBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showFullOffline, setShowFullOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
    };
    const handleOffline = () => {
      setIsOffline(true);
    };
    const handleOpenHub = () => {
      setShowFullOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('open-offline-sanctuary', handleOpenHub);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('open-offline-sanctuary', handleOpenHub);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOffline && !showFullOffline && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 inset-x-0 z-[9998] flex items-center justify-between py-2 px-4 bg-red-600/95 backdrop-blur-md text-white text-xs shadow-lg"
            style={{ paddingTop: 'calc(0.5rem + env(safe-area-inset-top))' }}
          >
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <WifiOff size={14} className="animate-pulse" />
              <span>Offline Mode</span>
            </div>

            <button
              onClick={() => setShowFullOffline(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 border border-white/20 text-[11px] font-semibold text-white transition-all shadow-sm"
            >
              <Database size={12} className="text-cyan-400" />
              <span>Offline Sanctuary</span>
              <ChevronRight size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFullOffline && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99999]"
          >
            <OfflineScreen onClose={() => setShowFullOffline(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
