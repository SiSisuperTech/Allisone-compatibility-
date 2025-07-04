// Script to upload complete data set to GitHub
const { uploadCompleteDataSet } = require('./src/utils/uploadCompleteData.ts');

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
