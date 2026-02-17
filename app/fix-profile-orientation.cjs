const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public/legacy/images/profile.jpeg');
const outputPath = path.join(__dirname, 'public/legacy/images/profile-fixed.jpeg');

sharp(inputPath)
  .rotate()
  .toFile(outputPath)
  .then(() => console.log('Profile image auto-rotated and saved as profile-fixed.jpeg'))
  .catch(err => console.error('Error rotating profile image:', err));
