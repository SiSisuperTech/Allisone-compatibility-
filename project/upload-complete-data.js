// Script to upload complete data to GitHub
import { pmsSoftware, xraySoftware, pmsAllisoneMatrix, xrayAllisoneMatrix } from './src/data/allisoneCompatibility.js';
import { submitDataUpdate } from './src/services/githubStorage.js';

async function uploadCompleteDataSet() {
  console.log('📊 Current Data Summary:');
  console.log(`   PMS Software: ${pmsSoftware.length} systems`);
  console.log(`   X-ray Software: ${xraySoftware.length} systems`);
  console.log(`   PMS Matrix: ${Object.keys(pmsAllisoneMatrix).length} entries`);
  console.log(`   X-ray Matrix: ${Object.keys(xrayAllisoneMatrix).length} entries`);
  console.log();

  try {
    console.log('🚀 Uploading PMS software data...');
    const pmsWithTypes = pmsSoftware.map(s => ({ 
      ...s, 
      type: 'pms', 
      status: pmsAllisoneMatrix[s.id]?.status || 'Not Started' 
    }));

    const pmsResult = await submitDataUpdate(
      'pms-software',
      pmsWithTypes,
      `Complete PMS software data upload - ${pmsSoftware.length} systems (including Dentally)`
    );
    console.log('✅ PMS upload result:', pmsResult.message);

    console.log('🚀 Uploading X-ray software data...');
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
    console.log('✅ X-ray upload result:', xrayResult.message);

    console.log('🚀 Uploading PMS compatibility matrix...');
    const pmsMatrixResult = await submitDataUpdate(
      'pms-matrix',
      pmsAllisoneMatrix,
      `Complete PMS compatibility matrix upload - ${Object.keys(pmsAllisoneMatrix).length} entries`
    );
    console.log('✅ PMS matrix upload result:', pmsMatrixResult.message);

    console.log('🚀 Uploading X-ray compatibility matrix...');
    const xrayMatrixResult = await submitDataUpdate(
      'xray-matrix',
      xrayAllisoneMatrix,
      `Complete X-ray compatibility matrix upload - ${Object.keys(xrayAllisoneMatrix).length} entries`
    );
    console.log('✅ X-ray matrix upload result:', xrayMatrixResult.message);

    console.log();
    console.log('🎉 Upload process completed!');
    console.log('📋 Next steps:');
    console.log('   1. Check the GitHub repository for new issues');
    console.log('   2. Process the issues to update the JSON files');
    console.log('   3. Once processed, dev/prod environments will show all systems');
    
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
}

uploadCompleteDataSet();
