export const BLANK_DP = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%230c0f17" /><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="%23a1a1aa" opacity="0.35"/></svg>`;

export function getAvatarUrl(photoURL?: string | null, seed?: string): string {
  if (!photoURL || typeof photoURL !== 'string') {
    return BLANK_DP;
  }
  
  const trimmed = photoURL.trim();
  if (
    !trimmed || 
    trimmed === 'null' || 
    trimmed === 'undefined' ||
    trimmed.includes('dicebear') || 
    trimmed.includes('unsplash.com') ||
    trimmed.includes('picsum.photos') ||
    trimmed.includes('multavatar') ||
    trimmed.includes('ui-avatars.com') ||
    trimmed.includes('gravatar.com') ||
    trimmed.includes('default_avatar') ||
    trimmed.includes('placeholder')
  ) {
    return BLANK_DP;
  }
  
  return trimmed;
}


