import React, { useState } from 'react';
import { BUILD_INFO, getCacheBustParam } from '../utils/buildInfo';
import { InformationCircleIcon, ClockIcon, CodeBracketIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const DeploymentInfo: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  const handleForceRefresh = () => {
    // Clear all caches and force refresh
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        // Add cache busting parameter and reload
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('v', BUILD_INFO.timestamp.toString());
        currentUrl.searchParams.set('refresh', Date.now().toString());
        window.location.href = currentUrl.toString();
      });
    } else {
      // Fallback: just reload with cache busting
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('v', BUILD_INFO.timestamp.toString());
      currentUrl.searchParams.set('refresh', Date.now().toString());
      window.location.href = currentUrl.toString();
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-700 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-blue-100 dark:bg-blue-800/30 rounded-lg flex items-center justify-center">
            <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Deployment Info</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">Version {BUILD_INFO.version} • Build {BUILD_INFO.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleForceRefresh}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md flex items-center space-x-1 transition-colors"
            title="Force refresh to get latest deployment"
          >
            <ArrowPathIcon className="h-4 w-4" />
            <span>Force Refresh</span>
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800/50 dark:hover:bg-blue-700/50 text-blue-700 dark:text-blue-300 text-sm rounded-md transition-colors"
          >
            {showDetails ? 'Hide' : 'Details'}
          </button>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Build Date:</span>
                <span className="text-blue-700 dark:text-blue-300">{new Date(BUILD_INFO.buildDate).toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CodeBracketIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-900 dark:text-blue-100">Git Commit:</span>
                <span className="text-blue-700 dark:text-blue-300 font-mono text-xs">{BUILD_INFO.gitCommit}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-blue-900 dark:text-blue-100">Cache Bust URL:</span>
                <div className="text-blue-700 dark:text-blue-300 font-mono text-xs break-all">
                  {window.location.origin + window.location.pathname}?{getCacheBustParam()}
                </div>
              </div>
              <div>
                <span className="font-medium text-blue-900 dark:text-blue-100">Features:</span>
                <div className="text-blue-700 dark:text-blue-300 text-xs">
                  EnhancedLogo • NotionEmbed • Auto Cache-Busting
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-800/30 rounded text-xs text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> If you don't see the latest changes, click "Force Refresh" to clear all caches and get the newest deployment.
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentInfo;
