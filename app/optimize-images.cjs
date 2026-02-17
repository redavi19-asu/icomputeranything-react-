const imagemin = require('imagemin');
const webp = require('imagemin-webp');
const path = require('path');

const inputDir = path.join(__dirname, 'public/legacy/images');
const outputDir = path.join(__dirname, 'public/legacy/images/optimized');

(async () => {
  await imagemin([
    `${inputDir}/*.{jpg,jpeg,png}`
  ], {
    destination: outputDir,
    plugins: [
      webp({ quality: 75 })
    ]
  });
  console.log('WebP images created in', outputDir);
})();
