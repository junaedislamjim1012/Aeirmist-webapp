/**
 * Device tier detection and adaptive performance helpers for Aeirmist.
 * Identifies low-to-mid-end hardware (e.g. <= 4GB RAM, <= 4 CPU cores)
 * to intelligently adapt CSS effects, compositing layers, and memory footprints
 * without compromising visual beauty or UX.
 */

export interface DeviceProfile {
  isAndroid: boolean;
  isLowEnd: boolean;
  cores: number;
  memoryGb?: number;
}

export function detectDeviceProfile(): DeviceProfile {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return { isAndroid: false, isLowEnd: false, cores: 4 };
  }

  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;

  // Check device memory (RAM in GB) if supported by Chromium/WebView
  const navMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;

  // Low-to-mid end detection:
  // <= 4GB RAM or <= 4 CPU cores on mobile/Android devices
  const isLowEnd = isAndroid && (
    (typeof navMemory === 'number' && navMemory <= 4) ||
    cores <= 4
  );

  return {
    isAndroid,
    isLowEnd,
    cores,
    memoryGb: navMemory,
  };
}

export function applyDeviceOptimizations(): void {
  if (typeof document === 'undefined') return;

  const profile = detectDeviceProfile();
  const root = document.documentElement;

  if (profile.isAndroid) {
    root.classList.add('android-device');
  }

  if (profile.isLowEnd) {
    root.classList.add('low-end-device');
  }

  // Handle system-level power-saver or reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('reduced-motion');
  }
}
