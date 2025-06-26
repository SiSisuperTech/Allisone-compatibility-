import axios from 'axios';
import { PMSAllisoneMatrix, XrayAllisoneMatrix } from '../types/allisone';
import { CustomSoftware } from '../types/software';

// Replace with your actual API URL when deployed
// For development: http://localhost:3001/api
// For production: https://your-api-domain.com/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// PMS Software endpoints
export const fetchPmsSoftware = async (): Promise<CustomSoftware[]> => {
  const response = await api.get('/pms');
  return response.data;
};

export const updatePmsSoftware = async (software: CustomSoftware): Promise<CustomSoftware> => {
  const response = await api.put(`/pms/${software.id}`, software);
  return response.data;
};

export const createPmsSoftware = async (software: Omit<CustomSoftware, 'id'>): Promise<CustomSoftware> => {
  const response = await api.post('/pms', software);
  return response.data;
};

export const deletePmsSoftware = async (id: string): Promise<void> => {
  await api.delete(`/pms/${id}`);
};

// X-ray Software endpoints
export const fetchXraySoftware = async (): Promise<CustomSoftware[]> => {
  const response = await api.get('/xray');
  return response.data;
};

export const updateXraySoftware = async (software: CustomSoftware): Promise<CustomSoftware> => {
  const response = await api.put(`/xray/${software.id}`, software);
  return response.data;
};

export const createXraySoftware = async (software: Omit<CustomSoftware, 'id'>): Promise<CustomSoftware> => {
  const response = await api.post('/xray', software);
  return response.data;
};

export const deleteXraySoftware = async (id: string): Promise<void> => {
  await api.delete(`/xray/${id}`);
};

// Compatibility matrix endpoints
export const fetchPmsMatrix = async (): Promise<PMSAllisoneMatrix> => {
  const response = await api.get('/compatibility/pms');
  return response.data;
};

export const updatePmsMatrix = async (matrix: PMSAllisoneMatrix): Promise<PMSAllisoneMatrix> => {
  const response = await api.put('/compatibility/pms', matrix);
  return response.data;
};

export const fetchXrayMatrix = async (): Promise<XrayAllisoneMatrix> => {
  const response = await api.get('/compatibility/xray');
  return response.data;
};

export const updateXrayMatrix = async (matrix: XrayAllisoneMatrix): Promise<XrayAllisoneMatrix> => {
  const response = await api.put('/compatibility/xray', matrix);
  return response.data;
};

// Individual compatibility entry endpoint
export const updateCompatibility = async (data: {
  pmsId: string;
  xrayId: string;
  pmsStatus: string;
  xrayStatus: string;
  pmsModes: string[];
  xrayModes: string[];
  pmsNotes?: string;
  xrayNotes?: string;
  pmsVersions?: string;
  xrayVersions?: string;
}): Promise<{
  pmsMatrix: PMSAllisoneMatrix;
  xrayMatrix: XrayAllisoneMatrix;
}> => {
  const response = await api.put('/compatibility', data);
  return response.data;
};

// Logo updates
export const fetchLogoUpdates = async (): Promise<Record<string, string>> => {
  const response = await api.get('/logos');
  return response.data;
};

export const updateLogo = async (id: string, logoUrl: string): Promise<void> => {
  await api.put(`/logos/${id}`, { logoUrl });
};

export default api;
