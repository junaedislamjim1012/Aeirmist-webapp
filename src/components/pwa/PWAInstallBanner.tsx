import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Smartphone, X, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { InstallModal } from './InstallModal';

export const PWAInstallBanner: React.FC = () => {
  const { isStandalone, isInstalled, isInstallable, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Check if dismissed previously within 24 hours
    const dismissedAt = localStorage.getItem('aeirmist_pwa_banner_dismissed');
    if (!dismissedAt) {
      setDismissed(false);
    } else {
      const hoursPassed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60);
      if (hoursPassed > 24) {
        setDismissed(false);
      }
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('aeirmist_pwa_banner_dismissed', Date.now().toString());
  };

  const handleInstall = async () => {
    if (isInstallable) {
      const res = await install();
      if (res.outcome !== 'accepted') {
        setModalOpen(true);
      }
    } else {
      setModalOpen(true);
    }
  };

  if (isStandalone || dismissed) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full bg-gradient-to-r from-[#00f2ff]/15 via-[#0c1024] to-[#7000ff]/20 border-b border-[#00f2ff]/30 py-2 px-3 sm:px-4 text-white relative z-30"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#00f2ff]/20 border border-[#00f2ff]/40 flex items-center justify-center text-[#00f2ff] shrink-0 shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                <Smartphone size={16} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[12px] leading-tight text-white flex items-center gap-1.5 truncate">
                  Install Aeirmist Phone App
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-[#00f2ff]/20 text-[#00f2ff] text-[9px] font-mono">Android / PWA</span>
                </p>
                <p className="text-[10px] text-white/60 leading-tight truncate">
                  Get full-screen view & faster navigation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstall}
                className="px-3 py-1.5 rounded-xl bg-[#00f2ff] hover:bg-[#00d8e6] text-black font-black uppercase text-[10px] tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,242,255,0.4)] active:scale-95 transition-all cursor-pointer"
              >
                <Download size={13} strokeWidth={2.5} />
                Install App
              </button>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss banner"
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <InstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
