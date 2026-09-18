import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Mic, 
  Image as ImageIcon, 
  Bell, 
  MapPin, 
  Users, 
  Bluetooth, 
  Settings,
  Shield, 
  X,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PermissionType } from '../../hooks/usePermissions';
import { useAeirmist } from '../../context/AeirmistContext';

interface PermissionManagerProps {
  isOpen: boolean;
  onClose: () => void;
  type: PermissionType;
  onConfirm: () => void;
  status?: 'prompt' | 'granted' | 'denied' | 'unavailable' | 'checking';
}

const PERMISSION_CONFIG: Record<PermissionType, {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  glowClass: string;
  btnBg: string;
  btnText: string;
}> = {
  camera: {
    title: 'Camera Access',
    subtitle: 'Visual Capture & Stories',
    description: 'Capture instant moments, stream live video, create Stories & Reels, and record profile visuals.',
    icon: <Camera size={30} className="text-cyan-400" />,
    benefits: ['Create Stories & Reels in 4K', 'High-res photo messaging', 'Instant profile & avatar capture'],
    accentColor: '#00f2ff',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(0,242,255,0.25)]',
    btnBg: 'bg-cyan-400 hover:bg-cyan-300',
    btnText: 'text-black'
  },
  microphone: {
    title: 'Microphone Access',
    subtitle: 'Audio Waves & Calls',
    description: 'Send crisp audio notes, record video audio, and enjoy crystal-clear peer-to-peer voice and video calls.',
    icon: <Mic size={30} className="text-pink-400" />,
    benefits: ['High-fidelity voice notes', 'Noise-canceled WebRTC calling', 'Record videos with dynamic audio'],
    accentColor: '#ff007a',
    accentBg: 'bg-pink-500/10',
    accentBorder: 'border-pink-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(255,0,122,0.25)]',
    btnBg: 'bg-pink-500 hover:bg-pink-400',
    btnText: 'text-white'
  },
  photos: {
    title: 'Media & Storage',
    subtitle: 'Gallery & File Uploads',
    description: 'Select photos, videos, and music soundtracks directly from your device storage.',
    icon: <ImageIcon size={30} className="text-lime-400" />,
    benefits: ['Select unlimited gallery media', 'Upload original 4K photos/videos', 'Lossless compression engine'],
    accentColor: '#a3e635',
    accentBg: 'bg-lime-500/10',
    accentBorder: 'border-lime-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(163,230,53,0.25)]',
    btnBg: 'bg-lime-400 hover:bg-lime-300',
    btnText: 'text-black'
  },
  notifications: {
    title: 'Push Notifications',
    subtitle: 'Real-time Pulse Alerts',
    description: 'Receive instant alerts for direct messages, incoming audio/video calls, likes, comments, and mentions.',
    icon: <Bell size={30} className="text-cyan-400" />,
    benefits: ['Instant direct message alerts', 'Incoming call ring banners', 'Community likes & mentions'],
    accentColor: '#00f2ff',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(0,242,255,0.25)]',
    btnBg: 'bg-cyan-400 hover:bg-cyan-300',
    btnText: 'text-black'
  },
  location: {
    title: 'Geospatial Location',
    subtitle: 'Location Tagging & Trends',
    description: 'Tag your current city and discover local creator content and regional trends near you.',
    icon: <MapPin size={30} className="text-amber-400" />,
    benefits: ['Accurate city & venue tagging', 'Explore local creator hub', 'Regional trending content'],
    accentColor: '#f59e0b',
    accentBg: 'bg-amber-500/10',
    accentBorder: 'border-amber-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    btnBg: 'bg-amber-400 hover:bg-amber-300',
    btnText: 'text-black'
  },
  contacts: {
    title: 'Find Friends',
    subtitle: 'Social Graph Sync',
    description: 'Find real-world friends on Aeirmist safely and build your digital network faster.',
    icon: <Users size={30} className="text-purple-400" />,
    benefits: ['Auto-find friends on Aeirmist', 'Quick friend invitations', 'Privacy-guaranteed hashing'],
    accentColor: '#a855f7',
    accentBg: 'bg-purple-500/10',
    accentBorder: 'border-purple-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
    btnBg: 'bg-purple-500 hover:bg-purple-400',
    btnText: 'text-white'
  },
  bluetooth: {
    title: 'Bluetooth Devices',
    subtitle: 'External Audio & Mic',
    description: 'Connect external wireless earbuds, studio microphones, and accessories seamlessly.',
    icon: <Bluetooth size={30} className="text-cyan-400" />,
    benefits: ['Wireless earbud audio routing', 'Studio mic recording', 'Low-latency call audio'],
    accentColor: '#00f2ff',
    accentBg: 'bg-cyan-500/10',
    accentBorder: 'border-cyan-500/30',
    glowClass: 'shadow-[0_0_25px_rgba(0,242,255,0.25)]',
    btnBg: 'bg-cyan-400 hover:bg-cyan-300',
    btnText: 'text-black'
  }
};

export const PermissionManager: React.FC<PermissionManagerProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  onConfirm,
  status = 'prompt'
}) => {
  const { addToast } = useAeirmist();
  const meta = PERMISSION_CONFIG[type] || PERMISSION_CONFIG.camera;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Sheet / Modal Card */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative w-full max-w-lg bg-[#0c0d14] border-t sm:border border-white/10 rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col"
        >
          {/* Top Neon Light Line */}
          <div 
            className="h-1 w-full"
            style={{ backgroundColor: meta.accentColor }}
          />

          <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1">
            {/* Header with Icon & Close Button */}
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 rounded-2xl ${meta.accentBg} border ${meta.accentBorder} flex items-center justify-center ${meta.glowClass}`}>
                {meta.icon}
              </div>
              <button 
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all cursor-pointer"
                title="Dismiss"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Description */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span 
                  className="text-[9px] font-mono font-black uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-md"
                  style={{ backgroundColor: `${meta.accentColor}20`, color: meta.accentColor }}
                >
                  {meta.subtitle}
                </span>
                {status === 'granted' && (
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Active
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                {meta.title}
              </h2>
              <p className="text-xs text-white/60 leading-relaxed">
                {meta.description}
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Why Aeirmist Needs This:
              </h4>
              <div className="grid gap-2">
                {meta.benefits.map((benefit, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <div 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: meta.accentColor }}
                    />
                    <span className="text-xs font-medium text-white/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* If Denied, show Settings Guide */}
            {status === 'denied' && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-3">
                <div className="flex gap-3">
                  <AlertCircle className="text-rose-400 shrink-0 mt-0.5" size={18} />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-rose-300">Permission Blocked on Device</p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Access is disabled in system settings. Enable it from your device or browser settings to unlock this feature.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                      window.location.href = 'app-settings:';
                    } else {
                      addToast({ 
                        title: 'Enable Access', 
                        message: 'Tap the lock/settings icon next to the address bar to allow permissions.', 
                        type: 'info' 
                      });
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Settings size={14} />
                  Open App / Site Settings
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons Footer */}
          <div className="p-4 sm:p-6 bg-black/60 border-t border-white/5 space-y-2.5">
            {status !== 'denied' ? (
              <button 
                onClick={onConfirm}
                disabled={status === 'checking'}
                className={`w-full h-12 rounded-2xl ${meta.btnBg} ${meta.btnText} font-black uppercase tracking-wider text-xs active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer`}
              >
                {status === 'checking' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    <span>Requesting Device Access...</span>
                  </div>
                ) : (
                  <>
                    <span>Allow & Sync Access</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            ) : null}

            <button 
              onClick={onClose}
              className="w-full h-10 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.98] text-white/50 hover:text-white font-bold uppercase tracking-wider text-[10px] transition-all cursor-pointer"
            >
              Maybe Later
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-[9px] font-mono text-white/30 uppercase tracking-widest">
              <Shield size={11} className="text-white/30" />
              <span>Zero data shared with third parties</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
