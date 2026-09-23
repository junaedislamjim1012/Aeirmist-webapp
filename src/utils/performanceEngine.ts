export type AeirmistDeviceTier = 'lite' | 'balanced' | 'full';

export interface PerformanceProfile {
  tier: AeirmistDeviceTier;
  reducedMotion: boolean;
  reduceBlur: boolean;
  imageConcurrency: number;
  prefetchPosts: number;
}

function getMemoryGB(): number | null {
  const value = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getCores(): number {
  return typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency > 0
    ? navigator.hardwareConcurrency
    : 4;
}

export function detectPerformanceProfile(): PerformanceProfile {
  const memory = getMemoryGB();
  const cores = getCores();
  const connection = (navigator as Navigator & {
    connection?: { effectiveType?: string; saveData?: boolean };
  }).connection;

  const slowNetwork = connection?.saveData === true ||
    connection?.effectiveType === 'slow-2g' ||
    connection?.effectiveType === '2g';

  const lite = (memory !== null && memory <= 4) || cores <= 4;
  const veryLite = (memory !== null && memory <= 2) || cores <= 2;

  if (veryLite || (lite && slowNetwork)) {
    return {
      tier: 'lite',
      reducedMotion: true,
      reduceBlur: true,
      imageConcurrency: 2,
      prefetchPosts: 4,
    };
  }

  if (lite || slowNetwork) {
    return {
      tier: 'balanced',
      reducedMotion: false,
      reduceBlur: true,
      imageConcurrency: 3,
      prefetchPosts: 8,
    };
  }

  return {
    tier: 'full',
    reducedMotion: false,
    reduceBlur: false,
    imageConcurrency: 5,
    prefetchPosts: 12,
  };
}

export function applyPerformanceProfile(profile: PerformanceProfile): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.dataset.deviceTier = profile.tier;
  root.classList.toggle('device-lite', profile.tier === 'lite');
  root.classList.toggle('device-balanced', profile.tier === 'balanced');
  root.classList.toggle('device-full', profile.tier === 'full');

  root.classList.toggle('adaptive-reduced-motion', profile.reducedMotion);
  root.classList.toggle('adaptive-reduced-blur', profile.reduceBlur);
}

export function observePerformanceProfile(onChange: (profile: PerformanceProfile) => void): () => void {
  const update = () => {
    const profile = detectPerformanceProfile();
    applyPerformanceProfile(profile);
    onChange(profile);
  };

  update();

  const connection = (navigator as Navigator & {
    connection?: EventTarget;
  }).connection;

  connection?.addEventListener?.('change', update);
  window.addEventListener('online', update);
  window.addEventListener('offline', update);

  return () => {
    connection?.removeEventListener?.('change', update);
    window.removeEventListener('online', update);
    window.removeEventListener('offline', update);
  };
}
