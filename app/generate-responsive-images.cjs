const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  {
    input: path.join(__dirname, 'public/legacy/images/profile.jpeg'),
    output: path.join(__dirname, 'public/legacy/images/responsive/profile-120x155.webp'),
    width: 120,
    height: 155
  },
  {
    input: path.join(__dirname, 'public/legacy/images/logo.png'),
    output: path.join(__dirname, 'public/legacy/images/responsive/logo-320x320.webp'),
    width: 320,
    height: 320
  }
];

if (!fs.existsSync(path.join(__dirname, 'public/legacy/images/responsive'))){
  fs.mkdirSync(path.join(__dirname, 'public/legacy/images/responsive'), { recursive: true });
}

Promise.all(images.map(img =>
  sharp(img.input)
    .resize(img.width, img.height)
    .webp({ quality: 80 })
    .toFile(img.output)
    .then(() => console.log(`Created ${img.output}`))
    .catch(err => console.error(`Error processing ${img.input}:`, err))
)).then(() => console.log('Responsive images generated.'));
