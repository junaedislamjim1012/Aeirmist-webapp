import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Smartphone, 
  X, 
  CheckCircle2, 
  MoreVertical, 
  Share2, 
  PlusSquare, 
  Sparkles, 
  Copy, 
  Check, 
  Zap, 
  ExternalLink 
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { AeirmistLogo } from '../ui/AeirmistLogo';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      setInstalling(true);
      const res = await install();
      setInstalling(false);
      if (res.outcome === 'accepted') {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-modal-title"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative w-full max-w-md rounded-3xl bg-[#060812]/95 border border-[#00f2ff]/30 p-6 sm:p-7 shadow-[0_0_50px_rgba(0,242,255,0.25)] text-white overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#00f2ff]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#7000ff]/20 rounded-full blur-3xl pointer-events-none" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer z-10"
          >
            <X size={18} />
          </button>

          {/* App Identity Banner */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 rounded-2xl bg-[#030712] border border-[#00f2ff]/40 p-2 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)] shrink-0">
              <img 
                src="/icon-192.png" 
                alt="Aeirmist App Icon" 
                className="w-full h-full object-contain rounded-xl drop-shadow-[0_0_8px_rgba(0,242,255,0.6)]"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00f2ff] flex items-center justify-center text-black shadow-md">
                <Smartphone size={11} strokeWidth={2.5} />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 id="install-modal-title" className="text-lg font-display font-black tracking-wide uppercase text-white">
                  Aeirmist Android App
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#00f2ff]/15 border border-[#00f2ff]/30 text-[9px] font-mono font-bold text-[#00f2ff]">
                  PWA v2.0
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5 truncate">
                Install as a native phone application
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2">
              <Zap size={15} className="text-[#00f2ff] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-white">Fast & Smooth</p>
                <p className="text-[10px] text-white/50">Instant start & cached memory</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2">
              <Smartphone size={15} className="text-[#7000ff] shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-white">Full Screen</p>
                <p className="text-[10px] text-white/50">No browser URL bar</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2">
              <Sparkles size={15} className="text-pink-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-white">Home Screen Icon</p>
                <p className="text-[10px] text-white/50">1-tap launch from phone</p>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold text-white">Zero Storage Bloat</p>
                <p className="text-[10px] text-white/50">Under 2MB lightweight</p>
              </div>
            </div>
          </div>

          {/* Action Area */}
          {installSuccess || isInstalled ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center mb-4">
              <CheckCircle2 size={28} className="text-emerald-400 mx-auto mb-1.5 animate-bounce" />
              <p className="text-sm font-bold text-white">Aeirmist is Installed!</p>
              <p className="text-xs text-white/60 mt-0.5">
                Check your home screen or app drawer to launch Aeirmist anytime.
              </p>
            </div>
          ) : isInstallable ? (
            <div className="space-y-3 mb-5">
              <button
                onClick={handleInstallClick}
                disabled={installing}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#00f2ff] via-[#00c8ff] to-[#7000ff] text-black font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(0,242,255,0.4)] active:scale-[0.98] hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
              >
                <Download size={16} strokeWidth={2.5} />
                {installing ? 'Installing...' : 'Install Now on Phone'}
              </button>
              <p className="text-[11px] text-center text-white/50">
                Tap to trigger Android native installation prompt
              </p>
            </div>
          ) : (
            /* Manual Guided Instructions */
            <div className="mb-5 space-y-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="text-xs font-bold text-[#00f2ff] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MoreVertical size={14} /> Android Chrome Installation Guide:
                </p>
                <ol className="space-y-2 text-xs text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00f2ff]/20 text-[#00f2ff] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Tap the <strong>three dots (⋮)</strong> menu in the top-right corner of Chrome.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00f2ff]/20 text-[#00f2ff] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00f2ff]/20 text-[#00f2ff] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Tap <strong>Install</strong>. The Aeirmist app will appear on your phone screen!</span>
                  </li>
                </ol>
              </div>

              {isIOS && (
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Share2 size={13} /> iPhone / Safari Steps:
                  </p>
                  <p className="text-[11px] text-white/70">
                    Tap the <strong>Share</strong> button (⎋), scroll down and tap <strong>Add to Home Screen (+)</strong>.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Copy Link Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
            <span className="text-white/50 text-[11px]">Need to open in Chrome?</span>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 text-white/80 hover:text-white transition-all cursor-pointer text-[11px]"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              {copied ? 'Link Copied!' : 'Copy App URL'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
