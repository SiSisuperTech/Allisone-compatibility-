// Script to extract complete data from allisoneCompatibility.ts and generate updated JSON files

const fs = require('fs');
const path = require('path');

// Read the TypeScript file
const tsFile = fs.readFileSync('src/data/allisoneCompatibility.ts', 'utf8');

// Extract PMS software data
const pmsMatch = tsFile.match(/export const pmsSoftware: PMSSoftware\[\] = \[([\s\S]*?)\];/);
if (!pmsMatch) {
  console.error('Could not find PMS software data');
  process.exit(1);
}

// Parse PMS data - convert TypeScript object syntax to JSON
let pmsDataString = pmsMatch[1]
  .replace(/\/\/.*$/gm, '') // Remove comments
  .replace(/\s+/g, ' ')     // Normalize whitespace
  .trim();

// Split by entries (objects starting with { id:)
const pmsEntries = [];
const pmsMatches = pmsDataString.match(/\{\s*id:\s*'([^']+)'[^}]*\}/g);

if (pmsMatches) {
  pmsMatches.forEach(match => {
    const idMatch = match.match(/id:\s*'([^']+)'/);
    const nameMatch = match.match(/name:\s*'([^']+)'/);
    const companyMatch = match.match(/company:\s*'([^']+)'/);
    const logoMatch = match.match(/logo:\s*'([^']+)'/);
    
    if (idMatch && nameMatch && companyMatch && logoMatch) {
      pmsEntries.push({
        id: idMatch[1],
        name: nameMatch[1],
        company: companyMatch[1],
        logo: logoMatch[1],
        type: 'pms',
        status: 'In Prod' // Default status
      });
    }
  });
}

console.log(`Extracted ${pmsEntries.length} PMS entries`);

// Extract X-ray software data
const xrayMatch = tsFile.match(/export const xraySoftware: XraySoftware\[\] = \[([\s\S]*?)\];/);
if (!xrayMatch) {
  console.error('Could not find X-ray software data');
  process.exit(1);
}

let xrayDataString = xrayMatch[1]
  .replace(/\/\/.*$/gm, '') // Remove comments
  .replace(/\s+/g, ' ')     // Normalize whitespace
  .trim();

const xrayEntries = [];
const xrayMatches = xrayDataString.match(/\{\s*id:\s*'([^']+)'[^}]*\}/g);

if (xrayMatches) {
  xrayMatches.forEach(match => {
    const idMatch = match.match(/id:\s*'([^']+)'/);
    const nameMatch = match.match(/name:\s*'([^']+)'/);
    const companyMatch = match.match(/company:\s*'([^']+)'/);
    const logoMatch = match.match(/logo:\s*'([^']+)'/);
    
    if (idMatch && nameMatch && companyMatch && logoMatch) {
      xrayEntries.push({
        id: idMatch[1],
        name: nameMatch[1],
        company: companyMatch[1],
        logo: logoMatch[1],
        type: 'xray',
        status: 'In Prod' // Default status
      });
    }
  });
}

console.log(`Extracted ${xrayEntries.length} X-ray entries`);

// Write the data to JSON files
fs.writeFileSync('data/pms-software.json', JSON.stringify(pmsEntries, null, 2));
fs.writeFileSync('data/xray-software.json', JSON.stringify(xrayEntries, null, 2));

console.log('Data files updated successfully!');
console.log(`PMS entries: ${pmsEntries.length}`);
console.log(`X-ray entries: ${xrayEntries.length}`);
