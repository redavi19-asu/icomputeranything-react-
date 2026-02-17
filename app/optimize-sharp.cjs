const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public/legacy/images');
const outputDir = path.join(__dirname, 'public/legacy/images/optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    const inputPath = path.join(inputDir, file);
    const outputWebP = path.join(outputDir, file.replace(ext, '.webp'));
    sharp(inputPath)
      .webp({ quality: 75 })
      .toFile(outputWebP)
      .then(() => console.log(`Converted ${file} to WebP`))
      .catch(err => console.error(`Error converting ${file}:`, err));
  }
});
