import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { CustomSoftware } from '../types/software';
import { PMSCompatibilityStatus, XrayCompatibilityStatus, AllisoneCompatibilityResult } from '../types/allisone';

interface EditCompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    pmsId: string;
    xrayId: string;
    pmsStatus: PMSCompatibilityStatus;
    xrayStatus: XrayCompatibilityStatus;
    pmsModes: string[];
    xrayModes: string[];
    pmsNotes?: string;
    xrayNotes?: string;
    pmsVersions?: string;
    xrayVersions?: string;
  }) => void;
  pms: CustomSoftware | null;
  xray: CustomSoftware | null;
  compatibility: AllisoneCompatibilityResult | null;
  pmsStatusOptions: PMSCompatibilityStatus[];
  xrayStatusOptions: XrayCompatibilityStatus[];
  syncStatus?: 'idle' | 'syncing' | 'synced' | 'error';
}

// Available integration modes
const PMS_MODES = ['Gateway', 'API Gateway', 'V1 + Image', 'V1 without Image', 'CreateDiagnostic (legacy)'];
const XRAY_MODES = ['A+ v2 Server Mode', 'A+ v2 Bridge Mode', 'Full Watcher', 'DICOM Bridge', 'WADO Bridge'];

const EditCompatibilityModal: React.FC<EditCompatibilityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  pms,
  xray,
  compatibility,
  pmsStatusOptions,
  xrayStatusOptions,
  syncStatus = 'idle'
}) => {
  const [pmsStatus, setPmsStatus] = useState<PMSCompatibilityStatus>('Not Started');
  const [xrayStatus, setXrayStatus] = useState<XrayCompatibilityStatus>('Not Started');
  const [pmsModes, setPmsModes] = useState<string[]>([]);
  const [xrayModes, setXrayModes] = useState<string[]>([]);
  const [pmsNotes, setPmsNotes] = useState('');
  const [xrayNotes, setXrayNotes] = useState('');
  const [pmsVersions, setPmsVersions] = useState('');
  const [xrayVersions, setXrayVersions] = useState('');

  // Initialize form fields when compatibility data changes
  useEffect(() => {
    if (compatibility && pms && xray) {
      setPmsStatus(compatibility.pmsCompatibility?.status || 'Not Started');
      setXrayStatus(compatibility.xrayCompatibility?.status || 'Not Started');
      setPmsModes(compatibility.pmsCompatibility?.allisoneMode || []);
      setXrayModes(compatibility.xrayCompatibility?.allisoneMode || []);
      setPmsNotes(compatibility.pmsCompatibility?.notes || '');
      setXrayNotes(compatibility.xrayCompatibility?.notes || '');
      setPmsVersions(compatibility.pmsCompatibility?.supportedVersions || '');
      setXrayVersions(compatibility.xrayCompatibility?.supportedVersions || '');
    } else {
      // Reset form if no data is available
      setPmsStatus('Not Started');
      setXrayStatus('Not Started');
      setPmsModes([]);
      setXrayModes([]);
      setPmsNotes('');
      setXrayNotes('');
      setPmsVersions('');
      setXrayVersions('');
    }
  }, [compatibility, pms, xray]);

  const handleSave = () => {
    if (!pms || !xray) return;
    
    onSave({
      pmsId: pms.id,
      xrayId: xray.id,
      pmsStatus,
      xrayStatus,
      pmsModes,
      xrayModes,
      pmsNotes,
      xrayNotes,
      pmsVersions,
      xrayVersions
    });
  };

  const handlePmsModeToggle = (mode: string) => {
    setPmsModes(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode) 
        : [...prev, mode]
    );
  };

  const handleXrayModeToggle = (mode: string) => {
    setXrayModes(prev => 
      prev.includes(mode) 
        ? prev.filter(m => m !== mode) 
        : [...prev, mode]
    );
  };

  if (!pms || !xray) return null;

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen px-2 sm:px-4 py-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-sm sm:max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 mobile-scroll">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 touch-target"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </button>
              </div>

              <Dialog.Title as="h3" className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 pr-8 sm:pr-10">
                <span className="block sm:hidden">Edit Compatibility</span>
                <span className="hidden sm:block">Edit Compatibility: {pms.name} + {xray.name}</span>
              </Dialog.Title>
              
              {/* Mobile-only software info */}
              <div className="block sm:hidden mb-4 text-sm text-gray-600 dark:text-gray-400">
                {pms.name} + {xray.name}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* PMS Configuration */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 mr-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-1.5 flex items-center justify-center">
                      <img 
                        src={pms.logo} 
                        alt={pms.name} 
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {pms.name} → Allisone+
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {/* PMS Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Integration Status
                      </label>
                      <select
                        value={pmsStatus}
                        onChange={(e) => setPmsStatus(e.target.value as PMSCompatibilityStatus)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {pmsStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* PMS Integration Modes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Integration Modes
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PMS_MODES.map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handlePmsModeToggle(mode)}
                            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                              pmsModes.includes(mode)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* PMS Supported Versions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Supported Versions
                      </label>
                      <input
                        type="text"
                        value={pmsVersions}
                        onChange={(e) => setPmsVersions(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., v12.5 and above"
                      />
                    </div>

                    {/* PMS Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={pmsNotes}
                        onChange={(e) => setPmsNotes(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Additional information about this integration"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* X-ray Configuration */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 mr-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-1.5 flex items-center justify-center">
                      <img 
                        src={xray.logo} 
                        alt={xray.name} 
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {xray.name} → Allisone+
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {/* X-ray Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Integration Status
                      </label>
                      <select
                        value={xrayStatus}
                        onChange={(e) => setXrayStatus(e.target.value as XrayCompatibilityStatus)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        {xrayStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* X-ray Integration Modes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Integration Modes
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {XRAY_MODES.map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handleXrayModeToggle(mode)}
                            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                              xrayModes.includes(mode)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* X-ray Supported Versions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Supported Versions
                      </label>
                      <input
                        type="text"
                        value={xrayVersions}
                        onChange={(e) => setXrayVersions(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., v3.2 and above"
                      />
                    </div>

                    {/* X-ray Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Notes
                      </label>
                      <textarea
                        value={xrayNotes}
                        onChange={(e) => setXrayNotes(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Additional information about this integration"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}              {/* GitHub Sync Status */}
              <div className="mb-4 px-4 py-3 rounded-md bg-gray-50 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  {syncStatus === 'syncing' ? (
                    <>
                      <svg
                        className="animate-spin mr-2 h-4 w-4 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                        />
                      </svg>
                      <span>Syncing with GitHub...</span>
                    </>
                  ) : syncStatus === 'synced' ? (
                    <>
                      <svg 
                        className="mr-2 h-4 w-4 text-green-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span>Data synchronized with GitHub</span>
                    </>
                  ) : syncStatus === 'error' ? (
                    <>
                      <svg 
                        className="mr-2 h-4 w-4 text-red-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                        />
                      </svg>
                      <span>Sync error. Changes will be saved locally and synced later.</span>
                    </>
                  ) : (
                    <>
                      <svg 
                        className="mr-2 h-4 w-4 text-gray-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
                        />
                      </svg>
                      <span>Changes will be saved locally and synced to GitHub</span>
                    </>
                  )}
                </div>
                <div className="mt-2 text-xs">
                  <span className="opacity-75">
                    GitHub storage allows all users to access the same compatibility data across devices
                  </span>
                </div>
              </div>
                
              {/* Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={syncStatus === 'syncing'}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center ${
                    syncStatus === 'syncing' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {syncStatus === 'syncing' && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                      />
                    </svg>
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditCompatibilityModal;
