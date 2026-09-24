/**
 * Strict Email & Gmail Validator for Aeirmist
 * Ensures accounts cannot be created with fake, malformed, or invalid emails.
 */

const DISPOSABLE_OR_FAKE_DOMAINS = new Set([
  'test.com',
  'example.com',
  'fake.com',
  'asdf.com',
  'tempmail.com',
  'mailinator.com',
  'trashmail.com',
  '10minutemail.com',
  'dispostable.com',
  'guerrillamail.com',
  'sharklasers.com',
  'yopmail.com',
  'getairmail.com',
  'throwawaymail.com',
  'fakemailgenerator.com',
  'aeirmist.social' // Prevent self-referential fake domains during public signup
]);

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  normalizedEmail?: string;
}

export function validateEmailDetailed(email: string): EmailValidationResult {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email address is required.' };
  }

  const trimmed = email.trim();
  if (trimmed.length < 5) {
    return { isValid: false, error: 'Email address is too short.' };
  }
  if (trimmed.length > 254) {
    return { isValid: false, error: 'Email address exceeds maximum length.' };
  }

  // Must contain exactly one '@'
  const atCount = (trimmed.match(/@/g) || []).length;
  if (atCount !== 1) {
    return { isValid: false, error: 'Please enter a valid email address containing a single "@".' };
  }

  const [localPart, domainPart] = trimmed.split('@');
  if (!localPart || !domainPart) {
    return { isValid: false, error: 'Invalid email address structure.' };
  }

  // Local part checks
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return { isValid: false, error: 'Email username cannot start or end with a period.' };
  }
  if (localPart.includes('..')) {
    return { isValid: false, error: 'Email cannot contain consecutive periods.' };
  }

  // Domain checks
  if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
    return { isValid: false, error: 'Email domain is invalid.' };
  }
  if (domainPart.includes('..')) {
    return { isValid: false, error: 'Domain cannot contain consecutive periods.' };
  }

  const domainParts = domainPart.split('.');
  if (domainParts.length < 2) {
    return { isValid: false, error: 'Domain must contain a valid extension (e.g. .com, .net).' };
  }

  const tld = domainParts[domainParts.length - 1].toLowerCase();
  if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return { isValid: false, error: 'Please provide a valid top-level domain (e.g. .com, .org).' };
  }

  const lowerDomain = domainPart.toLowerCase();

  // Check against fake / disposable domains
  if (DISPOSABLE_OR_FAKE_DOMAINS.has(lowerDomain)) {
    return { isValid: false, error: 'Disposable or placeholder email domains are not permitted.' };
  }

  // RFC 5322 regex check
  const rfc5322Regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!rfc5322Regex.test(trimmed)) {
    return { isValid: false, error: 'Email contains unsupported or invalid characters.' };
  }

  // Special Gmail validation rules
  if (lowerDomain === 'gmail.com' || lowerDomain === 'googlemail.com') {
    // Gmail local part: only letters, numbers, and periods (and optional +tag)
    const baseLocal = localPart.split('+')[0];
    const cleanLocal = baseLocal.replace(/\./g, '');

    if (cleanLocal.length < 6) {
      return { isValid: false, error: 'Gmail username must be at least 6 characters.' };
    }
    if (cleanLocal.length > 30) {
      return { isValid: false, error: 'Gmail username cannot exceed 30 characters.' };
    }
    if (!/^[a-zA-Z0-9.]+$/.test(baseLocal)) {
      return { isValid: false, error: 'Gmail username can only contain letters, numbers, and periods.' };
    }
  }

  return {
    isValid: true,
    normalizedEmail: trimmed.toLowerCase()
  };
}

export function isValidEmail(email: string): boolean {
  return validateEmailDetailed(email).isValid;
}
