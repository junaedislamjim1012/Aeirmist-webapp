import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Maximize, Film, Loader2 } from 'lucide-react';
import { mediaService } from '../../services/MediaService';
import { logger } from '@/src/utils/logger';

interface VideoPlayerProps {
  src: string;
  className?: string;
  poster?: string;
  title?: string;
  caption?: string;
  useCache?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  onNavigateToWatch?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  className = "w-full h-full object-cover",
  poster,
  title,
  caption,
  useCache = false,
  controls = false,
  autoPlay = false,
  onNavigateToWatch
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [showControls, setShowControls] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cached media loader
  useEffect(() => {
    if (!useCache || !src) {
      setCurrentSrc(src);
      return;
    }

    let isMounted = true;
    const loadCachedVideo = async () => {
      try {
        const cachedUrl = await mediaService.getCachedMediaURL(src, 'video/mp4');
        if (isMounted) setCurrentSrc(cachedUrl);
      } catch (e) {
        if (isMounted) setCurrentSrc(src);
      }
    };
    loadCachedVideo();
    return () => { isMounted = false; };
  }, [src, useCache]);

  // AutoPlay on Scroll Intersection Observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play()
              .then(() => setIsPlaying(true))
              .catch((err) => {
                logger.info('Auto-play prevented by browser policy:', err);
                setIsPlaying(false);
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserInteracted(true);
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    } else {
      video.play()
        .then(() => {
          setIsPlaying(true);
          resetControlsTimer();
        })
        .catch((err) => logger.info(err));
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    const progressPct = (video.currentTime / video.duration) * 100;
    setProgress(isNaN(progressPct) ? 0 : progressPct);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setDuration(video.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newProgress * duration;
    setProgress(newProgress * 100);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const displayHeadline = title || caption;

  return (
    <div 
      ref={containerRef} 
      onClick={handlePlayPause}
      onMouseMove={resetControlsTimer}
      className="relative w-full h-full min-h-[220px] max-h-[520px] overflow-hidden group/video bg-[#0b0c10] flex items-center justify-center cursor-pointer select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={currentSrc}
        poster={poster}
        className={className}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
      />

      {/* Fallback Poster Background if paused and video has not loaded frame */}
      {!isPlaying && poster && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-[1px] pointer-events-none transition-opacity duration-500"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}

      {/* TOP HEADER OVERLAY (Always readable or elegant gradient) */}
      <div className={`absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/85 via-black/40 to-transparent flex items-center justify-between z-20 transition-opacity duration-300 ${(!isPlaying || showControls) ? 'opacity-100' : 'opacity-0 md:group-hover/video:opacity-100'}`}>
        <div className="flex items-center gap-2 min-w-0 pr-3">
          <span className="px-2.5 py-1 rounded-full bg-aeirmist-cyan/20 border border-aeirmist-cyan/40 text-aeirmist-cyan text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-sm shrink-0">
            <Film size={11} className="fill-current" /> Video
          </span>
          {displayHeadline && (
            <span className="text-xs font-semibold text-white/95 truncate drop-shadow-md">
              {displayHeadline}
            </span>
          )}
        </div>

        {duration > 0 && (
          <span className="text-[10px] font-mono text-white/70 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 shrink-0">
            {formatTime(duration)}
          </span>
        )}
      </div>

      {/* CENTER PLAY / PAUSE / BUFFERING INDICATOR */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
        {isBuffering ? (
          <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-aeirmist-cyan shadow-2xl">
            <Loader2 size={26} className="animate-spin" />
          </div>
        ) : !isPlaying ? (
          <div className="w-16 h-16 rounded-full bg-black/65 backdrop-blur-lg border border-white/25 flex items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] group-hover/video:scale-110 active:scale-95 transition-all">
            <Play size={26} className="fill-current ml-1 text-aeirmist-cyan drop-shadow-[0_0_12px_rgba(0,242,255,0.6)]" />
          </div>
        ) : null}
      </div>

      {/* BOTTOM CONTROLS & TIMELINE (Standard Social Media Video Layout) */}
      <div className={`absolute bottom-0 left-0 right-0 p-3 pt-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 z-20 transition-opacity duration-300 ${(!isPlaying || showControls) ? 'opacity-100' : 'opacity-0 md:group-hover/video:opacity-100'}`}>
        {/* Timeline Scrubber */}
        <div 
          onClick={handleSeek}
          className="h-2 w-full flex items-center cursor-pointer group/scrub relative"
        >
          <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden group-hover/scrub:h-1.5 transition-all">
            <div 
              className="h-full bg-gradient-to-r from-aeirmist-cyan to-aeirmist-magenta rounded-full relative"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between text-white text-xs pointer-events-auto">
          <div className="flex items-center gap-2.5">
            {/* Play/Pause Button */}
            <button 
              onClick={handlePlayPause}
              className="w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white hover:text-aeirmist-cyan transition-all active:scale-90"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={13} className="fill-current" /> : <Play size={13} className="fill-current ml-0.5" />}
            </button>

            {/* Time Indicator */}
            <span className="text-[10px] font-mono text-white/80 font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Floating Speaker Mute Button */}
            <button 
              onClick={handleMuteToggle}
              className="w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white hover:text-aeirmist-cyan transition-all active:scale-90"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="text-aeirmist-cyan" />}
            </button>

            {/* Fullscreen Button */}
            <button 
              onClick={handleFullscreen}
              className="w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white hover:text-aeirmist-cyan transition-all active:scale-90"
              title="Fullscreen"
            >
              <Maximize size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
