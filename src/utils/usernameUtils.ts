/**
 * Normalizes username input according to strict authentication rules:
 * 1. Trim whitespace
 * 2. Convert to lowercase
 * 3. Remove leading "@"
 * 4. Remove trailing spaces
 * 
 * Example: "@Junaed_Islam_Jim9  " -> "junaed_islam_jim9"
 */
export function normalizeUsername(raw: string | null | undefined): string {
  if (!raw) return '';
  return String(raw)
    .trim()
    .replace(/^@+/, '')
    .trim()
    .toLowerCase();
}
