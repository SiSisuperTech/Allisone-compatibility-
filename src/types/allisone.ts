// Types pour la compatibilité Allisone+

export type PMSCompatibilityStatus = 'In Prod' | 'In Test' | 'Planned' | 'Not Started' | 'On Dev' | 'Gateway Testing';
export type XrayCompatibilityStatus = 'Done' | 'Planned' | 'Not Started' | 'On Dev';

export interface PMSAllisoneCompatibility {
  compatible: boolean;
  allisoneMode: string[]; // Gateway, V1 without Image, V1 + Image, etc.
  status: PMSCompatibilityStatus;
  notes?: string;
  limitations?: string[];
  supportedVersions?: string;
}

export interface XrayAllisoneCompatibility {
  compatible: boolean;
  allisoneMode: string[]; // A+ v2 Server Mode, A+ v2 Bridge Mode, Full Watcher, etc.
  status: XrayCompatibilityStatus;
  notes?: string;
  supportedVersions?: string;
}

// Matrices de compatibilité avec Allisone+
export type PMSAllisoneMatrix = Record<string, PMSAllisoneCompatibility>;
export type XrayAllisoneMatrix = Record<string, XrayAllisoneCompatibility>;

// Résultat de compatibilité entre PMS + X-ray via Allisone+
export interface AllisoneCompatibilityResult {
  compatible: boolean;
  commonModes: string[]; // Modes Allisone+ communs entre PMS et X-ray
  pmsCompatibility: PMSAllisoneCompatibility;
  xrayCompatibility: XrayAllisoneCompatibility;
  recommendations?: string[];
  mode?: string; // Most advanced integration mode
}
