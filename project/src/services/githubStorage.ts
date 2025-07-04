import { PMSAllisoneMatrix, XrayAllisoneMatrix } from '../types/allisone';
import { CustomSoftware } from '../types/software';
import { addCacheBust } from '../utils/buildInfo';

const DATA_REPO_URL = 'https://raw.githubusercontent.com/SiSisuperTech/Allisone-compatibility-/main';

// Utility function to fetch data from GitHub with cache busting
async function fetchFromGitHub(path: string) {
  try {
    const cacheBustedUrl = addCacheBust(`${DATA_REPO_URL}/${path}`);
    const response = await fetch(cacheBustedUrl, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from GitHub: ${error}`);
    throw error;
  }
}

// Function to get latest data from GitHub
export async function getLatestData() {
  try {
    const [pmsSoftware, xraySoftware, pmsMatrix, xrayMatrix, logoUpdates] = await Promise.all([
      fetchFromGitHub('data/pms-software.json'),
      fetchFromGitHub('data/xray-software.json'),
      fetchFromGitHub('data/pms-matrix.json'),
      fetchFromGitHub('data/xray-matrix.json'),
      fetchFromGitHub('data/logo-updates.json')
    ]);
    
    return {
      pmsSoftware,
      xraySoftware,
      pmsMatrix,
      xrayMatrix,
      logoUpdates
    };
  } catch (error) {
    // If there's an error, return null so the app can fall back to local data
    console.error('Failed to fetch data from GitHub:', error);
    return null;
  }
}

// Function to submit updates via GitHub issue
export async function submitDataUpdate(
  type: 'pms-software' | 'xray-software' | 'pms-matrix' | 'xray-matrix' | 'logo-updates' | 'compatibility',
  data: any,
  description: string = 'Update data'
) {
  try {
    const formattedData = JSON.stringify(data, null, 2);
    const issueTitle = `Data Update: ${type} - ${new Date().toISOString().split('T')[0]}`;
    const issueBody = `
## Data Update Request

**Type**: \`${type}\`
**Description**: ${description}
**User Agent**: ${navigator.userAgent}
**Timestamp**: ${new Date().toISOString()}

\`\`\`json
${formattedData}
\`\`\`
    `;    // Create GitHub issue using GitHub REST API
    // For production, you'd have a serverless function or small server to handle this securely
    const issueUrl = `https://api.github.com/repos/SiSisuperTech/Allisone-compatibility-/issues`;
    
    try {
      // Check if we have an environment variable for direct API access (GitHub Actions, etc.)
      if (import.meta.env.VITE_GITHUB_TOKEN) {
        // Direct API call with token
        const response = await fetch(issueUrl, {
          method: 'POST',
          headers: {
            'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: issueTitle,
            body: issueBody,
            labels: ['data-update', type]
          })
        });
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        return {
          success: true,
          message: 'Update submitted successfully via GitHub issue. Changes will be processed shortly.',
          issueUrl: data.html_url
        };
      } else {
        // Simulate the request in development/production without token
        console.log('Simulating GitHub issue creation with:', {
          title: issueTitle,
          body: issueBody,
          labels: ['data-update', type]
        });

        // Return a simulated successful response
        return {
          success: true,
          message: 'Update submitted successfully (simulated). In production, changes will be processed via GitHub issues.',
          issueUrl: 'https://github.com/SiSisuperTech/Allisone-compatibility-/issues'
        };
      }
    } catch (error) {
      console.error('Error creating GitHub issue:', error);
      throw error;
    }
    
    // In a real implementation with a proxy server:
    /*
    const response = await fetch('https://your-proxy-api.com/github/create-issue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        repo: 'YourUsername/dental-compatibility-data',
        title: issueTitle,
        body: issueBody,
        labels: ['data-update', type]
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit update: ${response.statusText}`);
    }
    
    return await response.json();
    */
  } catch (error) {
    console.error('Failed to submit data update:', error);
    return {
      success: false,
      message: `Failed to submit update: ${error}`
    };
  }
}

// Function to save compatibility data
export async function saveCompatibility(data: {
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
}) {
  return submitDataUpdate('compatibility', data, 
    `Update compatibility data between PMS "${data.pmsId}" and X-ray "${data.xrayId}"`);
}

// Function to update PMS software
export async function savePmsSoftware(software: CustomSoftware) {
  return submitDataUpdate('pms-software', software, 
    `Update PMS software "${software.name}"`);
}

// Function to update X-ray software
export async function saveXraySoftware(software: CustomSoftware) {
  return submitDataUpdate('xray-software', software, 
    `Update X-ray software "${software.name}"`);
}

// Function to delete a software entry
export async function deleteSoftware(id: string, type: 'pms' | 'xray') {
  return submitDataUpdate(
    type === 'pms' ? 'pms-software' : 'xray-software', 
    { id, _action: 'delete' },
    `Delete ${type} software "${id}"`
  );
}

// Function to update logo
export async function saveLogo(id: string, logoUrl: string) {
  return submitDataUpdate('logo-updates', { id, logoUrl }, 
    `Update logo for "${id}"`);
}
