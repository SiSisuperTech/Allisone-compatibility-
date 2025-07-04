// Utility to upload complete data set to GitHub
import { pmsSoftware, xraySoftware, pmsAllisoneMatrix, xrayAllisoneMatrix } from '../data/allisoneCompatibility.js';
import { submitDataUpdate } from '../services/githubStorage.js';

export async function uploadCompleteDataSet() {
  try {
    console.log('Uploading complete PMS software data...');
    console.log(`PMS Software count: ${pmsSoftware.length}`);
    console.log(`X-ray Software count: ${xraySoftware.length}`);
    
    // Upload PMS software data
    const pmsWithTypes = pmsSoftware.map(s => ({ 
      ...s, 
      type: 'pms', 
      status: pmsAllisoneMatrix[s.id]?.status || 'Not Started' 
    }));
    
    const pmsResult = await submitDataUpdate(
      'pms-software',
      pmsWithTypes,
      `Complete PMS software data upload - ${pmsSoftware.length} systems`
    );
    console.log('PMS upload result:', pmsResult);

    // Upload X-ray software data
    const xrayWithTypes = xraySoftware.map(s => ({ 
      ...s, 
      type: 'xray', 
      status: xrayAllisoneMatrix[s.id]?.status || 'Not Started' 
    }));
    
    const xrayResult = await submitDataUpdate(
      'xray-software',
      xrayWithTypes,
      `Complete X-ray software data upload - ${xraySoftware.length} systems`
    );
    console.log('X-ray upload result:', xrayResult);

    // Upload compatibility matrices
    const pmsMatrixResult = await submitDataUpdate(
      'pms-matrix',
      pmsAllisoneMatrix,
      `Complete PMS compatibility matrix upload - ${Object.keys(pmsAllisoneMatrix).length} entries`
    );
    console.log('PMS matrix upload result:', pmsMatrixResult);

    const xrayMatrixResult = await submitDataUpdate(
      'xray-matrix',
      xrayAllisoneMatrix,
      `Complete X-ray compatibility matrix upload - ${Object.keys(xrayAllisoneMatrix).length} entries`
    );
    console.log('X-ray matrix upload result:', xrayMatrixResult);

    return {
      pms: pmsResult,
      xray: xrayResult,
      pmsMatrix: pmsMatrixResult,
      xrayMatrix: xrayMatrixResult
    };
  } catch (error) {
    console.error('Error uploading complete data set:', error);
    throw error;
  }
}

// Function to verify data count
export function verifyDataCount() {
  console.log('=== Data Count Verification ===');
  console.log(`PMS Software: ${pmsSoftware.length} systems`);
  console.log(`X-ray Software: ${xraySoftware.length} systems`);
  console.log(`PMS Matrix entries: ${Object.keys(pmsAllisoneMatrix).length}`);
  console.log(`X-ray Matrix entries: ${Object.keys(xrayAllisoneMatrix).length}`);
  
  // Check for missing entries
  const missingPmsMatrix = pmsSoftware.filter(pms => !pmsAllisoneMatrix[pms.id]);
  const missingXrayMatrix = xraySoftware.filter(xray => !xrayAllisoneMatrix[xray.id]);
  
  if (missingPmsMatrix.length > 0) {
    console.warn('Missing PMS matrix entries:', missingPmsMatrix.map(p => p.id));
  }
  
  if (missingXrayMatrix.length > 0) {
    console.warn('Missing X-ray matrix entries:', missingXrayMatrix.map(x => x.id));
  }
  
  return {
    pmsCount: pmsSoftware.length,
    xrayCount: xraySoftware.length,
    pmsMatrixCount: Object.keys(pmsAllisoneMatrix).length,
    xrayMatrixCount: Object.keys(xrayAllisoneMatrix).length,
    missingPmsMatrix,
    missingXrayMatrix
  };
}
