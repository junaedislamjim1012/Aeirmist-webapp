import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Play, 
  Pause, 
  X, 
  Music, 
  TrendingUp, 
  ExternalLink, 
  Loader2, 
  Sparkles, 
  Disc,
  Upload,
  Check,
  Volume2,
  Globe,
  Radio,
  RefreshCw
} from 'lucide-react';
import { useAeirmist } from '../../context/AeirmistContext';
import { logger } from '@/src/utils/logger';

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  albumArtURL: string;
  coverArtURL: string;
  audioURL: string;
  url: string;
  previewUrl: string;
  spotifyURL?: string;
  category?: string;
  language?: string;
  isUploaded?: boolean;
}

const CATEGORIES = [
  { id: 'trending', label: 'Trending', icon: '🔥', queries: ['Global Top Hits 2025', 'Viral Hits'] },
  { id: 'bangla', label: 'Bangla', icon: '🇧🇩', queries: ['Coke Studio Bangla', 'Tahsan', 'Anupam Roy', 'Habib Wahid'] },
  { id: 'hindi', label: 'Hindi', icon: '🇮🇳', queries: ['Arijit Singh', 'Pritam Bollywood', 'Atif Aslam', 'Shreya Ghoshal'] },
  { id: 'english', label: 'English', icon: '🇬🇧', queries: ['Taylor Swift Hits', 'The Weeknd Hits', 'Billie Eilish'] },
  { id: 'arabic', label: 'Arabic', icon: '🇸🇦', queries: ['Amr Diab', 'Nancy Ajram', 'Saad Lamjarred', 'Elissa'] },
  { id: 'islamic', label: 'Islamic / Nasheed', icon: '🌙', queries: ['Maher Zain Nasheed', 'Humood AlKhudher', 'Sami Yusuf'] },
  { id: 'lofi', label: 'Lo-Fi Chill', icon: '🎧', queries: ['Lofi Beats Study', 'Chillhop Instrumental'] }
];

export const MusicSearchModal = ({ onClose, onSelect }: { onClose: () => void; onSelect: (song: any) => void }) => {
  const { user, profile, uploadMedia, addToast } = useAeirmist();
  
  // Navigation tabs: 'catalog' | 'upload'
  const [activeTab, setActiveTab] = useState<'catalog' | 'upload'>('catalog');
  
  // Category & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Audio Engine State
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Upload States
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (uploadPreviewUrl) {
        URL.revokeObjectURL(uploadPreviewUrl);
      }
    };
  }, [uploadPreviewUrl]);

  // Fetch songs for a given category or query
  const fetchCategoryTracks = async (catId: string) => {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    
    setLoading(true);
    try {
      const results = await Promise.all(
        cat.queries.map(async (queryStr) => {
          try {
            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(queryStr)}&entity=song&limit=6`);
            if (!res.ok) return [];
            const data = await res.json();
            return data.results || [];
          } catch {
            return [];
          }
        })
      );

      const seen = new Set<string>();
      const combined: Track[] = [];

      for (const list of results) {
        for (const item of list) {
          if (!item.trackName || !item.previewUrl || seen.has(item.trackId)) continue;
          seen.add(item.trackId);
          
          const artwork = (item.artworkUrl100 || '').replace('100x100bb.jpg', '400x400bb.jpg');
          const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(item.trackName + ' ' + item.artistName)}`;

          combined.push({
            id: `itunes_${item.trackId}`,
            title: item.trackName,
            artist: item.artistName || 'Unknown Artist',
            albumArtUrl: artwork,
            albumArtURL: artwork,
            coverArtURL: artwork,
            audioURL: item.previewUrl,
            url: item.previewUrl,
            previewUrl: item.previewUrl,
            spotifyURL: spotifySearchUrl,
            category: cat.label,
            language: cat.id
          });
        }
      }

      setTracks(combined);
    } catch (err) {
      logger.error('Error fetching tracks for category:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search tracks by text query
  const executeSearch = async (queryStr: string) => {
    if (!queryStr.trim()) {
      fetchCategoryTracks(selectedCategory);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(queryStr)}&entity=song&limit=25`);
      if (res.ok) {
        const data = await res.json();
        const mapped: Track[] = (data.results || [])
          .filter((item: any) => item.trackName && item.previewUrl)
          .map((item: any) => {
            const artwork = (item.artworkUrl100 || '').replace('100x100bb.jpg', '400x400bb.jpg');
            const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(item.trackName + ' ' + item.artistName)}`;

            return {
              id: `search_${item.trackId}`,
              title: item.trackName,
              artist: item.artistName || 'Unknown Artist',
              albumArtUrl: artwork,
              albumArtURL: artwork,
              coverArtURL: artwork,
              audioURL: item.previewUrl,
              url: item.previewUrl,
              previewUrl: item.previewUrl,
              spotifyURL: spotifySearchUrl
            };
          });

        setTracks(mapped);
      }
    } catch (err) {
      logger.error('Search query error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load by category
  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchCategoryTracks(selectedCategory);
    }
  }, [selectedCategory]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const timer = setTimeout(() => {
      executeSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Audio Playback handler
  const handlePlayPause = (e: React.MouseEvent, track: Track) => {
    e.stopPropagation();

    if (playingTrackId === track.id) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingTrackId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(track.previewUrl || track.audioURL);
      audioRef.current.play().catch(err => {
        logger.warn('Audio stream error:', err);
      });
      setPlayingTrackId(track.id);

      audioRef.current.onended = () => {
        setPlayingTrackId(null);
      };
    }
  };

  // Handle Track Selection
  const handleSelectTrack = (track: Track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingTrackId(null);

    onSelect({
      id: track.id,
      title: track.title,
      artist: track.artist,
      albumArtUrl: track.albumArtUrl,
      albumArtURL: track.albumArtURL,
      coverArtURL: track.coverArtURL,
      url: track.url || track.audioURL,
      audioURL: track.audioURL || track.url,
      previewUrl: track.previewUrl || track.audioURL,
      spotifyURL: track.spotifyURL,
      category: track.category,
      isSpotify: true,
      isUploaded: track.isUploaded || false
    });
  };

  // Handle File Pick
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/') && !/\.(mp3|wav|m4a|aac|ogg)$/i.test(file.name)) {
      addToast?.({
        title: 'INVALID FILE',
        message: 'Please select a valid audio file (.mp3, .m4a, .wav, .aac)',
        type: 'warning'
      });
      return;
    }

    setUploadFile(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, '');
    setCustomTitle(cleanName);
    setCustomArtist(profile?.displayName || 'Original Audio');

    if (uploadPreviewUrl) {
      URL.revokeObjectURL(uploadPreviewUrl);
    }
    const blobUrl = URL.createObjectURL(file);
    setUploadPreviewUrl(blobUrl);
  };

  // Handle Custom Audio Upload
  const handleUploadAudio = async () => {
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadProgress(10);

    try {
      let downloadUrl = '';
      if (uploadMedia) {
        downloadUrl = await uploadMedia(
          uploadFile, 
          `notes/music/${user?.uid || 'guest'}`, 
          (progress) => setUploadProgress(Math.min(95, Math.round(progress)))
        );
      } else {
        throw new Error("Upload service unavailable");
      }

      setUploadProgress(100);

      const customTrack: Track = {
        id: `upload_${Date.now()}`,
        title: customTitle.trim() || uploadFile.name.replace(/\.[^/.]+$/, ''),
        artist: customArtist.trim() || profile?.displayName || 'Original Audio',
        albumArtUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
        albumArtURL: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
        coverArtURL: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop',
        audioURL: downloadUrl,
        url: downloadUrl,
        previewUrl: downloadUrl,
        isUploaded: true
      };

      addToast?.({
        title: 'AUDIO UPLOADED',
        message: 'Your music track has been added to your note.',
        type: 'success'
      });

      handleSelectTrack(customTrack);
    } catch (err: any) {
      logger.error('Failed to upload custom audio:', err);
      addToast?.({
        title: 'UPLOAD FAILED',
        message: err.message || 'Could not upload audio file',
        type: 'warning'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2600] flex items-center justify-center bg-black/85 backdrop-blur-2xl p-3 sm:p-4"
    >
      <motion.div 
        initial={{ scale: 0.94, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.94, y: 20 }}
        className="bg-[#0b0c10] border border-white/15 rounded-[2.5rem] w-full max-w-lg p-5 sm:p-6 overflow-hidden flex flex-col max-h-[90vh] shadow-[0_32px_100px_rgba(0,0,0,0.95)] relative"
      >
        {/* Neon Glow Accent */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aeirmist-cyan to-transparent opacity-90" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-aeirmist-cyan/10 border border-aeirmist-cyan/30 flex items-center justify-center text-aeirmist-cyan">
              <Music size={16} />
            </div>
            <div>
              <h3 className="font-display font-black uppercase text-xs tracking-[0.25em] text-white">
                Music for Note
              </h3>
              <p className="text-[9px] text-white/40 uppercase font-mono tracking-wider">
                Spotify • Multi-Language • Upload
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all text-white/50 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Top Navigation Mode Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl mb-4 border border-white/5 shrink-0">
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'catalog' 
                ? 'bg-white/15 text-white shadow-lg border border-white/20' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            <Radio size={13} className="text-[#1DB954]" />
            <span>Spotify Hits</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'upload' 
                ? 'bg-aeirmist-cyan/20 text-aeirmist-cyan shadow-lg border border-aeirmist-cyan/40' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            <Upload size={13} />
            <span>Upload Music</span>
          </button>
        </div>

        {activeTab === 'catalog' ? (
          <>
            {/* Search Input */}
            <div className="relative mb-3 shrink-0">
              <Search className="absolute left-3.5 top-3 text-white/30" size={16} />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Hindi, Bangla, English, Arabic songs & artists..."
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-2.5 pl-11 pr-10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-aeirmist-cyan/50 focus:bg-white/[0.08] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-white/40 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Language & Category Quick Pills */}
            {!searchQuery && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-2 shrink-0">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border ${
                        isActive
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-white/[0.03] text-white/60 border-white/5 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Track Results List */}
            <div className="flex-1 overflow-y-auto min-h-[260px] max-h-[380px] space-y-2 pr-1 scrollbar-thin">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 size={24} className="text-aeirmist-cyan animate-spin" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Fetching Tracks...
                  </span>
                </div>
              ) : tracks.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-white/30">
                    <Music size={18} />
                  </div>
                  <p className="text-xs text-white/50 font-bold uppercase tracking-wider">
                    No songs found
                  </p>
                  <p className="text-[10px] text-white/30 mt-1">
                    Try another search keyword or switch languages.
                  </p>
                </div>
              ) : (
                tracks.map((song) => {
                  const isPlaying = playingTrackId === song.id;

                  return (
                    <div 
                      key={song.id} 
                      onClick={() => handleSelectTrack(song)}
                      className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all cursor-pointer group ${
                        isPlaying 
                          ? 'bg-white/[0.08] border-aeirmist-cyan/40 shadow-[0_4px_20px_rgba(0,242,255,0.1)]' 
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-white/15'
                      }`}
                    >
                      {/* Album Art with Play Button */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md shrink-0 bg-white/5 border border-white/10">
                        <img 
                          src={song.albumArtUrl} 
                          alt={song.title} 
                          className={`w-full h-full object-cover transition-transform duration-500 ${isPlaying ? 'animate-spin [animation-duration:6s]' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={(e) => handlePlayPause(e, song)}
                          className={`absolute inset-0 flex items-center justify-center transition-all ${
                            isPlaying 
                              ? 'bg-black/40 text-aeirmist-cyan' 
                              : 'bg-black/50 opacity-0 group-hover:opacity-100 text-white'
                          }`}
                        >
                          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                        </button>
                      </div>

                      {/* Song Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-white truncate group-hover:text-aeirmist-cyan transition-colors">
                            {song.title}
                          </span>
                          {isPlaying && (
                            <span className="flex items-end gap-[2px] h-3 ml-1 shrink-0">
                              <span className="w-[2px] h-full bg-aeirmist-cyan animate-pulse" />
                              <span className="w-[2px] h-2/3 bg-aeirmist-cyan animate-pulse [animation-delay:150ms]" />
                              <span className="w-[2px] h-4/5 bg-aeirmist-cyan animate-pulse [animation-delay:300ms]" />
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-white/40 uppercase tracking-tight truncate mt-0.5">
                          {song.artist}
                        </div>
                      </div>

                      {/* Right Action: Spotify & Play */}
                      <div className="flex items-center gap-2 shrink-0">
                        {song.spotifyURL && (
                          <a
                            href={song.spotifyURL}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-black transition-all"
                            title="Open in Spotify"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.077-.337.135-.669.47-.745 3.856-.88 7.15-.51 9.817 1.123.294.18.386.563.207.857zm1.224-2.724c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.078-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.67-1.114 8.24-.57 11.347 1.342.368.227.488.708.26 1.075zm.105-2.81c-3.262-1.937-8.644-2.115-11.758-1.17-.5.152-1.025-.133-1.177-.633-.153-.5.132-1.025.633-1.177 3.616-1.098 9.544-.89 13.3 1.34.45.267.6.845.333 1.295-.267.45-.845.6-1.295.334z"/>
                            </svg>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={(e) => handlePlayPause(e, song)}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                            isPlaying 
                              ? 'bg-aeirmist-cyan text-black shadow-lg' 
                              : 'bg-white/5 text-white/50 hover:bg-white/15 hover:text-white'
                          }`}
                        >
                          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : (
          /* Custom Music Upload View */
          <div className="flex-1 flex flex-col justify-between py-2 overflow-y-auto">
            <div className="space-y-4">
              <input 
                type="file"
                ref={fileInputRef}
                accept="audio/*,.mp3,.wav,.m4a,.aac,.ogg"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Upload Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                  uploadFile 
                    ? 'border-aeirmist-cyan/50 bg-aeirmist-cyan/5' 
                    : 'border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-aeirmist-cyan">
                  <Upload size={22} />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  {uploadFile ? uploadFile.name : 'Choose Audio File'}
                </h4>
                <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  MP3, M4A, WAV, AAC (Up to 25MB)
                </p>
              </div>

              {/* Editable Fields */}
              {uploadFile && (
                <div className="space-y-3 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 block mb-1.5">
                      Song Title
                    </label>
                    <input 
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="Title of this song"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-aeirmist-cyan"
                    />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 block mb-1.5">
                      Artist / Creator
                    </label>
                    <input 
                      value={customArtist}
                      onChange={(e) => setCustomArtist(e.target.value)}
                      placeholder="Artist name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-aeirmist-cyan"
                    />
                  </div>

                  {/* Local Audio Player Test */}
                  {uploadPreviewUrl && (
                    <div className="pt-2">
                      <audio controls src={uploadPreviewUrl} className="w-full h-8 rounded-lg" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Upload Action Button */}
            <div className="pt-4">
              {isUploading && (
                <div className="mb-3">
                  <div className="flex justify-between text-[9px] text-white/60 mb-1 font-mono">
                    <span>Uploading Audio...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-aeirmist-cyan to-aeirmist-magenta h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button 
                type="button"
                onClick={handleUploadAudio}
                disabled={!uploadFile || isUploading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-aeirmist-cyan to-aeirmist-magenta text-white font-black uppercase tracking-[0.2em] text-[10px] hover:opacity-95 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {isUploading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Check size={14} />
                    <span>Upload & Select for Note</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/30 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            Spotify & Cloud Stream
          </span>
          <span>Aeirmist Music Engine</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
