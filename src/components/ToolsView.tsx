import React from 'react';
import {
  DocumentArrowDownIcon,
  CogIcon,
  ServerIcon
} from '@heroicons/react/24/outline';
import { PMSSoftware, XraySoftware } from '../types/software';
import { pmsAllisoneMatrix, xrayAllisoneMatrix } from '../data/allisoneCompatibility';
import { analyzeAllisoneCompatibility } from '../utils/allisoneAnalysis';

interface ToolsViewProps {
  pmsSoftware: PMSSoftware[];
  xraySoftware: XraySoftware[];
  onViewChange: (view: 'admin') => void;
}

const ToolsView: React.FC<ToolsViewProps> = ({ pmsSoftware, xraySoftware, onViewChange }) => {

  const handleDownloadCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "PMS Name,PMS Company,X-Ray Name,X-Ray Company,Is Compatible,Compatibility Modes,Notes\r\n";

    pmsSoftware.forEach(pms => {
      xraySoftware.forEach(xray => {
        const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
        const compatible = compatibility.compatible ? 'Yes' : 'No';
        const modes = compatibility.commonModes.join(' | ');
        const notes = (compatibility.recommendations || []).join(' | ');

        csvContent += `"${pms.name}","${pms.company}","${xray.name}","${xray.company}","${compatible}","${modes}","${notes}"\r\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "allisone_compatibility_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Tools & Data Management</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Export data and manage the compatibility matrix.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reporting Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
          <DocumentArrowDownIcon className="h-16 w-16 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Export Compatibility Data</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Download the full compatibility matrix as a CSV file for offline analysis or record-keeping.</p>
          <button 
            onClick={handleDownloadCsv}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            <DocumentArrowDownIcon className="-ml-1 mr-3 h-5 w-5" />
            Download Full Report (CSV)
          </button>
        </div>

        {/* Data Management Section */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
          <CogIcon className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manage System Data</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Add, edit, or remove software entries and update compatibility rules in the admin dashboard.</p>
          <button 
            onClick={() => onViewChange('admin')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
          >
            <ServerIcon className="-ml-1 mr-3 h-5 w-5" />
            Go to Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolsView;
