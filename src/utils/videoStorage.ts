import { PlaybackProgress, VideoPlaylist } from '../types/videos';
import { logger } from '@/src/utils/logger';


const PROGRESS_KEY = 'aeirmist_video_progress_v2';
const HISTORY_KEY = 'aeirmist_video_history_v2';
const PLAYLISTS_KEY = 'aeirmist_video_playlists_v2';

/**
 * Format duration in seconds to HH:MM:SS or MM:SS string
 */
export function formatDuration(seconds?: number): string {
  if (!seconds || isNaN(seconds) || seconds <= 0) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/**
 * Format remaining time for Continue Watching (e.g. "32 min left" or "1 hr left")
 */
export function formatTimeLeft(currentTime: number, totalDuration: number): string {
  const left = Math.max(0, totalDuration - currentTime);
  if (left <= 0) return 'Completed';
  const mins = Math.ceil(left / 60);
  if (mins < 60) return `${mins} min left`;
  const hrs = (left / 3600).toFixed(1);
  return `${hrs} hr left`;
}

/**
 * Playback progress persistence
 */
export function getPlaybackProgressMap(): Record<string, PlaybackProgress> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function savePlaybackProgress(videoId: string, currentTime: number, duration: number) {
  if (!videoId || !duration || isNaN(currentTime) || isNaN(duration)) return;
  try {
    const map = getPlaybackProgressMap();
    // Only store if watched more than 3 seconds and less than 98% complete
    if (currentTime > 3 && currentTime < duration * 0.98) {
      map[videoId] = {
        videoId,
        currentTime: Math.floor(currentTime),
        duration: Math.floor(duration),
        lastWatchedAt: Date.now()
      };
    } else if (currentTime >= duration * 0.98) {
      delete map[videoId];
    }
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
  } catch (e) {
    logger.error('Error saving playback progress', e);
  }
}

export function removePlaybackProgress(videoId: string) {
  try {
    const map = getPlaybackProgressMap();
    delete map[videoId];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
  } catch (e) {
    logger.error(e);
  }
}

/**
 * Watch history persistence
 */
export function getWatchHistory(): string[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToWatchHistory(videoId: string) {
  if (!videoId) return;
  try {
    let history = getWatchHistory();
    history = [videoId, ...history.filter(id => id !== videoId)].slice(0, 100);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    logger.error(e);
  }
}

export function removeFromWatchHistory(videoId: string) {
  try {
    const history = getWatchHistory().filter(id => id !== videoId);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    logger.error(e);
  }
}

export function clearWatchHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    logger.error(e);
  }
}

/**
 * Local playlists persistence fallback
 */
export function getLocalPlaylists(): VideoPlaylist[] {
  try {
    const raw = localStorage.getItem(PLAYLISTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalPlaylists(playlists: VideoPlaylist[]) {
  try {
    localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(playlists));
  } catch (e) {
    logger.error(e);
  }
}
