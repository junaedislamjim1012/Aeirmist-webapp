export const applyDynamicFavicon = (logoUrl?: string) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const versionParam = `?v=${Date.now()}`;
  let iconHref = `/custom_uploaded_logo.png${versionParam}`;

  if (logoUrl && (logoUrl.startsWith('http://') || logoUrl.startsWith('https://'))) {
    iconHref = logoUrl;
  }

  // 1. Update primary PNG icon
  let faviconPng = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/png"]');
  if (faviconPng) {
    faviconPng.href = iconHref;
  } else {
    faviconPng = document.createElement('link');
    faviconPng.rel = 'icon';
    faviconPng.type = 'image/png';
    faviconPng.href = iconHref;
    document.head.appendChild(faviconPng);
  }

  // 2. Update shortcut icon
  let shortcutIcon = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]');
  if (shortcutIcon) {
    shortcutIcon.href = iconHref;
  }

  // 3. Update Apple Touch Icon
  let appleIcon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
  if (appleIcon) {
    appleIcon.href = `/apple-touch-icon.png${versionParam}`;
  } else {
    appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = `/apple-touch-icon.png${versionParam}`;
    document.head.appendChild(appleIcon);
  }

  // Remove any legacy SVG favicon link if present to prevent Chrome fallback issues
  let svgFavicon = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]');
  if (svgFavicon) {
    svgFavicon.remove();
  }
};
