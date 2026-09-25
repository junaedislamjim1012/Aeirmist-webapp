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

  /**
   * Save/download media file directly to device gallery/downloads without opening a browser tab.
   * On Native Android APK: Saves to Pictures/Aeirmist via Android DownloadManager (auto-indexed to Gallery).
   * On Web Browser: Fetches blob and downloads locally with zero browser tab opening.
   */
  public static async downloadMediaFile(
    url: string, 
    customFilename?: string
  ): Promise<{ success: boolean; filename?: string; error?: string }> {
    if (!url) return { success: false, error: 'Empty media URL' };

    const isNative = this.isNativeAndroid();
    const resolvedName = customFilename || (() => {
      const isVideo = url.includes('.mp4') || (url.includes('video') && !url.includes('image'));
      const ext = isVideo ? '.mp4' : '.jpg';
      return `Aeirmist_${Date.now()}${ext}`;
    })();

    // 1. Native Android: Save directly to phone gallery
    if (isNative && (window as any).Capacitor?.Plugins?.NativeSettings?.saveMediaToDevice) {
      try {
        const res = await (window as any).Capacitor.Plugins.NativeSettings.saveMediaToDevice({
          url,
          filename: resolvedName
        });
        return { success: true, filename: resolvedName };
      } catch (nativeErr: any) {
        logger.warn('[DownloadManagerService] Native save failed, trying blob download:', nativeErr);
      }
    }

    // 2. Web fallback: In-memory blob anchor (no _blank, no new tab!)
    try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = resolvedName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      return { success: true, filename: resolvedName };
    } catch (err: any) {
      logger.warn('[DownloadManagerService] Blob download failed, trying direct link download:', err);
      try {
        const directLink = document.createElement('a');
        directLink.href = url;
        directLink.download = resolvedName;
        directLink.style.display = 'none';
        document.body.appendChild(directLink);
        directLink.click();
        document.body.removeChild(directLink);
        return { success: true, filename: resolvedName };
      } catch (directErr: any) {
        logger.error('[DownloadManagerService] All download strategies failed:', directErr);
        return { success: false, error: directErr?.message || 'Download failed' };
      }
    }
  }
}
