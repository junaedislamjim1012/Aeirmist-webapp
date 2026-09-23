import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, MessageCircle, Send, Sparkles, Music, 
  Flame, Radio, Users, Compass, ShieldCheck, CheckCircle2
} from 'lucide-react';
import { AeirmistLogo } from '../ui/AeirmistLogo';

export const AuthPoster: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 p-6 lg:p-8 xl:p-12 flex-col justify-between relative border-r border-white/10 bg-gradient-to-br from-[#06080e] via-[#090d16] to-[#040508] overflow-hidden select-none">
      {/* Dynamic ambient background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[var(--color-aeirmist-cyan)]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[var(--color-aeirmist-magenta)]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid line matrix texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* ── Top Header & Branding ── */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--color-aeirmist-cyan)] blur-md opacity-50 rounded-2xl animate-pulse" />
            <AeirmistLogo className="w-11 h-11 relative drop-shadow-[0_0_25px_rgba(0,242,255,0.6)]" variant="compact" />
          </div>
          <div className="h-6 w-px bg-white/15" />
          <div className="flex flex-col">
            <span className="text-[11px] tracking-[0.25em] font-mono font-bold text-[var(--color-aeirmist-cyan)] uppercase">
              Aeirmist Network
            </span>
            <span className="text-[9px] tracking-widest font-mono text-white/40 uppercase">
              Official Client v2.5
            </span>
          </div>
        </div>

        <div className="pt-2">
          <h1 className="font-display font-black text-3xl xl:text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-aeirmist-cyan)] via-white to-[var(--color-aeirmist-magenta)] drop-shadow-[0_0_35px_rgba(0,242,255,0.3)]">
            AEIRMIST
          </h1>
          <p className="text-xs xl:text-sm font-medium text-slate-300/80 mt-1 max-w-sm leading-relaxed">
            Connect with friends, share your universe, and experience next-generation social freedom.
          </p>
        </div>
      </div>

      {/* ── Centerpiece: Interactive Visual Social Feed Poster ── */}
      <div className="relative my-auto py-6 z-10 w-full max-w-md mx-auto">
        {/* Main Floating Glassmorphic Social Post Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Card subtle top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-aeirmist-cyan)] to-transparent opacity-50" />

          {/* Post Header: User Profile with Verified Badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-[var(--color-aeirmist-magenta)] to-[var(--color-aeirmist-cyan)]">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" 
                    alt="Creator" 
                    className="w-full h-full rounded-full object-cover border border-black/40"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0c101a]" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-white tracking-wide">elena.creative</span>
                  <CheckCircle2 size={13} className="text-[var(--color-aeirmist-cyan)] fill-[var(--color-aeirmist-cyan)]/20" />
                </div>
                <span className="text-[10px] text-white/50 font-mono">Tokyo, Japan • 2h ago</span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-aeirmist-cyan)]/15 border border-[var(--color-aeirmist-cyan)]/30 text-[10px] font-bold text-[var(--color-aeirmist-cyan)] uppercase tracking-wider">
              <Radio size={10} className="animate-pulse" /> Live Story
            </span>
          </div>

          {/* Post Media Visual Artwork */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-3 group">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop" 
              alt="Social Artwork Showcase" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            {/* Overlay badges */}
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium">
                <Sparkles size={12} className="text-cyan-400" /> Atmospheric Visuals
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80">
                <Music size={11} className="text-[var(--color-aeirmist-magenta)]" /> Neon Horizons (Original)
              </span>
            </div>
          </div>

          {/* Post Action Buttons (Instagram Style) */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-white/90 hover:text-red-400 transition-colors cursor-pointer">
                <Heart size={16} className="text-red-500 fill-red-500" />
                <span className="text-xs font-bold font-mono">18.4K</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer">
                <MessageCircle size={16} />
                <span className="text-xs font-bold font-mono">1,240</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors cursor-pointer">
                <Send size={15} />
                <span className="text-xs font-bold font-mono">892</span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">High Fidelity 4K</span>
          </div>
        </motion.div>

        {/* Floating Chat Bubble (Messenger style, overlapping left) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute -bottom-5 -left-4 xl:-left-6 rounded-2xl bg-[#0e1320]/95 border border-[var(--color-aeirmist-cyan)]/40 backdrop-blur-xl p-3 shadow-[0_12px_35px_rgba(0,0,0,0.7)] flex items-center gap-3 z-20 max-w-[260px]"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop" 
              alt="Friend" 
              className="w-full h-full rounded-full object-cover" 
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-white truncate">Marcus Vance</p>
            <p className="text-[10px] text-slate-300/80 truncate">Joined your audio room 🎧</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-[var(--color-aeirmist-cyan)] shrink-0 animate-ping" />
        </motion.div>

        {/* Floating Story Pill (Instagram style, overlapping top right) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute -top-4 -right-3 xl:-right-6 rounded-2xl bg-[#0f121d]/95 border border-white/20 backdrop-blur-xl py-1.5 px-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-2 z-20"
        >
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop" alt="avatar" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="avatar" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-black object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop" alt="avatar" />
          </div>
          <span className="text-[10px] font-bold text-white tracking-wider font-mono">+52K Creators</span>
        </motion.div>
      </div>

      {/* ── Feature Highlights & Community Trust Bar ── */}
      <div className="relative z-10 space-y-3 pt-2">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
              <Flame size={14} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider truncate">Dynamic Feed</h4>
              <p className="text-[9px] text-white/50 truncate">Stories, Reels & Audio</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <ShieldCheck size={14} />
            </div>
            <div className="min-w-0">
              <h4 className="text-[11px] font-bold text-white uppercase tracking-wider truncate">Private & Secure</h4>
              <p className="text-[9px] text-white/50 truncate">Zero-Trust Vault System</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-white/30 pt-1 border-t border-white/5">
          <span>Global Decentralized Grid</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Network Live
          </span>
        </div>
      </div>
    </div>
  );
};
