/**
 * Telegram-Style Download Path & Storage Management Service
 * Coordinates system Downloads, Temporary App Cache, and SAF Custom Folder selection.
 */

import { logger } from '../utils/logger';

export type DownloadMode = 'system_downloads' | 'temp' | 'custom';

export interface DownloadPathConfig {
  mode: DownloadMode;
  customUri?: string;
  customName?: string;
  displayPath: string;
  isAvailable: boolean;
  isNative: boolean;
}

const STORAGE_KEY_MODE = 'aeirmist_download_mode';
const STORAGE_KEY_CUSTOM_NAME = 'aeirmist_download_custom_name';
const STORAGE_KEY_CUSTOM_URI = 'aeirmist_download_custom_uri';

export class DownloadManagerService {
  /**
   * Check if running in native Android Capacitor APK environment
   */
  public static isNativeAndroid(): boolean {
    if (typeof window === 'undefined') return false;
    const isNative = Boolean((window as any).Capacitor?.isNativePlatform?.());
    const ua = navigator?.userAgent || '';
    return isNative || (ua.includes('Capacitor') && ua.includes('Android'));
  }

  /**
   * Get current download path configuration
   */
  public static async getConfig(): Promise<DownloadPathConfig> {
    const isNative = this.isNativeAndroid();

    if (isNative && (window as any).Capacitor?.Plugins?.NativeSettings?.getDownloadPathConfig) {
      try {
        const nativeConfig = await (window as any).Capacitor.Plugins.NativeSettings.getDownloadPathConfig();
        const mode = (nativeConfig.mode || 'system_downloads') as DownloadMode;
        
        let displayPath = 'Downloads / Aeirmist';
        if (mode === 'temp') {
          displayPath = 'App Cache (Temporary)';
        } else if (mode === 'custom' && nativeConfig.customName) {
          displayPath = nativeConfig.customName;
        }

        return {
          mode,
          customUri: nativeConfig.customUri,
          customName: nativeConfig.customName,
          displayPath,
          isAvailable: nativeConfig.isAvailable !== false,
          isNative: true
        };
      } catch (err) {
        logger.warn('[DownloadManagerService] Native config fetch fallback:', err);
      }
    }

    // Web / Fallback local storage
    try {
      const mode = (localStorage.getItem(STORAGE_KEY_MODE) as DownloadMode) || 'system_downloads';
      const customName = localStorage.getItem(STORAGE_KEY_CUSTOM_NAME) || '';
      const customUri = localStorage.getItem(STORAGE_KEY_CUSTOM_URI) || '';

      let displayPath = 'System Downloads / Aeirmist';
      if (mode === 'temp') {
        displayPath = 'Session / Browser Cache';
      } else if (mode === 'custom' && customName) {
        displayPath = customName;
      }

      return {
        mode,
        customUri,
        customName,
        displayPath,
        isAvailable: true,
        isNative
      };
    } catch {
      return {
        mode: 'system_downloads',
        displayPath: 'System Downloads',
        isAvailable: true,
        isNative
      };
    }
  }

  /**
   * Launch native Android SAF folder picker (or Web File System Access API if supported)
   */
  public static async pickCustomFolder(): Promise<{ success: boolean; name?: string; canceled?: boolean; error?: string }> {
    const isNative = this.isNativeAndroid();

    if (isNative && (window as any).Capacitor?.Plugins?.NativeSettings?.selectDownloadFolder) {
      try {
        const res = await (window as any).Capacitor.Plugins.NativeSettings.selectDownloadFolder();
        if (res.canceled) {
          return { success: false, canceled: true };
        }
        if (res.name) {
          localStorage.setItem(STORAGE_KEY_MODE, 'custom');
          localStorage.setItem(STORAGE_KEY_CUSTOM_NAME, res.name);
          if (res.uri) localStorage.setItem(STORAGE_KEY_CUSTOM_URI, res.uri);
          return { success: true, name: res.name };
        }
      } catch (err: any) {
        logger.error('[DownloadManagerService] Native SAF picker failed:', err);
        return { success: false, error: err.message || 'Folder picker failed' };
      }
    }

    // Modern Web Directory Picker fallback (Chromium/Edge)
    if (typeof window !== 'undefined' && 'showDirectoryPicker' in window) {
      try {
        const dirHandle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
        if (dirHandle && dirHandle.name) {
          const folderName = `Folder: ${dirHandle.name}`;
          localStorage.setItem(STORAGE_KEY_MODE, 'custom');
          localStorage.setItem(STORAGE_KEY_CUSTOM_NAME, folderName);
          return { success: true, name: folderName };
        }
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return { success: false, canceled: true };
        }
        return { success: false, error: 'Web folder selection requires user confirmation' };
      }
    }

    return {
      success: false,
      error: isNative 
        ? 'Native SAF folder selection is initializing. Please try again.' 
        : 'Custom folder selection via SAF is exclusive to Android APK. Web uses default browser download location.'
    };
  }

  /**
   * Set download mode (system_downloads | temp | custom)
   */
  public static async setMode(mode: DownloadMode): Promise<boolean> {
    try {
      localStorage.setItem(STORAGE_KEY_MODE, mode);
      if (this.isNativeAndroid() && (window as any).Capacitor?.Plugins?.NativeSettings?.setDownloadMode) {
        await (window as any).Capacitor.Plugins.NativeSettings.setDownloadMode({ mode });
      }
      return true;
    } catch (e) {
      logger.warn('[DownloadManagerService] Failed to set download mode:', e);
      return false;
    }
  }

  /**
   * Reset to default safe Downloads folder
   */
  public static async resetToDefault(): Promise<boolean> {
    try {
      localStorage.setItem(STORAGE_KEY_MODE, 'system_downloads');
      localStorage.removeItem(STORAGE_KEY_CUSTOM_NAME);
      localStorage.removeItem(STORAGE_KEY_CUSTOM_URI);
      if (this.isNativeAndroid() && (window as any).Capacitor?.Plugins?.NativeSettings?.resetDownloadPath) {
        await (window as any).Capacitor.Plugins.NativeSettings.resetDownloadPath();
      }
      return true;
    } catch (e) {
      logger.warn('[DownloadManagerService] Failed to reset download path:', e);
      return false;
    }
  }

  /**
   * Deduplicate filename safely: `document.pdf` -> `document (1).pdf`
   */
  public static resolveUniqueFilename(existingFilenames: string[], requestedName: string): string {
    if (!existingFilenames.includes(requestedName)) {
      return requestedName;
    }

    const dotIndex = requestedName.lastIndexOf('.');
    const base = dotIndex !== -1 ? requestedName.substring(0, dotIndex) : requestedName;
    const ext = dotIndex !== -1 ? requestedName.substring(dotIndex) : '';

    let counter = 1;
    let candidate = `${base} (${counter})${ext}`;
    while (existingFilenames.includes(candidate)) {
      counter++;
      candidate = `${base} (${counter})${ext}`;
    }
    return candidate;
  }
}
