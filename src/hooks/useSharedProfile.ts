/**
 * SharedProfileCache — Singleton Firestore profile listener pool.
 *
 * Prevents the N × 4 listener explosion in Messenger by ensuring only ONE
 * onSnapshot listener is open per profile document, regardless of how many
 * UI components (LiveParticipantAvatar, LiveParticipantName, etc.) subscribe.
 *
 * Usage:
 *   const data = useSharedProfile(db, participantId);
 *   // data?.photoURL, data?.displayName, data?.isDeleted, etc.
 */
import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, Firestore } from 'firebase/firestore';

export interface SharedProfileData {
  photoURL?: string;
  displayName?: string;
  username?: string;
  isDeleted?: boolean;
  status?: string;
  lastSeen?: any;
  privacySettings?: { showActivity?: boolean; [k: string]: any };
  messagingSettings?: { onlineStatus?: boolean; [k: string]: any };
  [key: string]: any;
}

interface CacheEntry {
  data: SharedProfileData | null;
  subscribers: Set<(data: SharedProfileData | null) => void>;
  unsubscribe: () => void;
}

const profileCache = new Map<string, CacheEntry>();

function getCacheKey(db: Firestore, profileId: string): string {
  const dbApp = (db as any)?.app?.name || 'default';
  const dbId = (db as any)?._databaseId?.database || (db as any)?.databaseId || 'default';
  return `${dbApp}::${dbId}::${profileId.trim()}`;
}

function subscribe(
  db: Firestore,
  profileId: string,
  callback: (data: SharedProfileData | null) => void
): () => void {
  const key = getCacheKey(db, profileId);
  if (!profileId.trim()) return () => {};

  let entry = profileCache.get(key);

  if (!entry) {
    // First subscriber — open ONE listener
    const subscribers = new Set<(data: SharedProfileData | null) => void>();
    let currentData: SharedProfileData | null = null;

    const unsubscribe = onSnapshot(
      doc(db, 'profiles', key),
      (snap) => {
        if (snap.exists()) {
          const raw = snap.data();
          currentData = {
            ...raw,
            isDeleted: raw.isDeleted === true || raw.status === 'deleted',
          } as SharedProfileData;
        } else {
          currentData = { isDeleted: true };
        }
        // Notify all subscribers
        for (const cb of subscribers) {
          cb(currentData);
        }
      },
      (err) => {
        console.warn('[SharedProfileCache] listener error for', key, err);
      }
    );

    entry = { data: currentData, subscribers, unsubscribe };
    profileCache.set(key, entry);
  }

  entry.subscribers.add(callback);

  // If we already have data (late subscriber), send it immediately
  if (entry.data !== undefined && entry.data !== null) {
    callback(entry.data);
  }

  // Return unsubscribe function
  return () => {
    const e = profileCache.get(key);
    if (!e) return;
    e.subscribers.delete(callback);
    if (e.subscribers.size === 0) {
      // Last subscriber — tear down the Firestore listener
      e.unsubscribe();
      profileCache.delete(key);
    }
  };
}

/**
 * React hook — returns live SharedProfileData for a given profile ID.
 * All components using the same profileId share ONE Firestore listener.
 */
export function useSharedProfile(
  db: Firestore | null | undefined,
  profileId: string | null | undefined
): SharedProfileData | null {
  const [data, setData] = useState<SharedProfileData | null>(null);

  useEffect(() => {
    if (!db || !profileId || typeof profileId !== 'string' || !profileId.trim()) {
      setData(null);
      return;
    }

    return subscribe(db, profileId, setData);
  }, [db, profileId]);

  return data;
}

/** Imperatively clear the cache (e.g. on logout). */
export function clearProfileCache() {
  for (const [, entry] of profileCache) {
    entry.unsubscribe();
  }
  profileCache.clear();
}
