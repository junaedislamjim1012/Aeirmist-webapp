import { Timestamp } from 'firebase/firestore';

export const extractTimestampMs = (val: any): number => {
  if (!val) return 0;
  if (typeof val === 'number' && !isNaN(val) && val > 0) {
    if (val < 10000000000) return val * 1000;
    return val;
  }
  if (val instanceof Date && !isNaN(val.getTime())) {
    return val.getTime();
  }
  if (val instanceof Timestamp) {
    try {
      return val.toMillis();
    } catch (e) {}
  }
  if (typeof val?.toMillis === 'function') {
    try {
      const ms = val.toMillis();
      if (typeof ms === 'number' && !isNaN(ms) && ms > 0) return ms;
    } catch (e) {}
  }
  if (typeof val?.toDate === 'function') {
    try {
      const d = val.toDate();
      if (d instanceof Date && !isNaN(d.getTime())) return d.getTime();
    } catch (e) {}
  }
  if (typeof val?.seconds === 'number' && !isNaN(val.seconds)) {
    const ms = val.seconds * 1000 + (val.nanoseconds ? Math.floor(val.nanoseconds / 1000000) : 0);
    if (ms > 0) return ms;
  }
  if (typeof val?._seconds === 'number' && !isNaN(val._seconds)) {
    const ms = val._seconds * 1000 + (val._nanoseconds ? Math.floor(val._nanoseconds / 1000000) : 0);
    if (ms > 0) return ms;
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed) {
      const parsed = Date.parse(trimmed);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  }
  return 0;
};

export const toDateSafe = (timestamp: any): Date | null => {
  if (!timestamp) return null;
  const ms = extractTimestampMs(timestamp);
  if (ms > 0) return new Date(ms);
  return null;
};

/**
 * Intelligent relative timestamp formatter for Aeirmist
 * - Within 24h: 2m ago, 3h ago, etc.
 * - Same year: 12 Jun at 6:45 PM
 * - Different year: 12 Jun 2024 at 6:45 PM
 */
export const formatAeirmistTimestamp = (timestamp: any): string => {
  if (!timestamp) return 'Just now';
  
  const date = toDateSafe(timestamp);
  if (!date) return 'Just now';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  
  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  }
  
  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  }

  const isSameYear = date.getFullYear() === now.getFullYear();
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const time = date.toLocaleString('default', { hour: 'numeric', minute: '2-digit', hour12: true });

  // Check if yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${time}`;
  }

  if (isSameYear) {
    return `${day} ${month} at ${time}`;
  }

  return `${day} ${month} ${year} at ${time}`;
};

/**
 * Short relative timestamp for messages/comments/seen status
 * e.g. "2m", "3h", "1d"
 */
export const formatShortTimestamp = (timestamp: any): string => {
  if (!timestamp) return 'now';
  
  const date = toDateSafe(timestamp);
  if (!date) return 'now';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

/**
 * Formats a timestamp for use as a date separator in chat
 * e.g. "Today", "Yesterday", "June 12"
 */
export const formatDateSeparator = (timestamp: any): string => {
  if (!timestamp) return '';
  
  const date = toDateSafe(timestamp);
  if (!date) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (messageDate.getTime() === today.getTime()) return 'Today';
  if (messageDate.getTime() === yesterday.getTime()) return 'Yesterday';

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = 'numeric';
  }
  return date.toLocaleDateString('en-US', options);
};

/**
 * Formats a timestamp to show only the time (e.g. "9:50 PM")
 */
export const formatTimeOnly = (timestamp: any): string => {
  if (!timestamp) return '';
  if (typeof timestamp === 'string') {
    const trimmed = timestamp.trim();
    if (/^\d{1,2}:\d{2}(\s*(AM|PM|am|pm))?$/.test(trimmed)) {
      return trimmed;
    }
  }
  
  const date = toDateSafe(timestamp);
  if (!date) return typeof timestamp === 'string' ? timestamp : '';

  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

/**
 * Formatter for active status (e.g. "Active now", "Active 2m ago")
 */
export const formatActiveStatus = (isOnline: boolean, lastSeen: any, hideExactTime: boolean = false): string => {
  if (isOnline && !hideExactTime) return 'Active now';
  if (hideExactTime) return 'Last seen recently';
  if (!lastSeen) return 'Offline';
  
  const formattedTime = formatAeirmistTimestamp(lastSeen);
  if (formattedTime === 'Just now' || formattedTime.includes('ago')) {
    return `Active ${formattedTime}`;
  }
  return `Last seen ${formattedTime}`;
};

/**
 * Meta (Instagram / Messenger / WhatsApp) styled inbox timestamp formatter
 * e.g. "now", "2m", "5h", "Yesterday", "Wed", "16 Sep"
 */
export const formatMetaInboxTimestamp = (timestamp: any): string => {
  if (!timestamp) return '';
  const date = toDateSafe(timestamp);
  if (!date) return '';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400 && date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  const diffInDays = Math.floor(diffInSeconds / 86400);
  if (diffInDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  }

  if (date.getFullYear() === now.getFullYear()) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }

  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: '2-digit' });
};
