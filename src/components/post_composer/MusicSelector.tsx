import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, Search, Play, Pause, X, Volume2, Sparkles, 
  ExternalLink, Loader2, Radio, Check, Scissors, RotateCcw 
} from 'lucide-react';
import { logger } from '@/src/utils/logger';

export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
  duration?: number;
  spotifyURL?: string;
  previewUrl?: string;
  category?: string;
}

export interface SelectedMusicState {
  track: Track;
  startOffset: number;
  volume: number;
}

interface MusicSelectorProps {
  selectedTrack: SelectedMusicState | null;
  onChange: (music: SelectedMusicState | null) => void;
}

const MUSIC_GENRES = [
  { id: 'trending', label: 'Trending', icon: '🔥', query: 'Top Hits 2025' },
  { id: 'hindi', label: 'Hindi / Bollywood', icon: '🇮🇳', query: 'Arijit Singh Pritam Bollywood' },
  { id: 'bangla', label: 'Bangla', icon: '🇧🇩', query: 'Coke Studio Bangla Tahsan Anupam Roy' },
  { id: 'punjabi', label: 'Punjabi', icon: '✨', query: 'Diljit Dosanjh AP Dhillon Sidhu Moose Wala' },
  { id: 'english', label: 'English / Global', icon: '🌍', query: 'Taylor Swift The Weeknd Billie Eilish' },
  { id: 'lofi', label: 'Lo-Fi Chill', icon: '🎧', query: 'Lofi Beats Chillhop Instrumental' },
  { id: 'islamic', label: 'Islamic / Nasheed', icon: '🌙', query: 'Maher Zain Nasheed Sami Yusuf' },
  { id: 'arabic', label: 'Arabic', icon: '🎵', query: 'Amr Diab Saad Lamjarred Nancy Ajram' }
];

export const MusicSelector: React.FC<MusicSelectorProps> = ({ selectedTrack, onChange }) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('trending');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Fetch tracks from iTunes API
  const fetchTracks = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=20`);
      if (res.ok) {
        const data = await res.json();
        const seen = new Set<string>();
        const mapped: Track[] = (data.results || [])
          .filter((item: any) => item.trackName && item.previewUrl && !seen.has(item.trackId) && seen.add(item.trackId))
          .map((item: any) => {
            const artwork = (item.artworkUrl100 || '').replace('100x100bb.jpg', '400x400bb.jpg');
            const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(item.trackName + ' ' + item.artistName)}`;
            return {
              id: `itunes_${item.trackId}`,
              title: item.trackName,
              artist: item.artistName || 'Unknown Artist',
              cover: artwork || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
              url: item.previewUrl,
              previewUrl: item.previewUrl,
              duration: Math.round((item.trackTimeMillis || 30000) / 1000),
              spotifyURL: spotifyUrl
            };
          });
        setTracks(mapped);
      }
    } catch (err) {
      logger.error('Failed to fetch music tracks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger genre search when category changes
  useEffect(() => {
    if (!query.trim()) {
      const genreObj = MUSIC_GENRES.find(g => g.id === selectedGenre);
      if (genreObj) {
        fetchTracks(genreObj.query);
      }
    }
  }, [selectedGenre]);

  // Debounced search for custom queries
  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      fetchTracks(query);
    }, 450);
    return () => clearTimeout(timer);
  }, [query]);

  // Toggle Audio Play / Pause
  const togglePlay = (track: Track, e: React.MouseEvent) => {
    e.stopPropagation();
    const trackUrl = track.previewUrl || track.url;
    if (!trackUrl) return;

    if (audioRef.current) {
      if (playingId === track.id) {
        audioRef.current.pause();
        setPlayingId(null);
        return;
      } else {
        audioRef.current.pause();
      }
    }

    const audio = new Audio(trackUrl);
    if (selectedTrack && selectedTrack.track.id === track.id && selectedTrack.startOffset > 0) {
      audio.currentTime = selectedTrack.startOffset;
    }
    audio.play().catch(err => logger.warn('Audio playback error:', err));
    audioRef.current = audio;
    setPlayingId(track.id);

    audio.onended = () => {
      setPlayingId(null);
    };
  };

  // Select a track
  const handleSelectTrack = (track: Track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingId(null);
    }
    onChange({
      track,
      startOffset: 0,
      volume: 80
    });
  };

  // Remove track
  const handleRemove = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingId(null);
    }
    onChange(null);
  };

  return (
    <div className="bg-[#080b12] border border-white/10 rounded-2xl p-3.5 sm:p-4 space-y-3.5 text-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-aeirmist-cyan/15 border border-aeirmist-cyan/30 flex items-center justify-center text-aeirmist-cyan">
            <Music size={14} />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-white tracking-wider block">
              Audio Soundtrack
            </span>
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
              Spotify • Apple Preview
            </span>
          </div>
        </div>
        {selectedTrack && (
          <button
            onClick={handleRemove}
            type="button"
            className="text-[10px] text-red-400 hover:text-red-300 hover:underline uppercase font-bold flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-lg cursor-pointer"
          >
            <X size={11} /> Remove
          </button>
        )}
      </div>

      {/* Selected Track Editor */}
      {selectedTrack ? (
        <div className="space-y-3 bg-white/[0.03] p-3.5 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <img 
              src={selectedTrack.track.cover} 
              className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0 shadow-md" 
              alt={selectedTrack.track.title} 
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                <span>{selectedTrack.track.title}</span>
                {selectedTrack.track.spotifyURL && (
                  <a
                    href={selectedTrack.track.spotifyURL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#1DB954] hover:scale-110 transition-transform"
                    title="Open on Spotify"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.337.135-.669.47-.745 3.856-.88 7.15-.51 9.817 1.123.294.18.386.563.207.857zm1.224-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.67-1.114 8.24-.57 11.347 1.342.368.227.488.708.26 1.075zm.105-2.81c-3.262-1.937-8.644-2.115-11.758-1.17-.5.152-1.025-.133-1.177-.633-.153-.5.132-1.025.633-1.177 3.616-1.098 9.544-.89 13.3 1.34.45.267.6.845.333 1.295-.267.45-.845.6-1.295.334z"/>
                    </svg>
                  </a>
                )}
              </div>
              <div className="text-[10px] text-white/50 truncate mt-0.5">{selectedTrack.track.artist}</div>
            </div>
            <button
              type="button"
              onClick={(e) => togglePlay(selectedTrack.track, e)}
              className="p-2.5 bg-aeirmist-cyan text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-md shadow-aeirmist-cyan/20 cursor-pointer"
            >
              {playingId === selectedTrack.track.id ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
          </div>

          {/* Trim Start Point */}
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <div className="flex justify-between text-[10px] font-bold text-white/50 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Scissors size={12} className="text-aeirmist-cyan" /> Clip Start Point</span>
              <span className="text-aeirmist-cyan font-mono">{selectedTrack.startOffset}s</span>
            </div>
            <input
              type="range"
              min={0}
              max={Math.min(60, (selectedTrack.track.duration || 30) - 5)}
              value={selectedTrack.startOffset}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...selectedTrack, startOffset: val });
                if (audioRef.current && playingId === selectedTrack.track.id) {
                  audioRef.current.currentTime = val;
                }
              }}
              className="w-full accent-aeirmist-cyan bg-white/10 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold text-white/50 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Volume2 size={12} className="text-aeirmist-cyan" /> Track Volume</span>
              <span className="text-aeirmist-cyan font-mono">{selectedTrack.volume}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={selectedTrack.volume}
              onChange={(e) => {
                const val = Number(e.target.value);
                onChange({ ...selectedTrack, volume: val });
                if (audioRef.current) {
                  audioRef.current.volume = val / 100;
                }
              }}
              className="w-full accent-aeirmist-cyan bg-white/10 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      ) : (
        /* Search & Browse View */
        <div className="space-y-3">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Hindi, Bangla, Punjabi, English songs & artists..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs text-white focus:outline-none focus:border-aeirmist-cyan placeholder:text-white/30 transition-all"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Genre / Language Quick Pills */}
          {!query && (
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {MUSIC_GENRES.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer border ${
                    selectedGenre === genre.id
                      ? 'bg-aeirmist-cyan text-black border-aeirmist-cyan shadow-sm font-black'
                      : 'bg-white/5 text-white/60 border-white/5 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{genre.icon}</span>
                  <span>{genre.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Results List */}
          <div className="space-y-1 max-h-48 sm:max-h-56 overflow-y-auto pr-1 scrollbar-thin">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 gap-2">
                <Loader2 size={18} className="text-aeirmist-cyan animate-spin" />
                <span className="text-[10px] font-mono text-white/40 uppercase">Loading Songs...</span>
              </div>
            ) : tracks.length === 0 ? (
              <div className="text-center py-6 text-white/40">
                <Music size={20} className="mx-auto mb-1 text-white/20" />
                <p className="text-xs">No songs found. Try a different search term.</p>
              </div>
            ) : (
              tracks.map((track) => {
                const isPlaying = playingId === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => handleSelectTrack(track)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer group border ${
                      isPlaying 
                        ? 'bg-white/[0.08] border-aeirmist-cyan/30' 
                        : 'hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <img src={track.cover} className="w-full h-full object-cover" alt="" />
                      <button
                        type="button"
                        onClick={(e) => togglePlay(track, e)}
                        className={`absolute inset-0 flex items-center justify-center transition-all ${
                          isPlaying 
                            ? 'bg-black/50 text-aeirmist-cyan' 
                            : 'bg-black/40 opacity-0 group-hover:opacity-100 text-white'
                        }`}
                      >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
                      </button>
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-xs font-bold text-white group-hover:text-aeirmist-cyan transition-colors truncate">
                        {track.title}
                      </div>
                      <div className="text-[10px] text-white/40 truncate">{track.artist}</div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {track.spotifyURL && (
                        <a
                          href={track.spotifyURL}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 text-white/30 hover:text-[#1DB954] transition-colors"
                          title="Open Spotify"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.337.135-.669.47-.745 3.856-.88 7.15-.51 9.817 1.123.294.18.386.563.207.857zm1.224-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.67-1.114 8.24-.57 11.347 1.342.368.227.488.708.26 1.075zm.105-2.81c-3.262-1.937-8.644-2.115-11.758-1.17-.5.152-1.025-.133-1.177-.633-.153-.5.132-1.025.633-1.177 3.616-1.098 9.544-.89 13.3 1.34.45.267.6.845.333 1.295-.267.45-.845.6-1.295.334z"/>
                          </svg>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={(e) => togglePlay(track, e)}
                        className={`p-1.5 rounded-lg text-xs ${isPlaying ? 'text-aeirmist-cyan' : 'text-white/40 group-hover:text-white'}`}
                      >
                        {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
