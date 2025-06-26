import React from 'react';
import { getCompatibilityRequirements } from '../data/allisoneCompatibility';

interface IntegrationDiagramProps {
  pmsId: string;
  xrayId: string;
}

const IntegrationDiagram: React.FC<IntegrationDiagramProps> = ({ pmsId, xrayId }) => {
  const compatibility = getCompatibilityRequirements(pmsId, xrayId);
  
  if (!compatibility.compatible) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 rounded-md text-center">
        <h3 className="text-lg font-medium text-red-800 mb-2">Integration Not Available</h3>
        <p className="text-red-700">
          {Array.isArray(compatibility.notes) && compatibility.notes.length > 0
            ? compatibility.notes[0]
            : 'No compatible integration path found between these systems.'}
        </p>
      </div>
    );
  }

  // Determine the integration mode - Gateway or V1
  const usesGateway = compatibility.pmsMode?.includes('Gateway');
  const usesV1Image = compatibility.pmsMode?.includes('V1 + Image');
  const usesV1NoImage = compatibility.pmsMode?.includes('V1 without Image');
  
  // Determine X-ray modes
  const usesServerMode = compatibility.xrayMode?.includes('A+ v2 - Server Mode');
  const usesBridgeMode = compatibility.xrayMode?.includes('A+ v2 - Bridge Mode');
  const usesWatcher = compatibility.xrayMode?.some(mode => mode.includes('Watcher'));

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Integration Architecture
      </h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Diagram */}
        <div className="w-full max-w-2xl p-4 rounded-lg bg-gray-50">
          {/* X-ray System */}
          <div className="flex justify-center mb-6">
            <div className="w-64 h-24 border-2 border-blue-500 rounded-lg bg-blue-50 flex flex-col items-center justify-center p-2">
              <div className="text-blue-700 font-medium">X-ray System</div>
              <div className="text-sm text-blue-600">{compatibility.xrayMode?.[0] || 'Unknown Mode'}</div>
              {usesServerMode && (
                <div className="mt-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                  A+ v2 Server Mode
                </div>
              )}
            </div>
          </div>
          
          {/* Connection Lines */}
          <div className="flex justify-center mb-6 relative">
            <div className="w-1 h-20 bg-gray-300"></div>
            
            {usesBridgeMode && (
              <div className="absolute top-6 -right-24 transform rotate-45">
                <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Bridge Mode
                </div>
              </div>
            )}
            
            {usesWatcher && (
              <div className="absolute top-6 -left-24 transform -rotate-45">
                <div className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Watcher
                </div>
              </div>
            )}
          </div>
          
          {/* Allisone+ */}
          <div className="flex justify-center mb-6">
            <div className="w-72 h-28 border-2 border-green-600 rounded-lg bg-green-50 flex flex-col items-center justify-center p-2">
              <div className="text-green-700 font-medium">Allisone+</div>
              <div className="flex space-x-2 mt-2">
                {usesGateway && (
                  <div className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                    Gateway
                  </div>
                )}
                {(usesV1Image || usesV1NoImage) && (
                  <div className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                    {usesV1Image ? 'V1 + Image' : 'V1 without Image'}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Connection Lines */}
          <div className="flex justify-center mb-6 relative">
            <div className="w-1 h-20 bg-gray-300"></div>
            
            {usesGateway && (
              <div className="absolute top-6 -right-24 transform rotate-45">
                <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Gateway API
                </div>
              </div>
            )}
            
            {(usesV1Image || usesV1NoImage) && (
              <div className="absolute top-6 -left-24 transform -rotate-45">
                <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  {usesV1Image ? 'With Image' : 'No Image'}
                </div>
              </div>
            )}
          </div>
          
          {/* PMS System */}
          <div className="flex justify-center">
            <div className="w-64 h-24 border-2 border-indigo-500 rounded-lg bg-indigo-50 flex flex-col items-center justify-center p-2">
              <div className="text-indigo-700 font-medium">PMS System</div>
              <div className="text-sm text-indigo-600">{compatibility.pmsMode?.[0] || 'Unknown Mode'}</div>
              <div className="mt-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                {compatibility.pmsStatus || 'Unknown Status'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="w-full max-w-2xl grid grid-cols-2 gap-4 text-sm">
          <div className="col-span-2 text-gray-700 font-medium">Requirements:</div>
          {compatibility.requirements.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span>{requirement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationDiagram;
