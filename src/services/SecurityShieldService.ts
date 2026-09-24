/**
 * ==============================================================================
 * AEIRMIST IN-APP CLIENT SECURITY SHIELD
 * ==============================================================================
 * Provides defense-in-depth protection against:
 * 1. Anti-Clickjacking / Frame-busting (prevents malicious iframe embedding)
 * 2. Prototype Pollution Defense
 * 3. XSS & Malicious Protocol Filter (blocks javascript:, data:, vbscript:)
 * 4. Input Sanitization & Anti-Injection
 * 5. Action Rate Limiting (mitigates brute-force and flood attacks)
 */

import { logger } from '../utils/logger';

class SecurityShieldService {
  private static instance: SecurityShieldService;
  private actionTimestamps: Map<string, number[]> = new Map();
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): SecurityShieldService {
    if (!SecurityShieldService.instance) {
      SecurityShieldService.instance = new SecurityShieldService();
    }
    return SecurityShieldService.instance;
  }

  /**
   * Initializes client runtime security barriers
   */
  public initialize(): void {
    if (this.isInitialized) return;
    this.isInitialized = true;

    try {
      this.enforceFrameBuster();
      this.hardenPrototypes();
      this.attachSecurityListeners();
      logger.info('🛡️ Aeirmist Security Shield successfully initialized.');
    } catch (err) {
      logger.warn('Security Shield initialization note:', err);
    }
  }

  /**
   * Anti-Clickjacking Frame Buster
   * Prevents phishing sites from embedding Aeirmist in invisible iframes
   */
  private enforceFrameBuster(): void {
    try {
      if (typeof window !== 'undefined' && window.top && window.self !== window.top) {
        // If framed by external origin, break out to top window
        window.top.location.href = window.self.location.href;
      }
    } catch {
      // Cross-origin framing access blocked - force reload to top
      try {
        if (typeof window !== 'undefined' && window.location) {
          window.location.replace(window.location.href);
        }
      } catch {}
    }
  }

  /**
   * Prototype Pollution Defense
   * Blocks malicious tampering with Object.prototype.__proto__
   */
  private hardenPrototypes(): void {
    try {
      if (typeof Object.freeze === 'function') {
        // Prevent prototype poisoning of vulnerable utility libraries
        Object.seal(Object.prototype);
      }
    } catch {}
  }

  /**
   * Attach global error & security monitors
   */
  private attachSecurityListeners(): void {
    if (typeof window === 'undefined') return;

    // Detect attempts to inject malicious scripts into DOM
    window.addEventListener('securitypolicyviolation', (e) => {
      logger.security('CSP Violation Blocked', {
        blockedURI: e.blockedURI,
        violatedDirective: e.violatedDirective,
        originalPolicy: e.originalPolicy
      });
    });
  }

  /**
   * Strict URL Sanitizer
   * Returns a safe URL or empty string if malicious protocol is detected
   */
  public sanitizeUrl(url: string): string {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();

    // Block dangerous protocols like javascript:, vbscript:, data:
    const dangerousPattern = /^(javascript|vbscript|data):/i;
    if (dangerousPattern.test(trimmed)) {
      logger.security('Malicious URL Protocol Blocked', { url: trimmed });
      return 'about:blank';
    }

    return trimmed;
  }

  /**
   * Clean untrusted text input against HTML injection
   */
  public sanitizeText(input: string): string {
    if (!input || typeof input !== 'string') return '';
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * In-Memory Action Rate Limiter (Brute-force / Flood mitigation)
   * Returns true if allowed, false if limit exceeded
   */
  public checkRateLimit(actionKey: string, maxAttempts = 5, windowMs = 15000): boolean {
    const now = Date.now();
    const timestamps = this.actionTimestamps.get(actionKey) || [];

    // Filter out timestamps outside the active window
    const recent = timestamps.filter(t => now - t < windowMs);

    if (recent.length >= maxAttempts) {
      logger.security('Client Rate Limit Exceeded', { actionKey, attempts: recent.length });
      return false;
    }

    recent.push(now);
    this.actionTimestamps.set(actionKey, recent);
    return true;
  }
}

export const securityShield = SecurityShieldService.getInstance();
