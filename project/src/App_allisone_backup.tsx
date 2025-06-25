import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SoftwareSelector from './components/SoftwareSelector';
import { ToastContainer } from './components/Toast';
import { pmsSoftware as basePmsSoftware, xraySoftware as baseXraySoftware } from './data/allisoneCompatibility';
import { pmsAllisoneMatrix, xrayAllisoneMatrix } from './data/allisoneCompatibility';
import { analyzeAllisoneCompatibility } from './utils/allisoneAnalysis';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CustomSoftware } from './types/software';

type ViewType = 'checker' | 'matrix' | 'tools' | 'admin';

function App() {
  const [selectedPMS, setSelectedPMS] = useState('');
  const [selectedXray, setSelectedXray] = useState('');
  const [currentView, setCurrentView] = useState<ViewType>('checker');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    pms: any;
    xray: any;
    compatibility: any;
  } | null>(null);
  
  // Custom data stored in localStorage
  const [customSoftware, setCustomSoftware] = useLocalStorage<CustomSoftware[]>('dental-custom-software', []);
  const [logoUpdates, setLogoUpdates] = useLocalStorage<Record<string, string>>('dental-logo-updates', {});
  
  // Admin panel state
  const [newSoftware, setNewSoftware] = useState({
    type: '',
    name: '',
    company: '',
    logo: ''
  });
  const [selectedSoftwareForEdit, setSelectedSoftwareForEdit] = useState('');
  const [editStatus, setEditStatus] = useState('In Prod');
  const [editModes, setEditModes] = useState<string[]>([]);
  const [editNotes, setEditNotes] = useState('');
  const [selectedSoftwareForLogo, setSelectedSoftwareForLogo] = useState('');
  const [newLogoUrl, setNewLogoUrl] = useState('');
  // Merge base data with custom data
  const allPmsSoftware = useMemo(() => {
    const updatedBasePms = basePmsSoftware.map(pms => ({
      ...pms,
      logo: logoUpdates[pms.id] || pms.logo
    }));
    const customPms = customSoftware.filter(s => s.type === 'pms');
    return [...updatedBasePms, ...customPms];
  }, [customSoftware, logoUpdates]);

  const allXraySoftware = useMemo(() => {
    const updatedBaseXray = baseXraySoftware.map(xray => ({
      ...xray,
      logo: logoUpdates[xray.id] || xray.logo
    }));
    const customXray = customSoftware.filter(s => s.type === 'xray');
    return [...updatedBaseXray, ...customXray];
  }, [customSoftware, logoUpdates]);

  // Filter X-ray software based on selected PMS compatibility
  const compatibleXraySoftware = useMemo(() => {
    if (!selectedPMS) return allXraySoftware;
    
    return allXraySoftware.filter(xray => {
      const compatibility = analyzeAllisoneCompatibility(selectedPMS, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
      return compatibility?.compatible;
    });
  }, [selectedPMS, allXraySoftware, pmsAllisoneMatrix, xrayAllisoneMatrix]);

  // Check if selected PMS has gateway capabilities
  const selectedPmsData = useMemo(() => {
    return allPmsSoftware.find(pms => pms.id === selectedPMS);
  }, [selectedPMS, allPmsSoftware]);

  const hasGatewayIntegration = useMemo(() => {
    if (!selectedPmsData) return false;
    const pmsMatrix = pmsAllisoneMatrix[selectedPMS];
    return pmsMatrix?.allisoneMode?.includes('Gateway') || pmsMatrix?.allisoneMode?.includes('API Gateway');
  }, [selectedPMS, selectedPmsData, pmsAllisoneMatrix]);  // Admin helper functions
  const addNewSoftware = () => {
    if (!newSoftware.name || !newSoftware.company || !newSoftware.type) {
      alert('Please fill in all required fields (Type, Name, Company)');
      return;
    }    const newEntry: CustomSoftware = {
      id: `custom-${Date.now()}`,
      name: newSoftware.name,
      company: newSoftware.company,
      type: newSoftware.type as 'pms' | 'xray',
      logo: newSoftware.logo || '/logos/default.png'
    };

    setCustomSoftware([...customSoftware, newEntry]);
    setNewSoftware({ type: '', name: '', company: '', logo: '' });
    alert(`${newSoftware.name} has been added successfully!`);
  };

  const deleteSoftware = (softwareId: string) => {
    if (confirm('Are you sure you want to delete this software entry?')) {
      setCustomSoftware(customSoftware.filter(s => s.id !== softwareId));
      alert('Software deleted successfully!');
    }
  };

  const updateLogo = () => {
    if (!selectedSoftwareForLogo || !newLogoUrl) {
      alert('Please select software and enter a logo URL');
      return;
    }

    setLogoUpdates({
      ...logoUpdates,
      [selectedSoftwareForLogo]: newLogoUrl
    });
    setSelectedSoftwareForLogo('');
    setNewLogoUrl('');
    alert('Logo updated successfully!');
  };

  const revertLogo = (softwareId: string) => {
    if (confirm('Revert logo to default?')) {
      const newLogoUpdates = { ...logoUpdates };
      delete newLogoUpdates[softwareId];
      setLogoUpdates(newLogoUpdates);
      alert('Logo reverted to default!');
    }
  };

  const handleModeToggle = (mode: string) => {
    if (editModes.includes(mode)) {
      setEditModes(editModes.filter(m => m !== mode));
    } else {
      setEditModes([...editModes, mode]);
    }
  };

  const saveCompatibilityChanges = () => {
    // This would normally save to a database or update the matrices
    // For now, we'll show a confirmation
    alert(`Compatibility settings saved for ${selectedSoftwareForEdit}\nStatus: ${editStatus}\nModes: ${editModes.join(', ')}\nNotes: ${editNotes}`);
    
    // Reset form
    setSelectedSoftwareForEdit('');
    setEditStatus('In Prod');
    setEditModes([]);
    setEditNotes('');
  };
  const resetCompatibilityForm = () => {
    setSelectedSoftwareForEdit('');
    setEditStatus('In Prod');
    setEditModes([]);
    setEditNotes('');
  };

  // Filter modes to show only the most advanced integration
  const filterToMostAdvancedModes = (modes: string[]): string[] => {
    if (!modes || modes.length === 0) return [];
    
    // Priority order: Gateway > V2 > V1 + Image > V1 without Image > Legacy
    const modePriority: Record<string, number> = {
      'Gateway': 10,
      'V2': 9,
      'V1 + Image': 8,
      'V1 without Image': 7,
      'CreateDiagnostic (legacy)': 6,
      // X-ray modes
      'A+ v2 - Server Mode': 10,
      'A+ v2 - Bridge Mode': 9,
      'Full Watcher': 8,
      'Full Watcher Dicom': 7,
      'Watcher Light + Dicom': 6,
      'Generic Dicom': 5
    };

    // Find the highest priority mode
    let maxPriority = 0;
    for (const mode of modes) {
      const priority = modePriority[mode] || 0;
      if (priority > maxPriority) {
        maxPriority = priority;
      }
    }

    // Return only the modes with the highest priority
    return modes.filter(mode => (modePriority[mode] || 0) === maxPriority);
  };

  // Nouvelle logique de compatibilité Allisone+
  const allisoneCompatibility = selectedPMS && selectedXray 
    ? analyzeAllisoneCompatibility(selectedPMS, selectedXray, pmsAllisoneMatrix, xrayAllisoneMatrix)
    : null;
    // Ensure body has proper styling for dark mode and full viewport
  useEffect(() => {
    // Set body and html to full viewport
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
    
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    document.body.style.backgroundColor = 'inherit';
    document.body.style.color = 'inherit';
    
    // Get root element and ensure it takes full viewport
    const root = document.getElementById('root');
    if (root) {
      root.style.margin = '0';
      root.style.padding = '0';
      root.style.height = '100%';
      root.style.width = '100%';
      root.style.backgroundColor = 'inherit';
      root.style.color = 'inherit';
    }
  }, []);
  return (    <div className="h-screen w-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-auto">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-4rem)]">
        
        {/* Checker View */}        {currentView === 'checker' && (
          <>
            {/* Software Selection */}
            <SoftwareSelector
              pmsSoftware={allPmsSoftware}
              xraySoftware={compatibleXraySoftware}
              selectedPMS={selectedPMS}
              selectedXray={selectedXray}
              onPMSChange={(pmsId) => {
                setSelectedPMS(pmsId);
                setSelectedXray(''); // Reset X-ray selection when PMS changes
              }}
              onXrayChange={setSelectedXray}
            />            {/* Gateway Integration Notice - Only show for PMS that actually support Gateway */}
            {selectedPMS && hasGatewayIntegration && (
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">🌐</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300">Gateway Integration Available</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                      {selectedPmsData?.name} supports gateway integration for broader X-ray system compatibility.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* No Compatible X-ray Software Notice */}
            {selectedPMS && compatibleXraySoftware.length === 0 && (
              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-300">No Direct Compatibility Found</h4>
                    <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-1">
                      No X-ray software is directly compatible with {selectedPmsData?.name} through Allisone+ at this time.
                      {hasGatewayIntegration && " However, gateway integration may provide alternative connection options."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Compatible X-ray Count */}
            {selectedPMS && compatibleXraySoftware.length > 0 && (
              <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-300">Compatible X-ray Systems Found</h4>
                    <p className="text-sm text-green-800 dark:text-green-300 mt-1">
                      {compatibleXraySoftware.length} X-ray system{compatibleXraySoftware.length > 1 ? 's are' : ' is'} compatible with {selectedPmsData?.name} through Allisone+ integration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Compatibility Result */}
            {allisoneCompatibility && (
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200"><div className={`flex items-center space-x-3 mb-4 ${
              allisoneCompatibility.compatible ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              <div className={`w-4 h-4 rounded-full ${
                allisoneCompatibility.compatible ? 'bg-green-500' : 'bg-red-500'
              }`}></div>              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {allisoneCompatibility.compatible ? 'Compatible via Allisone+' : 'Not Compatible with Allisone+'}
              </h3>
            </div>            {allisoneCompatibility && allisoneCompatibility.compatible && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Available Allisone+ Modes:</h4>
                <div className="grid gap-2">
                  {filterToMostAdvancedModes(allisoneCompatibility.commonModes).map((mode, index) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                      <span className="text-blue-800 dark:text-blue-300 font-medium">{mode}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}<div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* PMS Compatibility */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {allPmsSoftware.find(p => p.id === selectedPMS)?.name} → Allisone+
                </h4>
                <div className="space-y-2">                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Status: </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      allisoneCompatibility.pmsCompatibility.status === 'In Prod' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : allisoneCompatibility.pmsCompatibility.status === 'In Test'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {allisoneCompatibility.pmsCompatibility.status}
                    </span>
                  </div>                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Modes: </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">{filterToMostAdvancedModes(allisoneCompatibility.pmsCompatibility.allisoneMode).join(', ')}</span>
                  </div>
                  {allisoneCompatibility.pmsCompatibility.notes && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">{allisoneCompatibility.pmsCompatibility.notes}</p>
                  )}
                </div>
              </div>

              {/* X-ray Compatibility */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {allXraySoftware.find(x => x.id === selectedXray)?.name} → Allisone+
                </h4>
                <div className="space-y-2">                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Status: </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      allisoneCompatibility.xrayCompatibility.status === 'Done' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : allisoneCompatibility.xrayCompatibility.status === 'Planned'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {allisoneCompatibility.xrayCompatibility.status}
                    </span>
                  </div>                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Modes: </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">{filterToMostAdvancedModes(allisoneCompatibility.xrayCompatibility.allisoneMode).join(', ')}</span>
                  </div>
                  {allisoneCompatibility.xrayCompatibility.supportedVersions && (
                    <div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Versions: </span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{allisoneCompatibility.xrayCompatibility.supportedVersions}</span>
                    </div>
                  )}
                  {allisoneCompatibility.xrayCompatibility.notes && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">{allisoneCompatibility.xrayCompatibility.notes}</p>
                  )}
                </div>
              </div>
            </div>            {/* Recommendations */}
            {allisoneCompatibility.recommendations && allisoneCompatibility.recommendations.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {allisoneCompatibility.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-blue-800 dark:text-blue-300">• {rec}</li>
                  ))}
                </ul>
              </div>            )}
          </div>
        )}
        </>
        )}        {/* Matrix View */}
        {currentView === 'matrix' && (
          <div className="space-y-6">
            {/* Matrix Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Allisone+ Compatibility Matrix</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete compatibility overview between {allPmsSoftware.length} PMS and {allXraySoftware.length} X-ray software through Allisone+ integration
                  </p>
                </div>
                <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                  <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white">
                    <option>All Software</option>
                    <option>Production Ready</option>
                    <option>In Testing</option>
                    <option>Planned</option>
                  </select>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Export Matrix
                  </button>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Production Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">In Testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Planned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Not Compatible</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Unknown</span>
                </div>
              </div>
            </div>            {/* Enhanced Professional Matrix */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Software Compatibility Matrix
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Click any cell for detailed compatibility information
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white">
                      <option>All Software</option>
                      <option>Production Ready</option>
                      <option>In Testing</option>
                      <option>Planned</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Export Matrix
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                    <tr>
                      <th className="sticky left-0 z-20 bg-gray-50 dark:bg-gray-900 p-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 min-w-[200px]">
                        PMS Software
                      </th>
                      {allXraySoftware.map((xray) => (
                        <th key={xray.id} className="p-3 text-center text-xs font-medium text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700 min-w-[100px] max-w-[120px]">
                          <div className="transform -rotate-45 origin-center whitespace-nowrap">
                            <div className="flex flex-col items-center">
                              <span className="truncate max-w-[80px] font-semibold" title={xray.name}>
                                {xray.name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {xray.company}
                              </span>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>                  <tbody>
                    {allPmsSoftware.map((pms, pmsIndex) => (
                      <tr key={pms.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 ${pmsIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-25 dark:bg-gray-800/50'}`}>
                        <td className="sticky left-0 z-10 bg-inherit p-4 border-r border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            {pms.logo && (
                              <img
                                src={pms.logo}
                                alt={`${pms.name} logo`}
                                className="w-8 h-8 object-contain rounded border border-gray-200 dark:border-gray-600 bg-white p-1"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            )}
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                                {pms.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {pms.company}
                              </div>
                            </div>
                          </div>
                        </td>                        {allXraySoftware.map((xray) => {
                          const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
                          const getStatusColor = () => {
                            if (!compatibility) return 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500';
                            if (compatibility.compatible) {
                              if (compatibility.pmsCompatibility.status === 'In Prod' && compatibility.xrayCompatibility.status === 'Done') {
                                return 'bg-green-100 dark:bg-green-900 border-green-400 dark:border-green-500';
                              } else if (compatibility.pmsCompatibility.status === 'In Test' || compatibility.xrayCompatibility.status === 'Planned') {
                                return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-400 dark:border-yellow-500';
                              } else {
                                return 'bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-500';
                              }
                            }
                            return 'bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-500';
                          };
                          
                          const getStatusIcon = () => {
                            if (!compatibility) return '?';
                            if (compatibility.compatible) {
                              if (compatibility.pmsCompatibility.status === 'In Prod' && compatibility.xrayCompatibility.status === 'Done') {
                                return '✓';
                              } else if (compatibility.pmsCompatibility.status === 'In Test' || compatibility.xrayCompatibility.status === 'Planned') {
                                return 'T';
                              } else {
                                return 'P';
                              }
                            }
                            return '✗';
                          };
                          
                          const getStatusText = () => {
                            if (!compatibility) return 'Unknown';
                            if (compatibility.compatible) {
                              if (compatibility.pmsCompatibility.status === 'In Prod' && compatibility.xrayCompatibility.status === 'Done') {
                                return 'Production Ready';
                              } else if (compatibility.pmsCompatibility.status === 'In Test' || compatibility.xrayCompatibility.status === 'Planned') {
                                return 'In Testing';
                              } else {
                                return 'Planned';
                              }
                            }
                            return 'Not Compatible';
                          };

                          const getIconColor = () => {
                            if (!compatibility) return 'text-gray-600 dark:text-gray-400';
                            if (compatibility.compatible) {
                              if (compatibility.pmsCompatibility.status === 'In Prod' && compatibility.xrayCompatibility.status === 'Done') {
                                return 'text-green-700 dark:text-green-300';
                              } else if (compatibility.pmsCompatibility.status === 'In Test' || compatibility.xrayCompatibility.status === 'Planned') {
                                return 'text-yellow-700 dark:text-yellow-300';
                              } else {
                                return 'text-blue-700 dark:text-blue-300';
                              }
                            }
                            return 'text-red-700 dark:text-red-300';
                          };

                          return (
                            <td key={xray.id} className="p-3 text-center border-r border-gray-200 dark:border-gray-700 border-b border-gray-100 dark:border-gray-700">
                              <div 
                                className="group relative cursor-pointer"
                                onClick={() => {
                                  const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
                                  setModalData({
                                    pms,
                                    xray,
                                    compatibility
                                  });
                                  setModalOpen(true);
                                }}
                                title={`${pms.name} + ${xray.name}: ${getStatusText()}`}
                              >
                                <div className={`w-8 h-8 ${getStatusColor()} border-2 rounded-lg mx-auto transition-all duration-200 group-hover:scale-110 group-hover:shadow-md flex items-center justify-center`}>
                                  <span className={`text-xs font-bold ${getIconColor()}`}>
                                    {getStatusIcon()}
                                  </span>
                                </div>
                                
                                {/* Enhanced Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                                  <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg p-3 whitespace-nowrap shadow-xl border border-gray-700 dark:border-gray-600">
                                    <div className="font-semibold mb-1">{pms.name} + {xray.name}</div>
                                    <div className="text-gray-300 dark:text-gray-400">Status: {getStatusText()}</div>                                    {compatibility?.commonModes && filterToMostAdvancedModes(compatibility.commonModes).length > 0 && (
                                      <div className="text-gray-300 dark:text-gray-400 mt-1">Modes: {filterToMostAdvancedModes(compatibility.commonModes).join(', ')}</div>
                                    )}
                                    <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">Click for details</div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}                  </tbody>
                </table>
              </div>
              
              {/* Modern Legend */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 dark:bg-green-900 border-2 border-green-400 dark:border-green-500 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-green-700 dark:text-green-300 font-bold text-[10px]">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Production Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-yellow-100 dark:bg-yellow-900 border-2 border-yellow-400 dark:border-yellow-500 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-yellow-700 dark:text-yellow-300 font-bold text-[10px]">T</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">In Testing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 border-2 border-blue-400 dark:border-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-blue-700 dark:text-blue-300 font-bold text-[10px]">P</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Planned</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-100 dark:bg-red-900 border-2 border-red-400 dark:border-red-500 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-red-700 dark:text-red-300 font-bold text-[10px]">✗</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Not Compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-gray-600 dark:text-gray-400 font-bold text-[10px]">?</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Unknown</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Download Full Matrix (PDF)
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Export Compatible Pairs (CSV)
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Generate Report
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Filter by Region
                </button>
              </div>
            </div>
          </div>
        )}        {/* Admin Panel View */}
        {currentView === 'admin' && (
          <div className="space-y-6">
            {/* Admin Panel Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Panel</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive management tools for software entries, compatibility modes, and system data
              </p>
            </div>            {/* Quick Actions Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button 
                onClick={() => {
                  // Scroll to software management section
                  const element = document.querySelector('[data-section="software-management"]');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">➕</span>
                  <div>
                    <div className="font-semibold">Add Software</div>
                    <div className="text-sm opacity-90">New PMS/X-ray entry</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => {
                  // Scroll to compatibility management section
                  const element = document.querySelector('[data-section="compatibility-management"]');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <div className="font-semibold">Manage Modes</div>
                    <div className="text-sm opacity-90">Compatibility settings</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => {
                  // Scroll to logo management section
                  const element = document.querySelector('[data-section="logo-management"]');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🖼️</span>
                  <div>
                    <div className="font-semibold">Logo Manager</div>
                    <div className="text-sm opacity-90">Update logos</div>
                  </div>
                </div>
              </button>
              <button 
                onClick={() => {
                  // Scroll to bulk operations section
                  const element = document.querySelector('[data-section="bulk-operations"]');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🗑️</span>
                  <div>
                    <div className="font-semibold">Bulk Actions</div>
                    <div className="text-sm opacity-90">Delete & cleanup</div>
                  </div>
                </div>
              </button>
            </div>            {/* Software Management */}
            <div data-section="software-management" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Software Management</h3>
                {/* Add New Software Form */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Add New Software</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <select 
                    value={newSoftware.type}
                    onChange={(e) => setNewSoftware({...newSoftware, type: e.target.value})}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Type</option>
                    <option value="pms">PMS Software</option>
                    <option value="xray">X-ray Software</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Software Name"
                    value={newSoftware.name}
                    onChange={(e) => setNewSoftware({...newSoftware, name: e.target.value})}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={newSoftware.company}
                    onChange={(e) => setNewSoftware({...newSoftware, company: e.target.value})}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button 
                    onClick={addNewSoftware}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Add Entry
                  </button>
                </div>
                <div className="mt-3">
                  <input
                    type="url"
                    placeholder="Logo URL (optional)"
                    value={newSoftware.logo}
                    onChange={(e) => setNewSoftware({...newSoftware, logo: e.target.value})}
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Software List with Actions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">Current Software ({allPmsSoftware.length + allXraySoftware.length} entries)</h4>
                  <div className="flex items-center space-x-2">
                    <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white">
                      <option value="all">All Software</option>
                      <option value="pms">PMS Only</option>
                      <option value="xray">X-ray Only</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* PMS Software List */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-3">PMS Software ({allPmsSoftware.length})</h5>
                  <div className="grid gap-2 max-h-40 overflow-y-auto">                    {allPmsSoftware.slice(0, 5).map((pms) => (
                      <div key={pms.id} className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          {pms.logo && (
                            <img src={pms.logo} alt="" className="w-8 h-8 object-contain rounded border" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{pms.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{pms.company}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              // For built-in software, we can't edit the core data, so just show info
                              alert(`Edit functionality for built-in software "${pms.name}" would modify compatibility settings only.`);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteSoftware(pms.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {allPmsSoftware.length > 5 && (
                      <div className="text-center text-sm text-gray-600 dark:text-gray-400 py-2">
                        ... and {allPmsSoftware.length - 5} more entries
                      </div>
                    )}
                  </div>
                </div>

                {/* X-ray Software List */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 dark:text-green-300 mb-3">X-ray Software ({allXraySoftware.length})</h5>
                  <div className="grid gap-2 max-h-40 overflow-y-auto">                    {allXraySoftware.slice(0, 5).map((xray) => (
                      <div key={xray.id} className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          {xray.logo && (
                            <img src={xray.logo} alt="" className="w-8 h-8 object-contain rounded border" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{xray.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{xray.company}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              // For built-in software, we can't edit the core data, so just show info
                              alert(`Edit functionality for built-in software "${xray.name}" would modify compatibility settings only.`);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteSoftware(xray.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                    {allXraySoftware.length > 5 && (
                      <div className="text-center text-sm text-gray-600 dark:text-gray-400 py-2">
                        ... and {allXraySoftware.length - 5} more entries
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>            {/* Compatibility Management */}
            <div data-section="compatibility-management" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Compatibility Management</h3>
                {/* Quick Compatibility Editor */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Edit Compatibility</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Software</label>
                    <select 
                      value={selectedSoftwareForEdit}
                      onChange={(e) => setSelectedSoftwareForEdit(e.target.value)}
                      className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                    >
                      <option value="">Choose software to edit...</option>
                      <optgroup label="PMS Software">
                        {allPmsSoftware.slice(0, 10).map(pms => (
                          <option key={pms.id} value={`pms-${pms.id}`}>{pms.name}</option>
                        ))}
                      </optgroup>
                      <optgroup label="X-ray Software">
                        {allXraySoftware.slice(0, 10).map(xray => (
                          <option key={xray.id} value={`xray-${xray.id}`}>{xray.name}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                    <select 
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                    >
                      <option value="In Prod">In Production</option>
                      <option value="In Test">In Testing</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Planned">Planned</option>
                      <option value="Done">Done</option>
                      <option value="Not started">Not Started</option>
                      <option value="Freeze">Frozen</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Modes</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {['Gateway', 'V1 + Image', 'V1 without Image', 'A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Full Watcher', 'Watcher Light + Dicom', 'Generic Dicom'].map(mode => (
                      <label key={mode} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={editModes.includes(mode)}
                          onChange={() => handleModeToggle(mode)}
                          className="rounded border-gray-300 dark:border-gray-600" 
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Add notes about this compatibility..."
                  />
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button 
                    onClick={resetCompatibilityForm}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                  <button 
                    onClick={saveCompatibilityChanges}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Compatibility Matrix Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 dark:text-green-300 mb-2">Production Ready</h5>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-300">
                    {Object.values(pmsAllisoneMatrix).filter(p => p.status === 'In Prod').length}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-400">PMS entries</div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-900 dark:text-yellow-300 mb-2">In Testing</h5>
                  <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-300">
                    {Object.values(pmsAllisoneMatrix).filter(p => p.status === 'In Test').length}
                  </div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-400">PMS entries</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-2">X-ray Done</h5>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                    {Object.values(xrayAllisoneMatrix).filter(x => x.status === 'Done').length}
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-400">X-ray entries</div>
                </div>
              </div>
            </div>            {/* Logo Management */}
            <div data-section="logo-management" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Logo Management</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Update Logo</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select 
                    value={selectedSoftwareForLogo}
                    onChange={(e) => setSelectedSoftwareForLogo(e.target.value)}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white"
                  >
                    <option value="">Select software...</option>
                    {[...allPmsSoftware, ...allXraySoftware].map(software => (
                      <option key={software.id} value={software.id}>
                        {software.name} ({software.company})
                      </option>
                    ))}
                  </select>
                  <input
                    type="url"
                    placeholder="New logo URL"
                    value={newLogoUrl}
                    onChange={(e) => setNewLogoUrl(e.target.value)}
                    className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button 
                    onClick={updateLogo}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Update Logo
                  </button>
                </div>
              </div>

              {/* Logo Updates Summary */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-900 dark:text-white">Recent Logo Updates ({Object.keys(logoUpdates).length})</h5>
                {Object.keys(logoUpdates).length > 0 ? (
                  <div className="grid gap-2 max-h-32 overflow-y-auto">
                    {Object.entries(logoUpdates).slice(0, 5).map(([softwareId, logoUrl]) => {
                      const software = [...allPmsSoftware, ...allXraySoftware].find(s => s.id === softwareId);
                      return (
                        <div key={softwareId} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <img src={logoUrl} alt="" className="w-8 h-8 object-contain rounded border" />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">
                                {software?.name || softwareId}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Custom logo</div>
                            </div>
                          </div>                          <button 
                            onClick={() => revertLogo(softwareId)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                          >
                            Revert
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No custom logo updates
                  </div>
                )}
              </div>
            </div>            {/* Data Export & Backup */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Data Export & Backup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    // Generate CSV data for the matrix
                    const csvData = `PMS Software,X-ray Software,Compatible,Status,Integration Modes,Notes\n` +
                      allPmsSoftware.flatMap(pms => 
                        allXraySoftware.map(xray => {
                          const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
                          const mostAdvancedModes = compatibility?.commonModes ? filterToMostAdvancedModes(compatibility.commonModes) : [];
                          return `"${pms.name}","${xray.name}",${compatibility?.compatible ? 'Yes' : 'No'},"${compatibility?.compatible ? 'Compatible' : 'Not Compatible'}","${mostAdvancedModes.join('; ')}","${compatibility?.recommendations?.join('; ') || ''}"`;
                        })
                      ).join('\n');
                    
                    const blob = new Blob([csvData], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `allisone-compatibility-matrix-${new Date().toISOString().split('T')[0]}.csv`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📤</span>
                  <span>Export Matrix (CSV)</span>
                </button>
                
                <button 
                  onClick={() => {
                    const exportData = {
                      exportDate: new Date().toISOString(),
                      pmsSoftware: allPmsSoftware,
                      xraySoftware: allXraySoftware,
                      matrixData: { pmsMatrix: pmsAllisoneMatrix, xrayMatrix: xrayAllisoneMatrix },
                      customData: { customSoftware, logoUpdates },
                      statistics: {
                        totalPms: allPmsSoftware.length,
                        totalXray: allXraySoftware.length,
                        compatiblePairs: allPmsSoftware.reduce((count, pms) => 
                          count + allXraySoftware.filter(xray => 
                            analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix)?.compatible
                          ).length
                        , 0)
                      }
                    };
                    
                    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `allisone-backup-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>�</span>
                  <span>Full Backup (JSON)</span>
                </button>
                  <button 
                  onClick={() => {
                    // Create a file input and trigger it
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          try {
                            const data = JSON.parse(e.target?.result as string);
                            if (confirm('This will replace current data. Continue?')) {
                              if (data.customSoftware) setCustomSoftware(data.customSoftware);
                              if (data.logoUpdates) setLogoUpdates(data.logoUpdates);
                              alert('Data imported successfully!');
                            }
                          } catch (error) {
                            alert('Invalid JSON file');
                          }
                        };
                        reader.readAsText(file);
                      }
                    };
                    input.click();
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📁</span>
                  <span>Import Data</span>
                </button>
                
                <button 
                  onClick={() => {
                    // Generate a comprehensive report
                    const compatibleCount = allPmsSoftware.reduce((count, pms) => {
                      return count + allXraySoftware.filter(xray => {
                        const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
                        return compatibility?.compatible;
                      }).length;
                    }, 0);
                    
                    const totalCombinations = allPmsSoftware.length * allXraySoftware.length;
                    const compatibilityRate = ((compatibleCount / totalCombinations) * 100).toFixed(1);
                    
                    const report = `Allisone+ Compatibility Report
Generated: ${new Date().toLocaleString()}

OVERVIEW:
- PMS Software: ${allPmsSoftware.length}
- X-ray Software: ${allXraySoftware.length}
- Total Combinations: ${totalCombinations}
- Compatible Combinations: ${compatibleCount}
- Compatibility Rate: ${compatibilityRate}%

CUSTOM DATA:
- Custom Software Entries: ${customSoftware.length}
- Logo Updates: ${Object.keys(logoUpdates).length}

STATUS BREAKDOWN (PMS):
${Object.entries(
  Object.values(pmsAllisoneMatrix).reduce((acc: any, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {})
).map(([status, count]) => `- ${status}: ${count}`).join('\n')}

STATUS BREAKDOWN (X-ray):
${Object.entries(
  Object.values(xrayAllisoneMatrix).reduce((acc: any, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {})
).map(([status, count]) => `- ${status}: ${count}`).join('\n')}`;
                    
                    const blob = new Blob([report], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `allisone-report-${new Date().toISOString().split('T')[0]}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📋</span>
                  <span>Generate Report</span>
                </button>
              </div>
            </div>            {/* Bulk Operations */}
            <div data-section="bulk-operations" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Bulk Operations</h3>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600 dark:text-yellow-400">⚠️</span>
                  <span className="text-yellow-800 dark:text-yellow-300 font-medium">Warning: Bulk operations cannot be undone</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    if (confirm('This will clear all custom software entries. Are you sure?')) {
                      localStorage.removeItem('dental-custom-software');
                      window.location.reload();
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Clear Custom Software</span>
                </button>
                
                <button 
                  onClick={() => {
                    if (confirm('This will reset all logo customizations. Are you sure?')) {
                      localStorage.removeItem('dental-logo-updates');
                      window.location.reload();
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🖼️</span>
                  <span>Reset All Logos</span>
                </button>
                  <button 
                  onClick={() => {
                    // Placeholder for server sync functionality
                    alert('Server sync functionality would be implemented here.\n\nThis would:\n- Upload local changes to server\n- Download latest compatibility data\n- Sync logo updates\n- Merge conflict resolution');
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🔄</span>
                  <span>Sync with Server</span>
                </button>
                
                <button 
                  onClick={() => {
                    const dataSize = JSON.stringify(localStorage).length;
                    const dataSizeKB = (dataSize / 1024).toFixed(2);
                    alert(`Local storage usage: ${dataSizeKB} KB\n\nCustom software entries: ${customSoftware.length}\nLogo updates: ${Object.keys(logoUpdates).length}`);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>�</span>
                  <span>Storage Info</span>
                </button>
              </div>
            </div>

            {/* System Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">PMS</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">PMS Software</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{allPmsSoftware.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">X-ray</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">X-ray Software</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{allXraySoftware.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">⚡</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Compatible Pairs</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {allPmsSoftware.reduce((count, pms) => 
                          count + allXraySoftware.filter(xray => 
                            analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix)?.compatible
                          ).length
                        , 0)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">%</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {Math.round((allPmsSoftware.reduce((count, pms) => 
                          count + allXraySoftware.filter(xray => 
                            analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix)?.compatible
                          ).length
                        , 0) / (allPmsSoftware.length * allXraySoftware.length)) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Shortcuts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setCurrentView('matrix')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🗂️</span>
                  <span>View Full Matrix</span>
                </button>
                <button 
                  onClick={() => setCurrentView('checker')}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🔍</span>
                  <span>Test Compatibility</span>
                </button>
                <button 
                  onClick={() => setCurrentView('tools')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🛠️</span>
                  <span>Advanced Tools</span>
                </button>
              </div>
            </div>

            {/* Version Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Information</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Application:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">Allisone+ Compatibility Matrix</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Version:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">1.0.0</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Browser:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">{navigator.userAgent.split(' ')[0]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}        {/* Tools View */}
        {currentView === 'tools' && (
          <div className="space-y-6">
            {/* Tools Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Compatibility Tools</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Analytical tools and utilities for the Allisone+ compatibility system
              </p>
            </div>

            {/* Quick Analysis Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Compatibility Rate Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compatibility Rate</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Overall system compatibility</p>
                  </div>
                </div>
                {(() => {
                  const totalCombinations = allPmsSoftware.length * allXraySoftware.length;
                  const compatibleCount = allPmsSoftware.reduce((count, pms) => {
                    return count + allXraySoftware.filter(xray => {
                      const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
                      return compatibility?.compatible;
                    }).length;
                  }, 0);
                  const rate = totalCombinations > 0 ? ((compatibleCount / totalCombinations) * 100).toFixed(1) : '0';
                  
                  return (
                    <div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{rate}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {compatibleCount} of {totalCombinations} combinations
                      </div>
                      <div className="mt-3 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${rate}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Coverage Analysis */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Coverage Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">PMS & X-ray coverage</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">PMS with Gateway</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {Object.values(pmsAllisoneMatrix).filter(p => p.allisoneMode.includes('Gateway')).length}
                      </span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ 
                          width: `${(Object.values(pmsAllisoneMatrix).filter(p => p.allisoneMode.includes('Gateway')).length / allPmsSoftware.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">X-ray Production Ready</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {Object.values(xrayAllisoneMatrix).filter(x => x.status === 'Done').length}
                      </span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ 
                          width: `${(Object.values(xrayAllisoneMatrix).filter(x => x.status === 'Done').length / allXraySoftware.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integration Modes */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🔗</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Integration Modes</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Available connection types</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { mode: 'Gateway', color: 'bg-purple-500' },
                    { mode: 'V1 + Image', color: 'bg-blue-500' },
                    { mode: 'V1 without Image', color: 'bg-green-500' },
                    { mode: 'A+ v2 - Bridge Mode', color: 'bg-orange-500' }
                  ].map(({ mode, color }) => {
                    const count = Object.values(pmsAllisoneMatrix).filter(p => p.allisoneMode.includes(mode)).length +
                                 Object.values(xrayAllisoneMatrix).filter(x => x.allisoneMode.includes(mode)).length;
                    return (
                      <div key={mode} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 ${color} rounded-full`}></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{mode}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Export & Analysis Tools */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Export & Analysis Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => {
                    // Generate CSV data for the matrix
                    const csvData = `PMS Software,X-ray Software,Compatible,Status,Integration Modes,Notes\n` +
                      allPmsSoftware.flatMap(pms => 
                        allXraySoftware.map(xray => {
                          const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
                          const mostAdvancedModes = compatibility?.commonModes ? filterToMostAdvancedModes(compatibility.commonModes) : [];
                          return `"${pms.name}","${xray.name}",${compatibility?.compatible ? 'Yes' : 'No'},"${compatibility?.compatible ? 'Compatible' : 'Not Compatible'}","${mostAdvancedModes.join('; ')}","${compatibility?.recommendations?.join('; ') || ''}"`;
                        })
                      ).join('\n');
                    
                    const blob = new Blob([csvData], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `allisone-matrix-${new Date().toISOString().split('T')[0]}.csv`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📤</span>
                  <span>Export CSV</span>
                </button>

                <button 
                  onClick={() => {
                    // Generate compatibility report
                    const compatibleCount = allPmsSoftware.reduce((count, pms) => {
                      return count + allXraySoftware.filter(xray => {
                        const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsAllisoneMatrix, xrayAllisoneMatrix);
                        return compatibility?.compatible;
                      }).length;
                    }, 0);
                    
                    const totalCombinations = allPmsSoftware.length * allXraySoftware.length;
                    const compatibilityRate = ((compatibleCount / totalCombinations) * 100).toFixed(1);
                    
                    const report = `Allisone+ Compatibility Analysis Report
Generated: ${new Date().toLocaleString()}

OVERVIEW:
- PMS Software: ${allPmsSoftware.length}
- X-ray Software: ${allXraySoftware.length}
- Total Combinations: ${totalCombinations}
- Compatible Combinations: ${compatibleCount}
- Compatibility Rate: ${compatibilityRate}%

PMS STATUS BREAKDOWN:
${Object.entries(
  Object.values(pmsAllisoneMatrix).reduce((acc: any, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {})
).map(([status, count]) => `- ${status}: ${count}`).join('\n')}

X-RAY STATUS BREAKDOWN:
${Object.entries(
  Object.values(xrayAllisoneMatrix).reduce((acc: any, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1;
    return acc;
  }, {})
).map(([status, count]) => `- ${status}: ${count}`).join('\n')}`;
                    
                    const blob = new Blob([report], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `allisone-report-${new Date().toISOString().split('T')[0]}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📋</span>
                  <span>Generate Report</span>
                </button>

                <button 
                  onClick={() => {
                    // Print the current matrix view
                    window.print();
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🖨️</span>
                  <span>Print Matrix</span>
                </button>

                <button 
                  onClick={() => {
                    // Show system info
                    const dataSize = JSON.stringify(localStorage).length;
                    const dataSizeKB = (dataSize / 1024).toFixed(2);
                    alert(`System Information:
• Local storage usage: ${dataSizeKB} KB
• Custom software entries: ${customSoftware.length}
• Logo updates: ${Object.keys(logoUpdates).length}
• PMS software count: ${allPmsSoftware.length}
• X-ray software count: ${allXraySoftware.length}
• Matrix generation: ${new Date().toLocaleString()}`);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>ℹ️</span>
                  <span>System Info</span>
                </button>
              </div>
            </div>

            {/* Quick Filters & Views */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Analysis Views</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button 
                  onClick={() => {
                    // Show only production ready combinations
                    const prodReady = allPmsSoftware.filter(pms => {
                      const pmsData = pmsAllisoneMatrix[pms.id];
                      return pmsData?.status === 'In Prod';
                    }).map(pms => pms.name);
                    
                    alert(`Production Ready PMS (${prodReady.length}):\n${prodReady.join('\n')}`);
                  }}
                  className="bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg text-sm transition-colors border border-green-300 dark:border-green-700"
                >
                  <div className="font-medium">Production Ready</div>
                  <div className="text-xs mt-1">View deployed integrations</div>
                </button>

                <button 
                  onClick={() => {
                    // Show gateway-enabled PMS
                    const gatewayPms = allPmsSoftware.filter(pms => {
                      const pmsData = pmsAllisoneMatrix[pms.id];
                      return pmsData?.allisoneMode?.includes('Gateway');
                    }).map(pms => pms.name);
                    
                    alert(`Gateway-Enabled PMS (${gatewayPms.length}):\n${gatewayPms.join('\n')}`);
                  }}
                  className="bg-purple-100 dark:bg-purple-900/20 hover:bg-purple-200 dark:hover:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-3 rounded-lg text-sm transition-colors border border-purple-300 dark:border-purple-700"
                >
                  <div className="font-medium">Gateway Support</div>
                  <div className="text-xs mt-1">Advanced integration mode</div>
                </button>

                <button 
                  onClick={() => {
                    // Show X-ray software by status
                    const statusGroups = Object.values(xrayAllisoneMatrix).reduce((acc: any, entry, index) => {
                      const xray = allXraySoftware[index];
                      if (!acc[entry.status]) acc[entry.status] = [];
                      if (xray) acc[entry.status].push(xray.name);
                      return acc;
                    }, {});
                    
                    const statusReport = Object.entries(statusGroups)
                      .map(([status, names]: [string, any]) => `${status}: ${names.length}\n${names.join(', ')}`)
                      .join('\n\n');
                    
                    alert(`X-ray Software by Status:\n\n${statusReport}`);
                  }}
                  className="bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-3 rounded-lg text-sm transition-colors border border-blue-300 dark:border-blue-700"
                >
                  <div className="font-medium">X-ray Status</div>
                  <div className="text-xs mt-1">View by integration status</div>
                </button>
              </div>
            </div>
          </div>
        )}
                        totalCombinations: allPmsSoftware.length * allXraySoftware.length
                      }
                    };
                    
                    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `allisone-complete-data-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>💾</span>
                  <span>Export All Data (JSON)</span>
                </button>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">PMS</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">PMS Software</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{allPmsSoftware.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">X-ray</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">X-ray Software</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{allXraySoftware.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">⚡</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Combinations</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{allPmsSoftware.length * allXraySoftware.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">📊</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Custom Software</p>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">{customSoftware.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Shortcuts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => setCurrentView('matrix')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🗂️</span>
                  <span>View Full Matrix</span>
                </button>
                <button 
                  onClick={() => setCurrentView('checker')}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🔍</span>
                  <span>Test Compatibility</span>
                </button>
              </div>
            </div>

            {/* Local Storage Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Local Data Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    if (confirm('This will clear all custom software and logo updates. Are you sure?')) {
                      localStorage.removeItem('dental-custom-software');
                      localStorage.removeItem('dental-logo-updates');
                      window.location.reload();
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>🗑️</span>
                  <span>Clear Local Data</span>
                </button>
                <button 
                  onClick={() => {
                    const dataSize = JSON.stringify(localStorage).length;
                    const dataSizeKB = (dataSize / 1024).toFixed(2);
                    alert(`Local storage usage: ${dataSizeKB} KB\n\nCustom software entries: ${customSoftware.length}\nLogo updates: ${Object.keys(logoUpdates).length}`);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📊</span>
                  <span>View Storage Info</span>
                </button>
              </div>
            </div>

            {/* Version Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Information</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Application:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">Allisone+ Compatibility Matrix</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Version:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">1.0.0</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Browser:</span>
                    <div className="font-semibold text-gray-900 dark:text-white">{navigator.userAgent.split(' ')[0]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}</main>

      <ToastContainer />

      {/* Compatibility Details Modal */}
      {modalOpen && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Compatibility Details
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {modalData.pms.name} + {modalData.xray.name}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Software Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* PMS Software */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {modalData.pms.logo && (
                      <img
                        src={modalData.pms.logo}
                        alt={`${modalData.pms.name} logo`}
                        className="w-10 h-10 object-contain rounded border border-gray-200 dark:border-gray-600 bg-white p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {modalData.pms.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {modalData.pms.company}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Type: </span>
                      <span className="text-gray-900 dark:text-white">Practice Management System</span>
                    </div>
                    {modalData.pms.description && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Description: </span>
                        <span className="text-gray-900 dark:text-white">{modalData.pms.description}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* X-ray Software */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {modalData.xray.logo && (
                      <img
                        src={modalData.xray.logo}
                        alt={`${modalData.xray.name} logo`}
                        className="w-10 h-10 object-contain rounded border border-gray-200 dark:border-gray-600 bg-white p-1"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {modalData.xray.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {modalData.xray.company}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Type: </span>
                      <span className="text-gray-900 dark:text-white">X-ray/Imaging Software</span>
                    </div>
                    {modalData.xray.description && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Description: </span>
                        <span className="text-gray-900 dark:text-white">{modalData.xray.description}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Compatibility Status */}
              <div className={`p-4 rounded-lg border-2 mb-6 ${
                modalData.compatibility?.compatible 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
              }`}>
                <div className={`flex items-center space-x-3 mb-3 ${
                  modalData.compatibility?.compatible ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    modalData.compatibility?.compatible ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    <span className="text-white font-bold text-sm">
                      {modalData.compatibility?.compatible ? '✓' : '✗'}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold">
                    {modalData.compatibility?.compatible ? 'Compatible via Allisone+' : 'Not Compatible with Allisone+'}
                  </h4>
                </div>
                
                {modalData.compatibility?.compatible && modalData.compatibility.commonModes.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Available Integration Modes:</h5>                    <div className="flex flex-wrap gap-2">
                      {filterToMostAdvancedModes(modalData.compatibility.commonModes).map((mode: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Compatibility Information */}
              {modalData.compatibility && (
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* PMS Compatibility Details */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {modalData.pms.name} → Allisone+
                    </h5>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Status: </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          modalData.compatibility.pmsCompatibility.status === 'In Prod' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : modalData.compatibility.pmsCompatibility.status === 'In Test'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {modalData.compatibility.pmsCompatibility.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Integration Modes: </span>                        <div className="mt-1">
                          {filterToMostAdvancedModes(modalData.compatibility.pmsCompatibility.allisoneMode).map((mode: string, index: number) => (
                            <span key={index} className="inline-block mr-2 mb-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs">
                              {mode}
                            </span>
                          ))}
                        </div>
                      </div>
                      {modalData.compatibility.pmsCompatibility.notes && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">Notes: </span>
                          <p className="text-sm text-gray-900 dark:text-white mt-1">{modalData.compatibility.pmsCompatibility.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* X-ray Compatibility Details */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {modalData.xray.name} → Allisone+
                    </h5>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Status: </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          modalData.compatibility.xrayCompatibility.status === 'Done' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : modalData.compatibility.xrayCompatibility.status === 'Planned'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {modalData.compatibility.xrayCompatibility.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Integration Modes: </span>                        <div className="mt-1">
                          {filterToMostAdvancedModes(modalData.compatibility.xrayCompatibility.allisoneMode).map((mode: string, index: number) => (
                            <span key={index} className="inline-block mr-2 mb-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs">
                              {mode}
                            </span>
                          ))}
                        </div>
                      </div>
                      {modalData.compatibility.xrayCompatibility.supportedVersions && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">Supported Versions: </span>
                          <span className="text-sm text-gray-900 dark:text-white">{modalData.compatibility.xrayCompatibility.supportedVersions}</span>
                        </div>
                      )}
                      {modalData.compatibility.xrayCompatibility.notes && (
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">Notes: </span>
                          <p className="text-sm text-gray-900 dark:text-white mt-1">{modalData.compatibility.xrayCompatibility.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {modalData.compatibility?.recommendations && modalData.compatibility.recommendations.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-6">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Recommendations:</h5>
                  <ul className="space-y-1">
                    {modalData.compatibility.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm text-blue-800 dark:text-blue-300">• {rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setSelectedPMS(modalData.pms.id);
                    setSelectedXray(modalData.xray.id);
                    setCurrentView('checker');
                    setModalOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Test This Combination
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Export Details
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
