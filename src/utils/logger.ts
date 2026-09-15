const isProd = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production' 
  || (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.PROD);

const SENSITIVE_KEYS = [
  'password', 'token', 'secret', 'credential', 
  'session', 'card', 'key', 'private', 'message',
  'billing', 'stripe', 'auth', '2fa'
];

const sanitize = (data: any): any => {
  if (data === undefined || data === null) return data;
  if (typeof data !== 'object') return data;
  if (Array.isArray(data)) return data.map(sanitize);
  if (data instanceof Error) {
    return {
      message: data.message,
      name: data.name,
      code: (data as any).code || 'UNKNOWN_ERROR',
      // Explicitly omit stack trace in prod for security, keep in dev
      stack: isProd ? undefined : data.stack
    };
  }

  const sanitized: any = {};
  for (const [key, value] of Object.entries(data)) {
    const keyLower = key.toLowerCase();
    
    if (SENSITIVE_KEYS.some(sk => keyLower.includes(sk))) {
      sanitized[key] = '[REDACTED]';
    } else if (keyLower === 'user' || keyLower === 'profile' || keyLower === 'account') {
      sanitized[key] = value && typeof value === 'object' 
        ? { id: (value as any).uid || (value as any).id, role: (value as any).role }
        : value;
    } else {
      sanitized[key] = sanitize(value);
    }
  }
  return sanitized;
};

export const logger = {
  debug: (message: any, ...args: any[]) => {
    if (!isProd) {
      console.debug(`[DEBUG] ${typeof message === 'string' ? message : ''}`, ...[typeof message === 'string' ? undefined : message, ...args].filter(Boolean).map(sanitize));
    }
  },
  info: (message: any, ...args: any[]) => {
    if (!isProd) {
      console.info(`[INFO] ${typeof message === 'string' ? message : ''}`, ...[typeof message === 'string' ? undefined : message, ...args].filter(Boolean).map(sanitize));
    }
  },
  warn: (message: any, ...args: any[]) => {
    console.warn(`[WARN] ${typeof message === 'string' ? message : ''}`, ...[typeof message === 'string' ? undefined : message, ...args].filter(Boolean).map(sanitize));
  },
  error: (message: any, ...args: any[]) => {
    console.error(`[ERROR] ${typeof message === 'string' ? message : ''}`, ...[typeof message === 'string' ? undefined : message, ...args].filter(Boolean).map(sanitize));
  },
  security: (message: any, ...args: any[]) => {
    console.info(`[SECURITY] ${typeof message === 'string' ? message : ''}`, ...[typeof message === 'string' ? undefined : message, ...args].filter(Boolean).map(sanitize));
  }
};
