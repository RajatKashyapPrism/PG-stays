import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDir = path.join(__dirname, 'public/images');

async function resizeAllImages() {
  try {
    const files = fs.readdirSync(imageDir).filter(file => file.endsWith('.webp'));
    console.log(`Found ${files.length} WebP images to resize...\n`);

    for (const file of files) {
      const filePath = path.join(imageDir, file);
      console.log(`[${file}] Processing...`);
      
      try {
        // Read file into memory first to avoid file locking issues
        const fileBuffer = fs.readFileSync(filePath);
        const metadata = await sharp(fileBuffer).metadata();
        console.log(`  Original: ${metadata.width}x${metadata.height}px`);
        
        // Resize: 1024 width, maintain aspect ratio
        const newHeight = Math.round((metadata.height * 1024) / metadata.width);
        
        // Process and save
        const resizedBuffer = await sharp(fileBuffer)
          .resize(1024, newHeight, {
            fit: 'fill',
            withoutEnlargement: true
          })
          .webp({ quality: 85 })
          .toBuffer();
        
        fs.writeFileSync(filePath, resizedBuffer);
        console.log(`  ✓ Resized to: 1024x${newHeight}px (${(resizedBuffer.length / 1024).toFixed(1)} KB)\n`);
      } catch (error) {
        console.error(`  ✗ Error: ${error.message}\n`);
      }
    }

    console.log('All resizing operations complete!');
  } catch (error) {
    console.error('Fatal error:', error.message);
  }
}

await resizeAllImages();
