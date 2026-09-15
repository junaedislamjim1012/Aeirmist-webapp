const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Aeirmist branding SVG symbol
const createSvg = (size, paddingPercent = 0.1) => {
  const contentSize = size * (1 - paddingPercent * 2);
  const offset = size * paddingPercent;
  const scale = contentSize / 100;

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${paddingPercent === 0 ? 0 : Math.round(size * 0.22)}" fill="#030712"/>
    <defs>
      <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00F2FF" />
        <stop offset="50%" stop-color="#00BFFF" />
        <stop offset="100%" stop-color="#7000FF" />
      </linearGradient>
      <linearGradient id="inner-grad" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#00F2FF" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    <g transform="translate(${offset}, ${offset}) scale(${scale})">
      <!-- Outer Hexagon / Diamond -->
      <path d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z" fill="none" stroke="url(#cyber-grad)" stroke-width="4.5" stroke-linejoin="round" filter="url(#glow)" />
      
      <!-- Inner abstract 'A' -->
      <path d="M 50 25 L 70 75 M 50 25 L 30 75" fill="none" stroke="url(#inner-grad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)" />
      <path d="M 38 60 L 62 60" fill="none" stroke="url(#inner-grad)" stroke-width="5" stroke-linecap="round" filter="url(#glow)" />
      
      <!-- Core Pulsing Node -->
      <circle cx="50" cy="42" r="4.5" fill="#FFFFFF" filter="url(#glow)" />
    </g>
  </svg>`;
};

async function generateIcons() {
  const publicDir = path.resolve(__dirname, '../public');

  console.log('Generating PWA icons with sharp...');

  // 1. icon-192.png (192x192, standard icon)
  const svg192 = createSvg(192, 0.12);
  await sharp(Buffer.from(svg192)).png().toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ Created icon-192.png');

  // 2. icon-512.png (512x512, standard icon)
  const svg512 = createSvg(512, 0.12);
  await sharp(Buffer.from(svg512)).png().toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✓ Created icon-512.png');

  // 3. icon-maskable-512.png (512x512, maskable icon with 20% safe zone padding)
  const svgMaskable = createSvg(512, 0.20);
  await sharp(Buffer.from(svgMaskable)).png().toFile(path.join(publicDir, 'icon-maskable-512.png'));
  console.log('✓ Created icon-maskable-512.png');

  // 4. apple-touch-icon.png (180x180, iOS square without rounding, iOS rounds it automatically)
  const svgApple = createSvg(180, 0.12);
  await sharp(Buffer.from(svgApple)).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png');

  // 5. favicon.png (64x64)
  const svgFavicon = createSvg(64, 0.08);
  await sharp(Buffer.from(svgFavicon)).png().toFile(path.join(publicDir, 'favicon.png'));
  console.log('✓ Created favicon.png');

  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});
