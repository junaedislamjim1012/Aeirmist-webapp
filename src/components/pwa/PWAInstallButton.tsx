import React, { useState } from 'react';
import { Download, Smartphone, Check, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { InstallModal } from './InstallModal';

interface PWAInstallButtonProps {
  variant?: 'header' | 'compact' | 'sidebar' | 'pill' | 'banner';
  className?: string;
  label?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
  label = 'Install App'
}) => {
  const { isInstallable, isInstalled, isStandalone, install } = usePWAInstall();
  const [modalOpen, setModalOpen] = useState(false);

  // If already running inside standalone PWA mode, don't show the install prompt
  if (isStandalone) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res.outcome !== 'accepted') {
        // If dismissed or manual, open modal with guide
        setModalOpen(true);
      }
    } else {
      // Direct guide modal
      setModalOpen(true);
    }
  };

  if (variant === 'compact') {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          aria-label="Install Aeirmist Android App"
          title="Install Phone App"
          className={`relative group flex items-center justify-center h-10 px-3 rounded-xl bg-gradient-to-r from-[#00f2ff]/20 to-[#7000ff]/20 border border-[#00f2ff]/40 text-white hover:border-[#00f2ff] hover:shadow-[0_0_15px_rgba(0,242,255,0.4)] active:scale-95 transition-all cursor-pointer ${className}`}
        >
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f2ff]"></span>
          </span>
          <Download size={15} className="text-[#00f2ff] mr-1.5 shrink-0 animate-pulse" strokeWidth={2.5} />
          <span className="text-[11px] font-black uppercase tracking-wider text-white">
            Install
          </span>
        </button>

        <InstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  if (variant === 'sidebar') {
    return (
      <>
        <button
          type="button"
          onClick={handleClick}
          aria-label="Install App"
          className={`h-[42px] flex items-center px-2.5 py-1.5 rounded-xl transition-all duration-200 group w-full cursor-pointer outline-none bg-gradient-to-r from-[#00f2ff]/10 to-[#7000ff]/10 border border-[#00f2ff]/30 hover:border-[#00f2ff]/70 hover:shadow-[0_0_15px_rgba(0,242,255,0.25)] ${className}`}
        >
          <div className="relative shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-[#00f2ff] bg-[#00f2ff]/20 border border-[#00f2ff]/40">
            <Download size={18} strokeWidth={2.2} className="group-hover:animate-bounce" />
          </div>
          <div className="flex-1 flex items-center justify-between min-w-0 ml-2.5 pr-1">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#00f2ff] group-hover:text-white transition-colors truncate">
              {label}
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40 text-[7px] font-mono font-bold tracking-widest shrink-0">
              PWA
            </span>
          </div>
        </button>

        <InstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  // Default header variant
  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Install Aeirmist App"
        className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00f2ff]/15 via-[#00f2ff]/25 to-[#7000ff]/25 border border-[#00f2ff]/50 text-white shadow-[0_0_15px_rgba(0,242,255,0.2)] hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] hover:border-[#00f2ff] active:scale-95 transition-all cursor-pointer ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f2ff]"></span>
        </span>
        <Download size={14} className="text-[#00f2ff] shrink-0" strokeWidth={2.5} />
        <span className="text-[11px] font-black uppercase tracking-wider text-white">
          {label}
        </span>
      </button>

      <InstallModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
