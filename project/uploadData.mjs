// Simple Node.js script to upload complete data set
import { uploadCompleteDataSet } from './src/utils/uploadCompleteData.js';

async function main() {
  console.log('Starting upload of complete data set...');
  try {
    await uploadCompleteDataSet();
    console.log('Upload completed successfully!');
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

main();
