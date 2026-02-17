const imagemin = require('imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const webp = require('imagemin-webp');
const path = require('path');

const inputDir = path.join(__dirname, 'public/legacy/images');
const outputDir = path.join(__dirname, 'public/legacy/images/optimized');

(async () => {
  // Optimize JPEG and PNG
  await imagemin([
    `${inputDir}/*.{jpg,jpeg,png}`
  ], {
    destination: outputDir,
    plugins: [
      mozjpeg({ quality: 75 }),
      pngquant({ quality: [0.6, 0.8] })
    ]
  });

  // Convert to WebP
  await imagemin([
    `${inputDir}/*.{jpg,jpeg,png}`
  ], {
    destination: outputDir,
    plugins: [
      webp({ quality: 75 })
    ]
  });

  console.log('Images optimized and WebP versions created in', outputDir);
})();
