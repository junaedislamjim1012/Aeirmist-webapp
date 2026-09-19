/**
 * Cloudinary High-Speed Media Storage Service
 * Provides zero-cost, CDN-optimized image and video storage for Aeirmist Social Platform
 */
import { logger } from '../utils/logger';

export interface CloudinaryUploadOptions {
  cloudName?: string;
  uploadPreset?: string;
  folder?: string;
  onProgress?: (progress: number, status: string) => void;
}

export class CloudinaryService {
  private cloudName: string;
  private uploadPreset: string;

  constructor() {
    this.cloudName = (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME || 'aeirmist';
    this.uploadPreset = (import.meta as any).env?.VITE_CLOUDINARY_UPLOAD_PRESET || 'aeirmist_uploads';
  }

  public setConfig(cloudName: string, uploadPreset: string) {
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
    try {
      localStorage.setItem('aeirmist_cloudinary_cloud_name', cloudName);
      localStorage.setItem('aeirmist_cloudinary_upload_preset', uploadPreset);
    } catch (e) {}
  }

  public isConfigured(): boolean {
    const activeCloud = this.cloudName || (typeof localStorage !== 'undefined' ? localStorage.getItem('aeirmist_cloudinary_cloud_name') : null);
    const activePreset = this.uploadPreset || (typeof localStorage !== 'undefined' ? localStorage.getItem('aeirmist_cloudinary_upload_preset') : null);
    return !!(activeCloud && activePreset);
  }

  public getCloudName(): string {
    return this.cloudName || (typeof localStorage !== 'undefined' ? localStorage.getItem('aeirmist_cloudinary_cloud_name') || 'aeirmist' : 'aeirmist');
  }

  public getUploadPreset(): string {
    return this.uploadPreset || (typeof localStorage !== 'undefined' ? localStorage.getItem('aeirmist_cloudinary_upload_preset') || 'aeirmist_uploads' : 'aeirmist_uploads');
  }

  public async upload(file: File, options?: CloudinaryUploadOptions): Promise<string> {
    const cloudName = options?.cloudName || this.getCloudName();
    const uploadPreset = options?.uploadPreset || this.getUploadPreset();
    const folder = options?.folder || 'aeirmist';
    const onProgress = options?.onProgress;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration missing (cloudName or uploadPreset)');
    }

    const isVideo = file.type.startsWith('video/');
    const resourceType = isVideo ? 'video' : 'auto';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete, 'Uploading to Cloudinary CDN...');
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            if (response.secure_url) {
              logger.info(`[CloudinaryService] Media upload success: ${response.secure_url}`);
              resolve(response.secure_url);
            } else {
              reject(new Error(response.error?.message || 'Cloudinary upload succeeded but no URL returned'));
            }
          } catch (err) {
            reject(err);
          }
        } else {
          try {
            const errorResp = JSON.parse(xhr.responseText);
            reject(new Error(errorResp.error?.message || `Cloudinary upload error (${xhr.status})`));
          } catch {
            reject(new Error(`Cloudinary upload HTTP error: ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error during Cloudinary upload'));
      };

      xhr.send(formData);
    });
  }
}

export const cloudinaryService = new CloudinaryService();
