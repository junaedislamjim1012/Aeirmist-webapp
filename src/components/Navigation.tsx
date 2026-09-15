import React from 'react';
import { useAppearance } from '../context/AppearanceContext';
import { 
  Home, 
  Search, 
  PlusSquare, 
  Plus,
  Heart, 
  User, 
  Sparkles, 
  MessageSquare, 
  Settings, 
  Play,
  Film,
  LayoutDashboard,
  Users,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Bookmark,
  Activity,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  Pin,
  ShoppingBag,
  Scan,
  Fingerprint,
  Zap,
  Download
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useAeirmist } from '../context/AeirmistContext';
import { getAvatarUrl } from '../lib/avatar';
import { AeirmistLogo } from './ui/AeirmistLogo';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { InstallModal } from './pwa/InstallModal';

export type Tab = 'feed' | 'messenger' | 'discover' | 'profile' | 'settings' | 'videos' | 'dashboard' | 'notifications' | 'admin';

interface NavigationProps {
  onCreate: () => void;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  onNotificationsClick: () => void;
  onPreload?: (comp: any) => void;
  isRemoteView?: boolean;
}

export const Navigation = React.memo(({ onCreate, activeTab, onTabChange, isExpanded, setIsExpanded, onNotificationsClick, onPreload, isRemoteView }: NavigationProps) => {
  const { user, profile, isNavHidden, unreadMessagesCount, unreadNotificationsCount, localAvatarURL, featureFlags } = useAeirmist();
  const { settings } = useAppearance();
  const isGlobalBgActive = settings.globalBgType !== 'none' && !!settings.globalBgValue;

  // Local hover state with beautiful, smart lock safety
  const [isHovered, setIsHovered] = React.useState(false);
  const collapseTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // PWA installation state
  const { isStandalone, isInstallable, install } = usePWAInstall();
  const [installModalOpen, setInstallModalOpen] = React.useState(false);

  const handleInstallClick = React.useCallback(async () => {
    if (isInstallable) {
      const res = await install();
      if (res.outcome !== 'accepted') {
        setInstallModalOpen(true);
      }
    } else {
      setInstallModalOpen(true);
    }
  }, [isInstallable, install]);

  const handleItemClick = React.useCallback((callback?: () => void) => {
    setIsHovered(false);
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
    }
    if (callback) callback();
  }, []);

  const handleMouseEnter = React.useCallback(() => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    // Smart collapse protection: check if user is currently typing or interacting
    const isUserActiveTyping = typeof document !== 'undefined' && document.activeElement && (
      document.activeElement.tagName === 'INPUT' || 
      document.activeElement.tagName === 'TEXTAREA' || 
      document.activeElement.getAttribute('contenteditable') === 'true'
    );
    
    if (isUserActiveTyping) {
      // Don't auto-collapse while active in input fields
      return;
    }

    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
    }
    collapseTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 280); // Quick yet elegant buffer delay
  }, []);

  // Clear timer on unmount
  React.useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
      }
    };
  }, []);

  // Combined smart state
  const isCurrentlyExpanded = isExpanded || isHovered;
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav 
        id="aeirmist-desktop-sidebar"
        aria-label="Main Navigation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ width: isCurrentlyExpanded ? (settings.compactSidebar ? 72 : 260) : 72 }} initial={false}
        transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', damping: 22, stiffness: 125 }}
        className="hidden md:flex flex-col h-full border-r border-white/10 bg-[#060608]/90 backdrop-blur-3xl px-3 py-4 z-50 shrink-0 relative select-none overflow-hidden"
      >
        {/* Top Spotlight Bar */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* TOP: Fixed sticky header (Logo and Pin Toggle) */}
        <div className={`flex items-center ${isCurrentlyExpanded ? 'justify-between px-1' : 'justify-center px-0'} mb-6 pt-1 shrink-0`}>
          <button 
            type="button"
            onClick={() => handleItemClick(() => onTabChange('feed'))} 
            onMouseEnter={() => onPreload?.('feed')}
            aria-label="Aeirmist Home"
            className="flex items-center justify-center cursor-pointer group min-w-0 outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 rounded-lg transition-all duration-200" 
          >
            <AeirmistLogo 
              variant={isCurrentlyExpanded ? "full" : "compact"}
              className={isCurrentlyExpanded ? "h-6 w-auto" : "w-8 h-8"} 
              glow={false}
              glowStrength="weak"
            />
          </button>
          
          {/* Dual State Sidebar Pin Button */}
          {isCurrentlyExpanded && (
            <div className="shrink-0">
              {isExpanded ? (
                <button 
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Unpin Sidebar"
                  title="Unpin Sidebar (Enable Auto-Hover)"
                  className="p-1.5 rounded-lg bg-white/10 border border-white/15 text-white hover:bg-white/15 outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 transition-all duration-200 flex items-center justify-center group/pin"
                >
                  <Pin size={13} strokeWidth={2.2} className="rotate-45 transition-transform duration-200 group-hover/pin:rotate-0" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  aria-label="Pin Sidebar"
                  title="Pin Sidebar (Always Expanded)"
                  className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/15 outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 transition-all duration-200 flex items-center justify-center group/pin"
                >
                  <Pin size={13} strokeWidth={1.8} className="transition-transform duration-200 group-hover/pin:rotate-45 text-white/50" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* MIDDLE: Scrollable navigation links container */}
        <div className="flex-1 overflow-y-auto py-1 space-y-1.5 min-h-0">
          <NavItem icon={<Home />} label="Home Feed" active={activeTab === 'feed'} isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(() => onTabChange('feed'))} onMouseEnter={() => onPreload?.('feed')} />
          <NavItem icon={<Users />} label="Connections" active={activeTab === 'dashboard'} comingSoon={featureFlags?.discover === false} isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(() => onTabChange('dashboard'))} onMouseEnter={() => onPreload?.('dashboard')} />
          <NavItem icon={<ShoppingBag />} label="Marketplace" active={activeTab === 'discover'} comingSoon={featureFlags?.marketplace === false} isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(() => onTabChange('discover'))} onMouseEnter={() => onPreload?.('discover')} />
          <NavItem icon={<Film />} label="Videos" active={activeTab === 'videos'} comingSoon={featureFlags?.videos === false} isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(() => onTabChange('videos'))} onMouseEnter={() => onPreload?.('videos')} />
          <NavItem icon={<MessageSquare />} label="Inbox" active={activeTab === 'messenger'} comingSoon={featureFlags?.inbox === false} isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(() => onTabChange('messenger'))} onMouseEnter={() => onPreload?.('messenger')} badge={unreadMessagesCount} />
          <NavItem icon={<Bell />} label="Alerts" active={activeTab === 'notifications'} comingSoon={featureFlags?.notifications === false} isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(onNotificationsClick)} onMouseEnter={() => onPreload?.('notifications')} badge={unreadNotificationsCount} />
          
          <div className="h-px bg-white/5 my-3 mx-1 relative shrink-0">
             <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          <NavItem icon={<PlusSquare />} label="New Post" isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(onCreate)} variant="accent" />
          <NavItem icon={<User />} label="Profile" active={activeTab === 'profile' && !isRemoteView} isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(() => onTabChange('profile'))} onMouseEnter={() => onPreload?.('profile')} />
          <NavItem icon={<Settings />} label="Settings" active={activeTab === 'settings'} isExpanded={isCurrentlyExpanded} onClick={() => handleItemClick(() => onTabChange('settings'))} onMouseEnter={() => onPreload?.('settings')} />
          {!isStandalone && (
            <NavItem 
              icon={<Download />} 
              label="Install App" 
              isExpanded={isCurrentlyExpanded} 
              onClick={() => handleItemClick(handleInstallClick)} 
              variant="accent"
            />
          )}
          {(user?.email?.toLowerCase() === 'junaedislamjim180@gmail.com' || 
             profile?.email?.toLowerCase() === 'junaedislamjim180@gmail.com' || 
             profile?.username?.toLowerCase() === 'junaed_islam_jim9' ||
             profile?.role === 'admin' ||
             profile?.isAdmin === true) && (
            <NavItem 
              icon={<ShieldCheck />} 
              label="Control Panel" 
              active={activeTab === 'admin'} 
              isExpanded={isCurrentlyExpanded} 
              onClick={() => handleItemClick(() => { onTabChange('admin' as any); if (window.location.pathname !== '/admin-panel') { window.history.pushState({}, '', '/admin-panel'); } })} 
            />
          )}
        </div>

        {/* BOTTOM: Sticky user info profile card */}
        <div className="mt-auto pt-3 shrink-0">
          <div className="h-px bg-white/5 mb-3 relative">
             <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <motion.button 
            id="aeirmist-sidebar-profile-card"
            type="button"
            onClick={() => handleItemClick(() => onTabChange('profile'))}
            aria-label={`View profile for ${profile?.displayName || user?.displayName || 'user'}`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.985, opacity: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`w-full text-left cursor-pointer rounded-xl transition-all duration-200 flex items-center outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400/50 select-none ${
              isCurrentlyExpanded 
                ? 'p-2 bg-white/[0.03] border border-white/10 hover:border-white/15 hover:bg-white/[0.06]' 
                : 'p-1 h-12 justify-center bg-transparent border border-transparent hover:bg-white/5'
            } relative group/profile`}
          >
            {/* Mirror highlighting sheen */}
            {isCurrentlyExpanded && (
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            )}

            {/* Avatar container with status tracker */}
            <div className={`relative shrink-0 flex items-center justify-center rounded-lg transition-all duration-200 ${
              isCurrentlyExpanded 
                ? 'w-8 h-8 border border-white/15 bg-black/40 group-hover/profile:border-white/25'
                : 'w-9 h-9 border border-white/10 bg-[#07070a]/90 group-hover/profile:border-white/20'
            }`}>
              <div className="w-full h-full rounded-md overflow-hidden bg-neutral-900">
                <img 
                  src={localAvatarURL || getAvatarUrl(profile?.photoURL || user?.photoURL)} 
                  alt="Profile" 
                  className="w-full h-full object-cover group-hover/profile:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Active indicator dot */}
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-aeirmist-lime rounded-full border border-neutral-950" />
            </div>

            {/* Profile identifiers dynamically loading with beautiful spacing */}
            {isCurrentlyExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="ml-2.5 flex-1 min-w-0 pr-1 flex flex-col justify-center"
              >
                <span className="text-[10px] font-bold uppercase text-white/90 tracking-wider truncate block">
                  {profile?.displayName || user?.displayName || 'Account'}
                </span>
                <span className="text-[9px] font-mono font-medium tracking-wide text-white/45 truncate block mt-0.5 group-hover/profile:text-white/70 transition-colors">
                  @{profile?.username || 'user'}
                </span>
              </motion.div>
            )}

            {/* Hover Tooltip when collapsed */}
            {!isCurrentlyExpanded && (
              <div className="fixed left-[78px] px-2.5 py-1.5 rounded-lg bg-[#0c0d12]/95 border border-white/10 text-[9px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-[100] shadow-xl backdrop-blur-xl text-white">
                Profile - {profile?.displayName || user?.displayName || 'Account'}
              </div>
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation Bar - FLUID DOCK */}
      <AnimatePresence>
        {!isNavHidden && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[390px] mb-[env(safe-area-inset-bottom,0px)] overflow-visible"
          >
            <div 
              role="navigation" 
              aria-label="Mobile Navigation"
              className={`relative rounded-2xl border border-white/10 px-2 py-1.5 flex justify-around items-center shadow-[0_12px_30px_rgba(0,0,0,0.85)] ${isGlobalBgActive ? 'bg-[#060608]/80' : 'bg-black/85'} backdrop-blur-3xl overflow-hidden`}
            >
              {/* Metallic Glass sheen highlights */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-[0.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
              
              <MobileNavItem icon={<Home />} active={activeTab === 'feed'} onClick={() => handleItemClick(() => onTabChange('feed'))} onMouseEnter={() => onPreload?.('feed')} label="Home" />
              <MobileNavItem icon={<Users />} active={activeTab === 'dashboard'} onClick={() => handleItemClick(() => onTabChange('dashboard'))} onMouseEnter={() => onPreload?.('dashboard')} label="Connections" />
              <MobileNavItem icon={<Film />} active={activeTab === 'videos'} onClick={() => handleItemClick(() => onTabChange('videos'))} onMouseEnter={() => onPreload?.('videos')} label="Videos" />
              <MobileNavItem icon={<MessageSquare />} active={activeTab === 'messenger'} onClick={() => handleItemClick(() => onTabChange('messenger'))} onMouseEnter={() => onPreload?.('messenger')} label="Messages" badge={unreadMessagesCount} />
              <MobileNavItem icon={<User />} active={activeTab === 'profile' && !isRemoteView} onClick={() => handleItemClick(() => onTabChange('profile'))} onMouseEnter={() => onPreload?.('profile')} label="Profile" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InstallModal isOpen={installModalOpen} onClose={() => setInstallModalOpen(false)} />
    </>
  );
});

// Primary standardized Sidebar Item Button
const NavItem = React.memo(({ icon, label, active = false, isExpanded = true, onClick, variant = 'default', onMouseEnter, badge, comingSoon = false }: { 
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'accent';
  onMouseEnter?: () => void;
  badge?: number;
  comingSoon?: boolean;
}) => {
  const formatBadge = (count: number) => {
    return count > 99 ? '99+' : count.toString();
  };

  return (
    <motion.button 
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      whileTap={{ opacity: 0.94 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`h-[42px] flex items-center ${isExpanded ? 'px-2.5' : 'justify-center px-0'} py-1.5 rounded-xl transition-all duration-[180ms] ease-out relative group min-w-0 w-full cursor-pointer outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF]/50 select-none bg-transparent border border-transparent hover:bg-white/[0.06]`}
    >
      {/* Clean Icon Capsule */}
      <div className={`relative shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-[180ms] ease-out ${
        active 
          ? 'text-[#00E5FF] bg-[#00E5FF]/15 border border-[#00E5FF]/30 shadow-[0_0_10px_rgba(0,229,255,0.3)]'
          : 'text-white/80 group-hover:text-white group-hover:bg-white/10'
      }`}>
        {React.cloneElement(icon as any, { size: 19, strokeWidth: active ? 2.2 : 2.0 })}
        
        {/* Unread badge overlay for compact/collapsed state */}
        {!isExpanded && badge !== undefined && badge > 0 && (
          <div className="absolute -top-1 -right-1 bg-[#00E5FF] text-black text-[8px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
            {formatBadge(badge)}
          </div>
        )}
      </div>
      
      {/* Navigation Label */}
      {isExpanded && (
        <div className="flex-1 flex items-center justify-between min-w-0 ml-2.5 pr-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap truncate text-white/80 group-hover:text-white transition-colors duration-[180ms] ease-out">
            {label}
          </span>

          {comingSoon ? (
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[7px] font-mono font-bold tracking-widest shrink-0">
              SOON
            </span>
          ) : badge !== undefined && badge > 0 ? (
            <span className="px-1.5 py-0.5 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 text-[8px] font-bold tracking-wider shrink-0">
              {formatBadge(badge)}
            </span>
          ) : null}
        </div>
      )}

      {/* Floating tooltip labels on hover in compact mode */}
      {!isExpanded && (
        <div className="fixed left-[78px] px-2.5 py-1.5 rounded-lg bg-[#0c0d12]/95 border border-white/10 text-[9px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-[180ms] ease-out whitespace-nowrap z-[100] shadow-xl backdrop-blur-xl text-white">
          {label} {badge !== undefined && badge > 0 ? `(${formatBadge(badge)})` : ''}
        </div>
      )}
    </motion.button>
  );
});

// Compact Mobile Bottom nav item trigger
const MobileNavItem = React.memo(({ icon, active = false, onClick, onMouseEnter, badge, label }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void; onMouseEnter?: () => void; badge?: number }) => (
  <button 
    type="button"
    aria-label={label}
    aria-current={active ? 'page' : undefined}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onTouchStart={() => {
      onMouseEnter?.();
    }}
    className="relative flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 active:scale-90 transition-transform duration-100 rounded-xl"
  >
    <div className={`w-full h-full rounded-xl flex items-center justify-center transition-colors duration-150 border ${
      active 
        ? 'bg-white/15 border-white/30 text-white shadow-[0_0_12px_rgba(255,255,255,0.15)]'
        : 'bg-[#0a0a0d]/90 border-white/5 text-white/50 active:text-white'
    }`}>
      {/* Premium Glass reflection */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {React.cloneElement(icon as any, { 
          size: 18, 
          strokeWidth: active ? 2.5 : 1.8,
        })}
      </div>
    </div>

    {badge !== undefined && badge > 0 && (
      <div className="absolute -top-1 -right-1 z-20 px-1.5 py-0.5 min-w-[18px] h-[18px] bg-aeirmist-cyan text-black text-[8px] font-black rounded-full border border-neutral-950 flex items-center justify-center shadow-sm animate-pulse">
        {badge > 99 ? '99+' : badge}
      </div>
    )}
  </button>
));
