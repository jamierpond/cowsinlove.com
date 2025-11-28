#!/usr/bin/env node

const sharp = require('sharp');

const imagePath = process.argv[2] || 'public/cows.jpg';

(async () => {
  try {
    const buffer = await sharp(imagePath)
      .resize(20, 20, { fit: 'inside' })
      .blur()
      .jpeg({ quality: 50 })
      .toBuffer();

    const base64 = buffer.toString('base64');
    console.log(`data:image/jpeg;base64,${base64}`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
