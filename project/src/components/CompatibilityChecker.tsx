import React, { useState } from 'react';
import { pmsSoftware, xraySoftware } from '../data/allisoneCompatibility';
import CompatibilityRequirements from './CompatibilityRequirements';
import IntegrationDiagram from './IntegrationDiagram';

const CompatibilityChecker: React.FC = () => {
  const [selectedPMS, setSelectedPMS] = useState<string>('');
  const [selectedXRay, setSelectedXRay] = useState<string>('');
  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-100">
        Allisone+ Compatibility Checker
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select PMS Software
          </label>
          <select
            value={selectedPMS}
            onChange={(e) => setSelectedPMS(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">-- Select PMS --</option>
            {pmsSoftware.map((software) => (
              <option key={software.id} value={software.id}>
                {software.name} ({software.company})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select X-ray Software
          </label>
          <select
            value={selectedXRay}
            onChange={(e) => setSelectedXRay(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">-- Select X-ray --</option>
            {xraySoftware.map((software) => (
              <option key={software.id} value={software.id}>
                {software.name} ({software.company})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedPMS && selectedXRay && (
        <div className="space-y-6">
          <div 
            onClick={() => setShowDetails(!showDetails)}
            className="cursor-pointer"
          >
            <CompatibilityRequirements
              pmsId={selectedPMS}
              xrayId={selectedXRay}
              showDetails={showDetails}
            />
          </div>
          
          {showDetails && (
            <div className="mt-8">
              <IntegrationDiagram
                pmsId={selectedPMS}
                xrayId={selectedXRay}
              />
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/30 dark:border-blue-800">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">
          Important Integration Notes
        </h3>
        <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 space-y-2">
          <li>
            <span className="font-medium">Gateway mode</span> requires both <span className="font-medium">A+ v2 Bridge Mode</span> and <span className="font-medium">A+ v2 Server Mode</span> to be enabled.
          </li>
          <li>
            A+ v2 Server Mode must be activated on the server/panoramic PC to retrieve X-rays.
          </li>
          <li>
            Some software may require specific versions or paid upgrades to support certain integration modes.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompatibilityChecker;
