import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PMSSoftware, XraySoftware } from '../types/software';

interface SoftwareSelectorProps {
  pmsSoftware: PMSSoftware[];
  xraySoftware: XraySoftware[];
  selectedPMS: string;
  selectedXray: string;
  onPMSChange: (value: string) => void;
  onXrayChange: (value: string) => void;
}

const SoftwareSelector: React.FC<SoftwareSelectorProps> = ({
  pmsSoftware,
  xraySoftware,
  selectedPMS,
  selectedXray,
  onPMSChange,
  onXrayChange
}) => {
  const selectedPMSData = pmsSoftware.find(s => s.id === selectedPMS);
  const selectedXrayData = xraySoftware.find(s => s.id === selectedXray);

  return (
    <div>
      <div className={`grid ${selectedPMS ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 justify-items-center'} gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-500`}>
        {/* PMS Software Selector */}
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 transition-colors duration-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Practice Management Software</h3>
          <div className="relative">
            <select
              value={selectedPMS}
              onChange={(e) => onPMSChange(e.target.value)}
              className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 pr-8 sm:pr-10 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select PMS Software</option>
              {pmsSoftware.map((software) => (
                <option key={software.id} value={software.id}>
                  {software.name} - {software.company}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-300 pointer-events-none" />
          </div>
          
          {/* Show selected PMS logo if available */}
          {selectedPMSData?.logo && (
            <div className="mt-3 sm:mt-4 flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <img
                src={selectedPMSData.logo}
                alt={`${selectedPMSData.name} logo`}
                className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded border border-gray-200 dark:border-gray-600 bg-white p-0.5 sm:p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{selectedPMSData.name}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">{selectedPMSData.company}</p>
              </div>
            </div>
          )}
        </div>

        {/* X-ray Software Selector */}
        {selectedPMS && (
          <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 animate-fade-in">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">X-ray Software</h3>
            <div className="relative">
              <select
                value={selectedXray}
                onChange={(e) => onXrayChange(e.target.value)}
                className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 pr-8 sm:pr-10 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select X-ray Software</option>
                {xraySoftware.map((software) => (
                  <option key={software.id} value={software.id}>
                    {software.name} - {software.company}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-300 pointer-events-none" />
            </div>
            
            {/* Show selected X-ray logo if available */}
            {selectedXrayData?.logo && (
              <div className="mt-3 sm:mt-4 flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <img
                  src={selectedXrayData.logo}
                  alt={`${selectedXrayData.name} logo`}
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain rounded border border-gray-200 dark:border-gray-600 bg-white p-0.5 sm:p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{selectedXrayData.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">{selectedXrayData.company}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoftwareSelector;