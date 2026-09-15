import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAeirmist } from '../../context/AeirmistContext';
import { getAvatarUrl } from '../../lib/avatar';
import { X, Check, Loader2, LogOut } from 'lucide-react';

interface AccountSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: () => void;
}

export const AccountSwitcher: React.FC<AccountSwitcherProps> = ({ isOpen, onClose, onAddAccount }) => {
  const { allProfiles, activeProfileId, switchProfile, logout } = useAeirmist();
  const [switchingId, setSwitchingId] = React.useState<string | null>(null);

  const handleSwitch = async (profileId: string) => {
    if (profileId === activeProfileId) return;
    setSwitchingId(profileId);
    try {
      await switchProfile(profileId);
      setTimeout(() => {
        setSwitchingId(null);
        onClose();
      }, 300);
    } catch (e) {
      setSwitchingId(null);
    }
  };

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await logout();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-[#16181f] border border-white/10 rounded-3xl p-6 z-[101] shadow-2xl overflow-hidden text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="w-8" /> {/* Spacer for centering title */}
              <h3 className="text-base font-bold text-white text-center">Switch accounts</h3>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Account List */}
            <div className="py-3 space-y-1 max-h-[320px] overflow-y-auto custom-scrollbar">
              {allProfiles.map((p) => {
                const isActive = activeProfileId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSwitch(p.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'hover:bg-white/5 text-white/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/10 shrink-0 border border-white/10">
                        <img 
                          src={getAvatarUrl(p.photoURL, p.username)} 
                          alt={p.username} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-white truncate">
                          {p.displayName || p.username}
                        </div>
                        <div className="text-xs text-white/40 truncate">
                          @{p.username}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {switchingId === p.id ? (
                        <Loader2 size={18} className="text-aeirmist-cyan animate-spin" />
                      ) : isActive ? (
                        <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Options */}
            <div className="pt-4 border-t border-white/10 flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  onAddAccount();
                  onClose();
                }}
                className="w-full text-center py-2.5 text-sm font-semibold text-aeirmist-cyan hover:text-aeirmist-cyan/80 transition-colors cursor-pointer"
              >
                Log into an Existing Account
              </button>

              <button
                onClick={handleLogout}
                className="text-xs font-medium text-white/40 hover:text-red-400 transition-colors flex items-center gap-1.5 py-1"
              >
                <LogOut size={13} />
                Log out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AccountSwitcher;

