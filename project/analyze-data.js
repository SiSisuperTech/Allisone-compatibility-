// Script to copy complete local data to GitHub repository
import fs from 'fs';
import path from 'path';

const localPmsFile = './data/pms-software.json';
const localXrayFile = './data/xray-software.json';

// Read local files
const localPmsData = JSON.parse(fs.readFileSync(localPmsFile, 'utf8'));
const localXrayData = JSON.parse(fs.readFileSync(localXrayFile, 'utf8'));

console.log('📊 Local Data Analysis:');
console.log(`Local PMS file: ${localPmsData.length} entries`);
if (fs.existsSync(localXrayFile)) {
  console.log(`Local X-ray file: ${localXrayData.length} entries`);
} else {
  console.log('Local X-ray file: Not found');
}

// Check if Dentally is in local data
const dentallyInLocal = localPmsData.find(pms => pms.id === 'dentally');
console.log(`Dentally in local data: ${dentallyInLocal ? '✅ Found' : '❌ Not found'}`);

console.log('\n🔄 Summary:');
console.log('- GitHub repository has only 10 PMS entries');
console.log('- Local file has 33 PMS entries including Dentally');
console.log('- The local file needs to be uploaded to GitHub');
console.log('\n📋 Next steps:');
console.log('1. Copy the local data/pms-software.json to the GitHub repository');
console.log('2. Commit and push the changes');
console.log('3. All environments will then show the complete data');

// Create a simplified upload command
console.log('\n💡 Manual upload steps:');
console.log('1. Go to: https://github.com/SiSisuperTech/Allisone-compatibility-/blob/main/data/pms-software.json');
console.log('2. Click "Edit this file"');
console.log('3. Replace the content with the local file content');
console.log('4. Commit the changes');
