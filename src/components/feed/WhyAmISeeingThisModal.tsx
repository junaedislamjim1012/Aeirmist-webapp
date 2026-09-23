import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Users, UserCheck, Heart, Sliders, X, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { RankingReason } from '../../services/FeedRankingService';

interface WhyAmISeeingThisModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: any;
  rankingReason?: RankingReason;
  onShowLess?: () => void;
  onMuteCreator?: () => void;
}

export const WhyAmISeeingThisModal: React.FC<WhyAmISeeingThisModalProps> = ({
  isOpen,
  onClose,
  post,
  rankingReason,
  onShowLess,
  onMuteCreator
}) => {
  if (!isOpen || !post) return null;

  const authorName = post.author?.name || post.authorName || 'Creator';
  const reason = rankingReason || post._rankingReason || {
    type: 'fresh',
    text: 'Recent content shared in your network',
    breakdown: {
      freshness: 80,
      relationship: 20,
      interests: 0,
      engagement: 30,
      quality: 10,
      diversityPenalty: 0,
      feedbackPenalty: 0,
      total: 75
    }
  };

  const getReasonIcon = () => {
    switch (reason.type) {
      case 'following':
        return <UserCheck className="text-aeirmist-cyan" size={20} />;
      case 'friend':
        return <Users className="text-emerald-400" size={20} />;
      case 'interest':
        return <Tag className="text-purple-400" size={20} />;
      case 'engagement':
        return <Heart className="text-rose-400" size={20} />;
      case 'own_post':
        return <ShieldCheck className="text-cyan-400" size={20} />;
      default:
        return <Clock className="text-amber-400" size={20} />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="why-seeing-title"
          className="relative w-full max-w-[420px] bg-[#0c101a]/98 backdrop-blur-2xl border border-white/10 hover:border-cyan-500/30 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,242,255,0.12)] flex flex-col max-h-[90dvh] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-aeirmist-cyan/20 border border-aeirmist-cyan/30 flex items-center justify-center text-aeirmist-cyan">
                <Sparkles size={16} />
              </div>
              <div>
                <h2 id="why-seeing-title" className="text-xs font-black uppercase tracking-widest text-white">Why am I seeing this?</h2>
                <p className="text-[10px] text-white/40 font-mono">Aeirmist Deterministic Feed 2.0</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 overflow-y-auto no-scrollbar">
            {/* Primary Explanation Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 shrink-0 mt-0.5">
                {getReasonIcon()}
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-aeirmist-cyan">Primary Factor</span>
                <p className="text-sm font-semibold text-white/95 leading-snug">
                  {reason.text}
                </p>
                <p className="text-[11px] text-white/50 leading-relaxed pt-1">
                  Ranked by fresh signals, relationship weighting, and creator diversity on your timeline.
                </p>
              </div>
            </div>

            {/* Score Factors Breakdown */}
            {reason.breakdown && (
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Signal Weights</span>
                  <span className="text-[10px] font-mono font-bold text-aeirmist-cyan">
                    Score: {reason.breakdown.total} pts
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-white/70">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Clock size={12} className="text-amber-400" /> Freshness
                    </span>
                    <span className="font-mono text-[10px] text-white/50">{reason.breakdown.freshness}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <UserCheck size={12} className="text-aeirmist-cyan" /> Relationship
                    </span>
                    <span className="font-mono text-[10px] text-white/50">{reason.breakdown.relationship}</span>
                  </div>
                  {reason.breakdown.interests > 0 && (
                    <div className="flex items-center justify-between text-white/70">
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <Tag size={12} className="text-purple-400" /> Topics & Interests
                      </span>
                      <span className="font-mono text-[10px] text-white/50">+{reason.breakdown.interests}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-white/70">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Heart size={12} className="text-rose-400" /> Community Engagement
                    </span>
                    <span className="font-mono text-[10px] text-white/50">{reason.breakdown.engagement}</span>
                  </div>
                  {reason.breakdown.diversityPenalty > 0 && (
                    <div className="flex items-center justify-between text-amber-300/80">
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <Sliders size={12} className="text-amber-400" /> Diversity Adjustment
                      </span>
                      <span className="font-mono text-[10px]">-{reason.breakdown.diversityPenalty}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions to Tune Feed */}
            <div className="space-y-2 pt-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-white/40 px-1">Tune Your Experience</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onShowLess?.();
                    onClose();
                  }}
                  className="px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-bold text-white/80 hover:text-white transition-all text-center cursor-pointer"
                >
                  Show Less Like This
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onMuteCreator?.();
                    onClose();
                  }}
                  className="px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-[11px] font-bold text-white/80 hover:text-rose-300 transition-all text-center cursor-pointer"
                >
                  Mute @{authorName}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-white/10 bg-black/40">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-white/10 cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
