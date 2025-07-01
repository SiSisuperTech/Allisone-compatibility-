// Script to properly extract and regenerate JSON files from allisoneCompatibility.ts

import fs from 'fs';

// Read the TypeScript file
const tsContent = fs.readFileSync('src/data/allisoneCompatibility.ts', 'utf8');

// Extract PMS software data properly
const pmsMatch = tsContent.match(/export const pmsSoftware: PMSSoftware\[\] = \[([\s\S]*?)\];/);
let pmsSoftwareData = [];

if (pmsMatch) {
  const pmsSection = pmsMatch[1];
  // Find all PMS entries using a more robust regex
  const pmsEntries = pmsSection.match(/\{\s*id:\s*'[^']+',[\s\S]*?\}/g);
  
  if (pmsEntries) {
    pmsEntries.forEach(entry => {
      const idMatch = entry.match(/id:\s*'([^']+)'/);
      const nameMatch = entry.match(/name:\s*'([^']+)'/);
      const companyMatch = entry.match(/company:\s*'([^']+)'/);
      const logoMatch = entry.match(/logo:\s*'([^']+)'/);
      
      if (idMatch && nameMatch && companyMatch && logoMatch) {
        pmsSoftwareData.push({
          id: idMatch[1],
          name: nameMatch[1],
          company: companyMatch[1],
          logo: logoMatch[1],
          type: 'pms',
          status: 'In Prod'
        });
      }
    });
  }
}

// Extract X-ray software data properly
const xrayMatch = tsContent.match(/export const xraySoftware: XraySoftware\[\] = \[([\s\S]*?)\];/);
let xraySoftwareData = [];

if (xrayMatch) {
  const xraySection = xrayMatch[1];
  const xrayEntries = xraySection.match(/\{\s*id:\s*'[^']+',[\s\S]*?\}/g);
  
  if (xrayEntries) {
    xrayEntries.forEach(entry => {
      const idMatch = entry.match(/id:\s*'([^']+)'/);
      const nameMatch = entry.match(/name:\s*'([^']+)'/);
      const companyMatch = entry.match(/company:\s*'([^']+)'/);
      const logoMatch = entry.match(/logo:\s*'([^']+)'/);
      
      if (idMatch && nameMatch && companyMatch && logoMatch) {
        xraySoftwareData.push({
          id: idMatch[1],
          name: nameMatch[1],
          company: companyMatch[1],
          logo: logoMatch[1],
          type: 'xray',
          status: 'Done'
        });
      }
    });
  }
}

// Extract PMS matrix data
const pmsMatrixMatch = tsContent.match(/export const pmsAllisoneMatrix: PMSAllisoneMatrix = \{([\s\S]*?)\};/);
let pmsMatrixData = {};

if (pmsMatrixMatch) {
  const matrixContent = pmsMatrixMatch[1];
  // This is a complex parse, so let's just indicate what we found
  console.log('Found PMS matrix section');
}

// Extract X-ray matrix data
const xrayMatrixMatch = tsContent.match(/export const xrayAllisoneMatrix: XrayAllisoneMatrix = \{([\s\S]*?)\};/);
let xrayMatrixData = {};

if (xrayMatrixMatch) {
  console.log('Found X-ray matrix section');
}

// Write corrected JSON files
fs.writeFileSync('data/pms-software.json', JSON.stringify(pmsSoftwareData, null, 2));
fs.writeFileSync('data/xray-software.json', JSON.stringify(xraySoftwareData, null, 2));

console.log(`Fixed data files:`);
console.log(`- PMS software: ${pmsSoftwareData.length} entries`);
console.log(`- X-ray software: ${xraySoftwareData.length} entries`);

// List the entries found
console.log('\nPMS Software found:');
pmsSoftwareData.forEach(pms => console.log(`  - ${pms.name} (${pms.company})`));

console.log('\nX-ray Software found:');
xraySoftwareData.forEach(xray => console.log(`  - ${xray.name} (${xray.company})`));
