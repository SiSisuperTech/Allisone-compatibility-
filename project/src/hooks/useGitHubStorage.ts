import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getLatestData, saveCompatibility, savePmsSoftware, saveXraySoftware, deleteSoftware, saveLogo } from '../services/githubStorage';
import { PMSAllisoneMatrix, XrayAllisoneMatrix } from '../types/allisone';
import { CustomSoftware } from '../types/software';
import { pmsAllisoneMatrix, xrayAllisoneMatrix } from '../data/allisoneCompatibility';
import { toast } from 'react-toastify';

interface UseGitHubStorageOptions<T> {
  key: string;
  initialValue: T;
  type: 'pms-software' | 'xray-software' | 'pms-matrix' | 'xray-matrix' | 'logo-updates';
}

export function useGitHubStorage<T>({ key, initialValue, type }: UseGitHubStorageOptions<T>) {
  // Use local storage as the primary storage mechanism
  const [localValue, setLocalValue] = useLocalStorage<T>(key, initialValue);
  
  // Add state for tracking sync status
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  
  // Function to sync with GitHub
  const syncWithGitHub = async (forceUpdate = false) => {
    setSyncStatus('syncing');
    try {
      // Get latest data from GitHub
      const latestData = await getLatestData();
      
      if (latestData) {
        // Get the appropriate data based on type
        let remoteData: any = null;
        
        switch (type) {
          case 'pms-software':
            remoteData = latestData.pmsSoftware;
            break;
          case 'xray-software':
            remoteData = latestData.xraySoftware;
            break;
          case 'pms-matrix':
            remoteData = latestData.pmsMatrix;
            break;
          case 'xray-matrix':
            remoteData = latestData.xrayMatrix;
            break;
          case 'logo-updates':
            remoteData = latestData.logoUpdates;
            break;
        }
        
        // If we have remote data and it's different from local or we're forcing an update
        if (remoteData && (forceUpdate || JSON.stringify(remoteData) !== JSON.stringify(localValue))) {
          setLocalValue(remoteData as T);
          // Removed large toast notification - sync status is shown in UI
        }
      }
      
      setSyncStatus('synced');
      setLastSynced(new Date());
    } catch (error) {
      console.error('Failed to sync with GitHub:', error);
      setSyncStatus('error');
      // Only show error toasts for critical failures, not routine sync updates
      if (forceUpdate) {
        toast.error(`Failed to sync ${type} data with GitHub`);
      }
    }
  };
  
  // Sync with GitHub when the component mounts
  useEffect(() => {
    syncWithGitHub();
    
    // Set up interval to check for updates (every 5 minutes)
    const intervalId = setInterval(() => {
      syncWithGitHub();
    }, 5 * 60 * 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  // Function to save data to GitHub
  const saveToGitHub = async (value: T) => {
    setSyncStatus('syncing');
    try {
      // Update local storage first
      setLocalValue(value);
      
      // Submit the update to GitHub based on type
      switch (type) {
        case 'pms-software':
          await savePmsSoftware(value as unknown as CustomSoftware);
          break;
        case 'xray-software':
          await saveXraySoftware(value as unknown as CustomSoftware);
          break;
        case 'pms-matrix':
          // For the matrix, we'd need to handle this differently since it's the entire matrix
          // This is just a placeholder for the actual implementation
          await saveCompatibility({
            pmsId: 'matrix-update',
            xrayId: 'matrix-update',
            pmsStatus: 'In Prod',
            xrayStatus: 'Done',
            pmsModes: [],
            xrayModes: [],
            pmsNotes: 'Full matrix update'
          });
          break;
        case 'xray-matrix':
          // Similar placeholder for xray matrix updates
          await saveCompatibility({
            pmsId: 'matrix-update',
            xrayId: 'matrix-update',
            pmsStatus: 'In Prod',
            xrayStatus: 'Done',
            pmsModes: [],
            xrayModes: [],
            xrayNotes: 'Full matrix update'
          });
          break;
        case 'logo-updates':
          // For logos, we'd need to iterate through the changes
          // This is just a placeholder
          if (typeof value === 'object' && value !== null) {
            const logoObj = value as Record<string, string>;
            for (const [id, logoUrl] of Object.entries(logoObj)) {
              await saveLogo(id, logoUrl);
            }
          }
          break;
      }
      
      setSyncStatus('synced');
      setLastSynced(new Date());
      toast.success(`Successfully submitted ${type} update to GitHub`);
    } catch (error) {
      console.error('Failed to save to GitHub:', error);
      setSyncStatus('error');
      toast.error(`Failed to save ${type} update to GitHub`);
    }
  };
  
  // Return the local value, setter function, and sync status
  return {
    value: localValue,
    setValue: (value: T) => {
      setLocalValue(value);
    },
    saveToGitHub: (value: T = localValue) => saveToGitHub(value),
    syncStatus,
    lastSynced,
    syncWithGitHub
  };
}

// Custom hook for compatibility data specifically
export function useCompatibilityData() {
  const pmsMatrix = useGitHubStorage<PMSAllisoneMatrix>({
    key: 'pms-compatibility-matrix',
    initialValue: pmsAllisoneMatrix,
    type: 'pms-matrix'
  });
  
  const xrayMatrix = useGitHubStorage<XrayAllisoneMatrix>({
    key: 'xray-compatibility-matrix',
    initialValue: xrayAllisoneMatrix,
    type: 'xray-matrix'
  });
  
  const saveCompatibilityEntry = async (data: {
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
  }) => {
    try {
      // Update local matrices first
      const newPmsMatrix = { ...pmsMatrix.value };
      const newXrayMatrix = { ...xrayMatrix.value };
      
      // Update PMS matrix
      newPmsMatrix[data.pmsId] = {
        ...newPmsMatrix[data.pmsId],
        compatible: data.pmsStatus !== 'Not Started' || data.pmsModes.length > 0,
        allisoneMode: data.pmsModes,
        status: data.pmsStatus as any,
        notes: data.pmsNotes || newPmsMatrix[data.pmsId]?.notes,
        supportedVersions: data.pmsVersions || newPmsMatrix[data.pmsId]?.supportedVersions
      };
      
      // Update X-ray matrix
      newXrayMatrix[data.xrayId] = {
        ...newXrayMatrix[data.xrayId],
        compatible: data.xrayStatus !== 'Not Started' || data.xrayModes.length > 0,
        allisoneMode: data.xrayModes,
        status: data.xrayStatus as any,
        notes: data.xrayNotes || newXrayMatrix[data.xrayId]?.notes,
        supportedVersions: data.xrayVersions || newXrayMatrix[data.xrayId]?.supportedVersions
      };
      
      // Save locally
      pmsMatrix.setValue(newPmsMatrix);
      xrayMatrix.setValue(newXrayMatrix);
      
      // Submit to GitHub
      await saveCompatibility(data);
      
      toast.success('Compatibility data updated successfully');
      return true;
    } catch (error) {
      console.error('Failed to save compatibility entry:', error);
      toast.error('Failed to update compatibility data');
      return false;
    }
  };
  
  return {
    pmsMatrix: pmsMatrix.value,
    xrayMatrix: xrayMatrix.value,
    setPmsMatrix: pmsMatrix.setValue,
    setXrayMatrix: xrayMatrix.setValue,
    saveCompatibilityEntry,
    syncStatus: {
      pms: pmsMatrix.syncStatus,
      xray: xrayMatrix.syncStatus
    },
    lastSynced: {
      pms: pmsMatrix.lastSynced,
      xray: xrayMatrix.lastSynced
    },
    syncMatrices: () => {
      pmsMatrix.syncWithGitHub(true);
      xrayMatrix.syncWithGitHub(true);
    }
  };
}
