import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  const [capturedPoster, setCapturedPoster] = useState<string | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Derive smart poster (Cloudinary auto-thumbnail, explicit poster, or captured frame)
  const derivedPoster = useMemo(() => {
    if (poster && poster.trim()) return poster;
    if (!src) return undefined;
    if (src.includes('/video/upload/')) {
      return src
        .replace('/video/upload/', '/video/upload/so_0.5,f_jpg,q_auto/')
        .replace(/\.[a-zA-Z0-9]+(\?.*)?$/, '.jpg$1');
    }
    return undefined;
  }, [poster, src]);

  const effectivePoster = derivedPoster || capturedPoster;

  // Video URL with #t=0.001 first-frame seeking for browsers that support it
  const videoSrcWithFragment = useMemo(() => {
    if (!currentSrc) return '';
    if (currentSrc.includes('#t=')) return currentSrc;
    return `${currentSrc}#t=0.001`;
  }, [currentSrc]);

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

  // AutoPlay on Scroll Intersection Observer (only if autoPlay is requested)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true;
            setIsMuted(true);
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
      { threshold: 0.45 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [autoPlay]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  // Capture canvas poster frame if no thumbnail URL was provided
  const handleLoadedData = () => {
    setIsBuffering(false);
    if (!derivedPoster && !capturedPoster && videoRef.current) {
      try {
        const vid = videoRef.current;
        if (vid.videoWidth > 0 && vid.videoHeight > 0) {
          const canvas = document.createElement('canvas');
          canvas.width = Math.min(vid.videoWidth, 640);
          canvas.height = Math.round((canvas.width / vid.videoWidth) * vid.videoHeight);
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            if (dataUrl && dataUrl.length > 100) {
              setCapturedPoster(dataUrl);
            }
          }
        }
      } catch (e) {
        // Cross-origin canvas capture might be blocked; browser #t=0.001 handles fallback
      }
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
      className="relative w-full h-full min-h-[240px] max-h-[540px] overflow-hidden group/video bg-[#080b12] flex items-center justify-center cursor-pointer select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrcWithFragment}
        poster={effectivePoster}
        className={className}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onLoadedData={handleLoadedData}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
      />

      {/* Poster Background or First Frame Preview */}
      {!isPlaying && effectivePoster && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90 filter blur-[0.5px] pointer-events-none transition-opacity duration-500"
          style={{ backgroundImage: `url(${effectivePoster})` }}
        />
      )}

      {/* Fallback Loading Skeleton if no poster and video metadata hasn't loaded */}
      {!isPlaying && !effectivePoster && !duration && (
        <div className="absolute inset-0 bg-[#07090f] flex flex-col items-center justify-center gap-2 pointer-events-none">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-aeirmist-cyan/60">
            <Film size={26} className="animate-pulse" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Loading Media...</span>
        </div>
      )}

      {/* TOP HEADER OVERLAY (Video Badge & Info) */}
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

      {/* CENTER PLAY BUTTON / BUFFERING INDICATOR */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        {isBuffering ? (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/75 backdrop-blur-md border border-aeirmist-cyan/50 flex items-center justify-center text-aeirmist-cyan shadow-[0_0_35px_rgba(0,242,255,0.4)]">
            <Loader2 size={32} className="animate-spin text-aeirmist-cyan" />
          </div>
        ) : !isPlaying ? (
          <button
            type="button"
            onClick={handlePlayPause}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-md border-2 border-white/30 hover:border-aeirmist-cyan text-white shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center justify-center group-hover/video:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
            aria-label="Play video"
          >
            <Play size={28} className="fill-aeirmist-cyan text-aeirmist-cyan ml-1 drop-shadow-[0_0_15px_rgba(0,242,255,0.8)]" />
          </button>
        ) : null}
      </div>

      {/* DEDICATED BOTTOM-SIDE MUTE / UNMUTE BUTTON (User requirement: niche side e mute/unmute button) */}
      <button 
        type="button"
        onClick={handleMuteToggle}
        className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 border border-white/25 hover:border-aeirmist-cyan/80 backdrop-blur-md flex items-center justify-center text-white shadow-2xl transition-all duration-200 active:scale-90 group/mute cursor-pointer pointer-events-auto"
        title={isMuted ? 'Unmute' : 'Mute'}
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted ? (
          <VolumeX size={17} className="text-white/80 group-hover/mute:text-white transition-colors" />
        ) : (
          <Volume2 size={17} className="text-aeirmist-cyan drop-shadow-[0_0_8px_rgba(0,242,255,0.8)] animate-pulse" />
        )}
      </button>

      {/* BOTTOM CONTROLS & TIMELINE (Timeline Scrubber + Fullscreen) */}
      <div className={`absolute bottom-0 left-0 right-0 p-3 pt-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2 z-20 transition-opacity duration-300 ${(!isPlaying || showControls) ? 'opacity-100' : 'opacity-0 md:group-hover/video:opacity-100'}`}>
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

        {/* Action Controls Row (Padding on right to leave room for the floating mute button) */}
        <div className="flex items-center justify-between text-white text-xs pointer-events-auto pr-14">
          <div className="flex items-center gap-2.5">
            {/* Play/Pause Button */}
            <button 
              type="button"
              onClick={handlePlayPause}
              className="w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white hover:text-aeirmist-cyan transition-all active:scale-90 cursor-pointer"
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
            {/* Fullscreen Button */}
            <button 
              type="button"
              onClick={handleFullscreen}
              className="w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white hover:text-aeirmist-cyan transition-all active:scale-90 cursor-pointer"
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
