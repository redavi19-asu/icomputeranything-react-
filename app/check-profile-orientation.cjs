const { exiftool } = require('exiftool-vendored');
const path = require('path');

const imgPath = path.join(__dirname, 'public/legacy/images/profile.jpeg');

exiftool.read(imgPath)
  .then(tags => {
    console.log('Orientation:', tags.Orientation);
    console.log('All tags:', tags);
    return exiftool.end();
  })
  .catch(err => {
    console.error('Error reading EXIF:', err);
    exiftool.end();
  });
