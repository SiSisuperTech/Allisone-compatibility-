import React from 'react';
import { getCompatibilityRequirements } from '../data/allisoneCompatibility';

// Define the return type for clarity
type CompatibilityResult = ReturnType<typeof getCompatibilityRequirements>;

interface CompatibilityRequirementsProps {
  pmsId: string;
  xrayId: string;
  showDetails?: boolean;
}

const CompatibilityRequirements: React.FC<CompatibilityRequirementsProps> = ({ 
  pmsId, 
  xrayId,
  showDetails = false 
}) => {
  const compatibility = getCompatibilityRequirements(pmsId, xrayId);
  
  if (!compatibility.compatible) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm dark:bg-red-900/30 dark:border-red-700">
        <p className="font-medium text-red-800 dark:text-red-400">Not Compatible</p>
        {compatibility.notes && compatibility.notes.length > 0 && (
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
            {Array.isArray(compatibility.notes) 
              ? compatibility.notes[0] 
              : compatibility.notes}
          </p>
        )}
      </div>
    );
  }
  
  if (!showDetails) {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-2 rounded-md shadow-sm dark:bg-green-900/30 dark:border-green-700">
        <p className="font-medium text-green-800 dark:text-green-400">Compatible</p>
        {compatibility.requirements && compatibility.requirements.length > 0 && (
          <p className="text-xs text-green-700 dark:text-green-300 mt-1">
            Has requirements - click for details
          </p>
        )}
      </div>
    );
  }
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
        Compatible Integration
      </h3>
      
      {compatibility.requirements && compatibility.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Requirements:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
            {compatibility.requirements.map((req: string, index: number) => (
              <li key={index} className="py-1">
                {req.includes('Server Mode') ? (
                  <span className="font-medium text-amber-600 dark:text-amber-400">{req}</span>
                ) : req.includes('Bridge Mode') ? (
                  <span className="font-medium text-blue-600 dark:text-blue-400">{req}</span>
                ) : (
                  req
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Integration Details:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300">PMS Modes:</h5>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
              {compatibility.pmsMode && compatibility.pmsMode.map((mode: string, index: number) => (
                <li key={index}>{mode}</li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 dark:text-gray-300">X-ray Modes:</h5>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
              {compatibility.xrayMode && compatibility.xrayMode.map((mode: string, index: number) => (
                <li key={index}>{mode}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {compatibility.notes && Array.isArray(compatibility.notes) && compatibility.notes.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Additional Notes:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
            {compatibility.notes.map((note: string, index: number) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-400 mr-2"></span>
          <span>PMS Status: {compatibility.pmsStatus || 'Unknown'}</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 mr-2"></span>
          <span>X-ray Status: {compatibility.xrayStatus || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityRequirements;
