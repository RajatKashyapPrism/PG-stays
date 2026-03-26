import sharp from 'sharp';

const testFile = 'c:\\Users\\Rajat-PC\\Desktop\\projects\\PG stays\\PG stays\\public\\images\\amenity-ac.webp';

try {
  console.log('Testing sharp with:', testFile);
  const metadata = await sharp(testFile).metadata();
  console.log('Metadata:', metadata);
} catch (error) {
  console.error('Error details:', error);
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
}
