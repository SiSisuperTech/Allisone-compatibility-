// Software types for the dental compatibility matrix
import { PMSCompatibilityStatus, XrayCompatibilityStatus } from './allisone';

export interface PMSSoftware {
  id: string;
  name: string;
  company: string;
  logo?: string;
}

export interface XraySoftware {
  id: string;
  name: string;
  company: string;
  logo?: string;
}

export type SoftwareStatus = PMSCompatibilityStatus | XrayCompatibilityStatus;

export interface CustomSoftware {
  id: string;
  name: string;
  company: string;
  type: 'pms' | 'xray';
  logo?: string;
  status?: SoftwareStatus;
}

export interface CompatibilityEntry {
  pmsId: string;
  xrayId: string;
  status: 'compatible' | 'partial' | 'incompatible';
  notes?: string;
}

export type CompatibilityMatrix = Record<string, Record<string, {
  status: 'compatible' | 'partial' | 'incompatible';
  notes?: string;
}>>;
