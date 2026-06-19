// Generate the favicon / app-icon set from the KCTE logo. Run: node scripts/gen-favicons.mjs
import sharp from 'sharp';

const src = 'public/brand/kcte-logo-transparent.png';
const white = { r: 255, g: 255, b: 255, alpha: 1 };
const out = {
  'public/favicon-32.png': 32,
  'public/favicon-96.png': 96,
  'public/apple-touch-icon.png': 180,
  'public/icon-192.png': 192,
  'public/icon-512.png': 512,
  'public/favicon.ico': 32,
};

for (const [file, size] of Object.entries(out)) {
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: white })
    .flatten({ background: white })
    .png()
    .toFile(file);
}
console.log('favicons generated:', Object.keys(out).join(', '));
