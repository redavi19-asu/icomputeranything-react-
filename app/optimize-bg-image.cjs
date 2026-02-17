const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, 'public/legacy/images/newback maybe.png');
const output = path.join(__dirname, 'public/legacy/images/newback-maybe-1200w.webp');

sharp(input)
  .resize(1200)
  .webp({ quality: 60 })
  .toFile(output)
  .then(() => console.log('Created smaller, optimized background image.'))
  .catch(err => console.error('Error:', err));
