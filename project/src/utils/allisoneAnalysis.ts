import {
  PMSAllisoneMatrix,
  XrayAllisoneMatrix,
  AllisoneCompatibilityResult
} from '../types/allisone';

// Redefined priority for clarity and correctness
const modePriority: Record<string, number> = {
  'A+ v2 - Gateway': 4,
  'A+ v2 - Server Mode': 3,
  'A+ v2 - Bridge Mode': 2,
  'V1 + Image': 1,
  'Legacy': 0
};

// Filter modes to show only the most advanced integration
const filterToMostAdvancedModes = (modes: string[]): string[] => {
  if (!modes || modes.length === 0) return [];

  let maxPriority = -1;
  modes.forEach(mode => {
    const priority = modePriority[mode] ?? -1;
    if (priority > maxPriority) {
      maxPriority = priority;
    }
  });

  if (maxPriority === -1) return [];

  return modes.filter(mode => (modePriority[mode] ?? -1) === maxPriority);
};

// New analysis function: All X-rays are compatible if the PMS is.
export const analyzeAllisoneCompatibility = (
  pmsId: string,
  xrayId: string,
  pmsMatrix: PMSAllisoneMatrix,
  xrayMatrix: XrayAllisoneMatrix
): AllisoneCompatibilityResult => {
  // Handle cases where matrix data might be missing
  const pmsCompatibility = pmsMatrix[pmsId] || { compatible: false, allisoneMode: [], status: 'Not Started' };
  const xrayCompatibility = xrayMatrix[xrayId] || { compatible: false, allisoneMode: [], status: 'Not Started' };

  // Force compatibility to be a boolean
  const pmsIsCompatible = pmsCompatibility.compatible === true;
  const xrayIsCompatible = xrayCompatibility.compatible === true;

  // Default result with most data
  const initialResult: AllisoneCompatibilityResult = {
    compatible: false,
    commonModes: [],
    pmsCompatibility: {
      ...pmsCompatibility,
      compatible: pmsIsCompatible,
      allisoneMode: pmsCompatibility.allisoneMode || []
    },
    xrayCompatibility: {
      ...xrayCompatibility,
      compatible: xrayIsCompatible,
      allisoneMode: xrayCompatibility.allisoneMode || []
    },
    recommendations: []
  };
  
  // Case 1: Missing PMS or X-ray IDs
  if (!pmsId || !xrayId) {
    return initialResult;
  }
  
  // Case 2: Check if both PMS and X-ray are compatible with Allisone+
  // For PMS: Check if explicitly marked as compatible or has non-empty status or modes
  const hasPmsStatus = pmsCompatibility.status && pmsCompatibility.status !== 'Not Started';
  const hasPmsModes = pmsCompatibility.allisoneMode && pmsCompatibility.allisoneMode.length > 0;
  const effectivePmsCompatible = pmsIsCompatible || hasPmsStatus || hasPmsModes;
  
  // For X-ray: Check if explicitly marked as compatible or has non-empty status or modes
  const hasXrayStatus = xrayCompatibility.status && xrayCompatibility.status !== 'Not Started';
  const hasXrayModes = xrayCompatibility.allisoneMode && xrayCompatibility.allisoneMode.length > 0;
  const effectiveXrayCompatible = xrayIsCompatible || hasXrayStatus || hasXrayModes;
  
  // Both need to be compatible
  if (!effectivePmsCompatible || !effectiveXrayCompatible) {
    return {
      ...initialResult,
      compatible: false,
      recommendations: ['Cette combinaison n\'est pas compatible avec Allisone+.']
    };
  }
    // Case 3: Both are compatible, get the most advanced integration modes
  const pmsAdvancedModes = filterToMostAdvancedModes(pmsCompatibility.allisoneMode || []);
  
  return {
    compatible: true,
    commonModes: pmsAdvancedModes,
    pmsCompatibility: {
      ...initialResult.pmsCompatibility,
      compatible: true,
      status: pmsCompatibility.status || 'In Prod'
    },
    xrayCompatibility: {
      ...initialResult.xrayCompatibility,
      compatible: true,
      status: xrayCompatibility.status || 'Done'
    },
    recommendations: [
      'Cette combinaison est compatible.',
      `Mode de connexion: ${pmsAdvancedModes.join(' / ')}.`
    ]
  };
};
