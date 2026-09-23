import React from 'react';
import { motion } from 'motion/react';
import { 
  Heart, Send, Users, Shield, Sparkles, UserPlus
} from 'lucide-react';
import { AeirmistLogo } from '../ui/AeirmistLogo';

export const AuthPoster: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-[58%] xl:w-[60%] p-8 xl:p-14 flex-col justify-between relative overflow-hidden select-none">
      
      {/* ── Top Left: Branding & Logo (Keeps official Aeirmist app logo) ── */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <AeirmistLogo className="w-12 h-12 drop-shadow-[0_0_25px_rgba(0,242,255,0.6)]" variant="compact" />
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl xl:text-3xl tracking-tight text-white">
              Aeirmist
            </span>
            <span className="text-[10px] xl:text-[11px] tracking-[0.25em] font-bold text-slate-400 uppercase">
              Connect &bull; Share &bull; Belong
            </span>
          </div>
        </div>

        {/* Big Catchy Headline */}
        <div className="pt-4 max-w-lg">
          <h1 className="text-3xl xl:text-5xl font-black text-white leading-[1.15] tracking-tight">
            See everyday moments from your{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-500 bg-clip-text text-transparent">
              close friends.
            </span>
          </h1>
        </div>

        {/* Feature Highlights (Bullet Badges from Reference) */}
        <div className="pt-3 space-y-3.5 max-w-md">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Users size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Real Connections</h4>
              <p className="text-xs text-slate-400">Only your circle</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Shield size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Private & Safe</h4>
              <p className="text-xs text-slate-400">Your moments, your control</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
              <Heart size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Share What Matters</h4>
              <p className="text-xs text-slate-400">Stories, chats, and more</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Center / Hero: Dynamic Layered Story Cards ── */}
      <div className="relative my-auto py-8 z-10 w-full flex items-center justify-center">
        <div className="relative w-[340px] sm:w-[380px] h-[360px] sm:h-[400px] flex items-center justify-center">
          
          {/* Left Tilted Story Card (Behind) */}
          <motion.div 
            initial={{ opacity: 0, x: -30, rotate: -15 }}
            animate={{ opacity: 1, x: 0, rotate: -8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 -translate-x-6 sm:-translate-x-10 w-48 sm:w-56 h-72 sm:h-80 rounded-[24px] overflow-hidden border border-white/15 bg-black/80 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-md -rotate-[8deg]"
          >
            <img 
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=500&auto=format&fit=crop" 
              alt="Friends Moments" 
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            
            {/* Header Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
              <div className="flex -space-x-1.5">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-4 h-4 rounded-md object-cover border border-black" alt="" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-4 h-4 rounded-md object-cover border border-black" alt="" />
              </div>
              <span className="text-[9px] font-bold text-white">+2</span>
            </div>
          </motion.div>

          {/* Right Tilted Story Card (Behind) */}
          <motion.div 
            initial={{ opacity: 0, x: 30, rotate: 15 }}
            animate={{ opacity: 1, x: 0, rotate: 8 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute right-0 translate-x-6 sm:translate-x-10 w-48 sm:w-56 h-72 sm:h-80 rounded-[24px] overflow-hidden border border-white/15 bg-black/80 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-md rotate-[8deg]"
          >
            <img 
              src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=500&auto=format&fit=crop" 
              alt="Close Friends" 
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            
            {/* Header Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop" className="w-4 h-4 rounded-md object-cover border border-black" alt="" />
              <span className="text-[9px] font-bold text-white">+1</span>
            </div>
          </motion.div>

          {/* Center Main Story Card (Front) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 w-56 sm:w-64 h-80 sm:h-96 rounded-[28px] overflow-hidden border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(0,242,255,0.4),0_25px_60px_rgba(0,0,0,0.9)] bg-black"
          >
            <img 
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop" 
              alt="Close Friends Laughing" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />

            {/* Top Multi-friend badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/25">
              <div className="flex -space-x-1.5">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="w-4 h-4 rounded-md object-cover border border-black" alt="" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" className="w-4 h-4 rounded-md object-cover border border-black" alt="" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" className="w-4 h-4 rounded-md object-cover border border-black" alt="" />
              </div>
              <span className="text-[10px] font-bold text-white">+3</span>
            </div>

            {/* Bottom Story Interaction Bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
              <div className="flex-1 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 flex items-center text-xs text-white/70">
                <span>Send a message...</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90">
                <Heart size={15} />
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90">
                <Send size={14} />
              </div>
            </div>
          </motion.div>

          {/* Floating 3D Reaction: Purple Heart (Top Right) */}
          <motion.div 
            animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 right-4 sm:right-6 w-11 h-11 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-pink-500 p-0.5 shadow-[0_10px_25px_rgba(217,70,239,0.5)] z-20 flex items-center justify-center text-white"
          >
            <Heart size={20} className="fill-white" />
          </motion.div>

          {/* Floating 3D Reaction: Blue Heart (Middle Right) */}
          <motion.div 
            animate={{ y: [0, 8, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 -right-2 sm:-right-4 w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-[0_8px_20px_rgba(6,182,212,0.4)] z-20 flex items-center justify-center text-white"
          >
            <Heart size={16} className="fill-white" />
          </motion.div>

          {/* Floating Add Friend Badge (Bottom Right) */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-2 right-6 sm:right-10 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-white/20 shadow-[0_10px_25px_rgba(37,99,235,0.4)] z-20 flex items-center gap-1.5 text-white"
          >
            <UserPlus size={14} />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom: Clean Brand Note ── */}
      <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-slate-500">
        <span>&copy; {new Date().getFullYear()} Aeirmist Social</span>
        <span className="text-slate-400 font-medium">Authentic Connections</span>
      </div>
    </div>
  );
};
