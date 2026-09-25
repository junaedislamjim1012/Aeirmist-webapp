/**
 * Location Tracking & Device Metadata Service
 * Supports Web & APK (Capacitor/Android WebView) with Geolocation API & safe IP-based fallback.
 */

import { logger } from '../utils/logger';

export interface LocationData {
  city?: string;
  country?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
  ip?: string;
  displayLocation: string;
  timestamp: number;
}

export interface DeviceMetadata {
  platform: string;
  userAgent: string;
  isMobile: boolean;
  isApp: boolean;
}

export class LocationTrackingService {
  private static cachedLocation: LocationData | null = null;
  private static lastFetchTime = 0;
  private static readonly CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

  /**
   * Detect client platform and device metadata
   */
  public static getDeviceMetadata(): DeviceMetadata {
    if (typeof window === 'undefined' || !navigator) {
      return { platform: 'Unknown', userAgent: '', isMobile: false, isApp: false };
    }

    const ua = navigator.userAgent || '';
    const isApp = Boolean((window as any).Capacitor?.isNativePlatform?.() || ua.includes('Capacitor') || ua.includes('wv'));
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    let platform = 'Web';
    if (isApp) {
      platform = 'Aeirmist Android APK';
    } else if (/Android/i.test(ua)) {
      platform = 'Android Web';
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      platform = 'iOS Web';
    } else if (/Windows/i.test(ua)) {
      platform = 'Windows PC';
    } else if (/Macintosh|Mac OS/i.test(ua)) {
      platform = 'macOS';
    } else if (/Linux/i.test(ua)) {
      platform = 'Linux';
    }

    return {
      platform,
      userAgent: ua.slice(0, 150),
      isMobile,
      isApp
    };
  }

  /**
   * Request location permission and capture current location coordinates
   */
  public static async captureCurrentLocation(): Promise<LocationData> {
    const now = Date.now();
    if (this.cachedLocation && now - this.lastFetchTime < this.CACHE_TTL_MS) {
      return this.cachedLocation;
    }

    // 1. Attempt High-Accuracy GPS Geolocation
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      try {
        const gpsCoords = await new Promise<GeolocationCoordinates | null>((resolve) => {
          const timer = setTimeout(() => resolve(null), 6000);
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              clearTimeout(timer);
              resolve(pos.coords);
            },
            () => {
              clearTimeout(timer);
              resolve(null);
            },
            { timeout: 5000, maximumAge: 60000, enableHighAccuracy: false }
          );
        });

        if (gpsCoords) {
          const lat = Number(gpsCoords.latitude.toFixed(4));
          const lng = Number(gpsCoords.longitude.toFixed(4));
          
          // Optional reverse-geocoding or fallback to coordinates string
          const loc: LocationData = {
            latitude: lat,
            longitude: lng,
            displayLocation: `Lat ${lat}, Lng ${lng}`,
            timestamp: now
          };
          
          this.cachedLocation = loc;
          this.lastFetchTime = now;
          return loc;
        }
      } catch (e) {
        logger.warn('[LocationTrackingService] GPS capture bypassed:', e);
      }
    }

    // 2. Fallback: Fast IP-Based Geolocation (No GPS permission needed, 100% safe)
    try {
      const response = await fetch('https://ipapi.co/json/', { method: 'GET', signal: AbortSignal.timeout(4000) });
      if (response.ok) {
        const data = await response.json();
        const city = data.city || '';
        const region = data.region || '';
        const country = data.country_name || data.country || '';
        
        let display = [city, country].filter(Boolean).join(', ');
        if (!display) display = 'Aeirmist Node';

        const loc: LocationData = {
          city,
          region,
          country,
          latitude: data.latitude,
          longitude: data.longitude,
          ip: data.ip,
          displayLocation: display,
          timestamp: now
        };

        this.cachedLocation = loc;
        this.lastFetchTime = now;
        return loc;
      }
    } catch {
      // IP lookup failed or offline
    }

    // 3. Fallback: Timezone-based heuristic
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const display = timeZone ? timeZone.replace(/_/g, ' ') : 'Online Node';
      const loc: LocationData = {
        displayLocation: display,
        timestamp: now
      };
      this.cachedLocation = loc;
      this.lastFetchTime = now;
      return loc;
    } catch {
      return {
        displayLocation: 'Active Node',
        timestamp: now
      };
    }
  }
}
