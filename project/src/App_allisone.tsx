import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  pmsAllisoneMatrix, 
  xrayAllisoneMatrix, 
  pmsSoftware as basePmsSoftware, 
  xraySoftware as baseXraySoftware,
  getCompatibilityRequirements
} from './data/allisoneCompatibility';
import { analyzeAllisoneCompatibility } from './utils/allisoneAnalysis';
import { useCompatibilityData, useGitHubStorage } from './hooks/useGitHubStorage';
import { CustomSoftware } from './types/software';
import { PMSCompatibilityStatus, XrayCompatibilityStatus } from './types/allisone';
import { getDocumentationUrl, getDocumentationTitle, getDocumentationDescription } from './data/documentationUrls';
import { BUILD_INFO } from './utils/buildInfo';
import Header from './components/Header';
import SoftwareSelector from './components/SoftwareSelector';
import EditSoftwareModal from './components/EditSoftwareModal';
import EditCompatibilityModal from './components/EditCompatibilityModal';
import EnhancedLogo from './components/EnhancedLogo';
import NotionEmbed from './components/NotionEmbed';
import DeploymentInfo from './components/DeploymentInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CheckCircleIcon, XCircleIcon, InformationCircleIcon, CloudIcon, BeakerIcon, XMarkIcon,
  TrashIcon, PencilIcon, PlusCircleIcon, LightBulbIcon, CheckIcon, CloudArrowUpIcon,
  ShieldCheckIcon, ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';


type ViewType = 'checker' | 'matrix' | 'admin';

// Status Indicator for Matrix - Optimized for performance
const StatusIndicator = React.memo(({ compatibility, onCellClick, onEditClick }: { 
  compatibility: any, 
  onCellClick: () => void,
  onEditClick: (e: React.MouseEvent) => void 
}) => {
  // Compute all the styling properties based on the compatibility
  const { 
    bgColor, 
    textColor, 
    text, 
    subText, 
    Icon, 
    ringColor, 
    borderColor, 
    progressValue 
  } = useMemo(() => {
    let result = {
      bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/30',
      textColor: 'text-gray-800 dark:text-gray-200',
      text: 'Unknown',
      subText: '',
      Icon: InformationCircleIcon,
      ringColor: 'focus:ring-gray-400',
      borderColor: 'border-gray-300 dark:border-gray-600',
      progressValue: 0
    };
    
    if (compatibility) {
      const pmsStatus = compatibility.pmsCompatibility?.status;
      const xrayStatus = compatibility.xrayCompatibility?.status;
      const mode = compatibility.mode || 'Unknown';

      if (compatibility.compatible) {
          if (pmsStatus === 'In Prod' && xrayStatus === 'Done') {
              result = {
                bgColor: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/20',
                textColor: 'text-green-700 dark:text-green-200',
                text: 'Production',
                subText: mode,
                Icon: CheckCircleIcon,
                ringColor: 'focus:ring-green-500',
                borderColor: 'border-green-300 dark:border-green-700',
                progressValue: 100
              };
          } else if (pmsStatus === 'In Test' || pmsStatus === 'Gateway Testing' || pmsStatus === 'On Dev') {
              result = {
                bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/20',
                textColor: 'text-yellow-700 dark:text-yellow-200',
                text: 'Testing',
                subText: mode,
                Icon: BeakerIcon,
                ringColor: 'focus:ring-yellow-500',
                borderColor: 'border-yellow-300 dark:border-yellow-700',
                progressValue: 75
              };
          } else if (pmsStatus === 'Planned' || xrayStatus === 'Planned') {
              result = {
                bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20',
                textColor: 'text-blue-700 dark:text-blue-200',
                text: 'Planned',
                subText: mode,
                Icon: CloudIcon,
                ringColor: 'focus:ring-blue-500',
                borderColor: 'border-blue-300 dark:border-blue-700',
                progressValue: 30
              };
          } else { // Not Started
              result = {
                bgColor: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/30',
                textColor: 'text-gray-600 dark:text-gray-300',
                text: 'Not Started',
                subText: mode,
                Icon: InformationCircleIcon,
                ringColor: 'focus:ring-gray-500',
                borderColor: 'border-gray-300 dark:border-gray-600',
                progressValue: 10
              };
          }
      } else {
        result = {
          bgColor: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-800/20',
          textColor: 'text-red-700 dark:text-red-200',
          text: 'Incompatible',
          subText: '',
          Icon: XCircleIcon,
          ringColor: 'focus:ring-red-500',
          borderColor: 'border-red-300 dark:border-red-700',
          progressValue: 0
        };
      }
    }
    
    return result;
  }, [compatibility]);

  return (
    <button
      onClick={onCellClick}
      className={`relative flex flex-col items-center w-full h-full p-3 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${bgColor} ${textColor} ${ringColor} ${borderColor} group`}
      aria-label={text}
    >
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={onEditClick} 
          className="p-1 rounded-full bg-white/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          aria-label="Edit compatibility"
        >
          <PencilIcon className="h-3.5 w-3.5" />
        </button>
      </div>
      
      <div className="flex items-center justify-center mb-1">
        <Icon className="h-5 w-5 flex-shrink-0 mr-1.5" />
        <span className="font-semibold text-sm truncate">{text}</span>
      </div>
      
      {subText && (
        <span className="text-xs opacity-80 truncate">{subText}</span>
      )}
      
      {progressValue > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden">
          <div 
            className={`h-full ${
              progressValue === 100 ? 'bg-green-500 dark:bg-green-600' : 
              progressValue >= 75 ? 'bg-yellow-500 dark:bg-yellow-600' :
              progressValue >= 30 ? 'bg-blue-500 dark:bg-blue-600' :
              'bg-gray-400 dark:bg-gray-500'
            }`} 
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}
    </button>
  );
}, (prevProps, nextProps) => {
  // Optimize by skipping re-renders if the compatibility ID hasn't changed
  if (!prevProps.compatibility || !nextProps.compatibility) return false;
  
  // More detailed comparison to prevent unnecessary re-renders
  const prevComp = prevProps.compatibility;
  const nextComp = nextProps.compatibility;
  
  return (
    prevComp.pms === nextComp.pms &&
    prevComp.xray === nextComp.xray &&
    prevComp.compatible === nextComp.compatible &&
    prevComp.pmsCompatibility?.status === nextComp.pmsCompatibility?.status &&
    prevComp.xrayCompatibility?.status === nextComp.xrayCompatibility?.status &&
    prevComp.mode === nextComp.mode &&
    JSON.stringify(prevComp.commonModes) === JSON.stringify(nextComp.commonModes)
  );
});


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
  
  // Notion documentation modal state
  const [notionModalOpen, setNotionModalOpen] = useState(false);
  const [notionModalData, setNotionModalData] = useState<{
    url: string;
    title: string;
    description: string;
  } | null>(null);
  // Use GitHub storage for compatibility matrices
  const { 
    pmsMatrix, 
    xrayMatrix, 
    setPmsMatrix, 
    setXrayMatrix, 
    saveCompatibilityEntry,
    syncStatus: gitHubSyncStatus,
    syncMatrices
  } = useCompatibilityData();

  // Use GitHub storage for PMS software list
  const pmsSoftwareStorage = useGitHubStorage<CustomSoftware[]>({
    key: 'all-pms-software-v3', // Changed key to force refresh and ensure complete data
    initialValue: basePmsSoftware.map(s => ({ ...s, type: 'pms', status: pmsAllisoneMatrix[s.id]?.status || 'Not Started' })),
    type: 'pms-software'
  });
  
  // Ensure we always have at least the complete local data set (33 PMS systems)
  const pmsSoftwareList = useMemo(() => {
    const githubData = pmsSoftwareStorage.value;
    const localData = basePmsSoftware.map(s => ({ ...s, type: 'pms' as const, status: pmsAllisoneMatrix[s.id]?.status || 'Not Started' as const }));
    
    // If GitHub data has fewer entries than local data, use local data
    if (!githubData || githubData.length < localData.length) {
      console.log(`Using local PMS data (${localData.length} systems) instead of GitHub data (${githubData?.length || 0} systems)`);
      return localData;
    }
    return githubData;
  }, [pmsSoftwareStorage.value]);
  
  const setPmsSoftwareList = pmsSoftwareStorage.setValue;

  // Use GitHub storage for X-ray software list
  const xraySoftwareStorage = useGitHubStorage<CustomSoftware[]>({
    key: 'all-xray-software-v3', // Changed key to force refresh and ensure complete data
    initialValue: baseXraySoftware.map(s => ({ ...s, type: 'xray', status: xrayAllisoneMatrix[s.id]?.status || 'Not Started' })),
    type: 'xray-software'
  });
  
  // Ensure we always have at least the complete local data set (22 X-ray systems)
  const xraySoftwareList = useMemo(() => {
    const githubData = xraySoftwareStorage.value;
    const localData = baseXraySoftware.map(s => ({ ...s, type: 'xray' as const, status: xrayAllisoneMatrix[s.id]?.status || 'Not Started' as const }));
    
    // If GitHub data has fewer entries than local data, use local data
    if (!githubData || githubData.length < localData.length) {
      console.log(`Using local X-ray data (${localData.length} systems) instead of GitHub data (${githubData?.length || 0} systems)`);
      return localData;
    }
    return githubData;
  }, [xraySoftwareStorage.value]);
  
  const setXraySoftwareList = xraySoftwareStorage.setValue;
  
  // Use GitHub storage for logo updates
  const logoStorage = useGitHubStorage<Record<string, string>>({
    key: 'dental-logo-updates',
    initialValue: {},
    type: 'logo-updates'
  });
  const logoUpdates = logoStorage.value;
  const setLogoUpdates = logoStorage.setValue;

  // Admin modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState<CustomSoftware | null>(null);
  const [editingCompatibility, setEditingCompatibility] = useState<{pms: CustomSoftware, xray: CustomSoftware} | null>(null);

  const pmsStatusOptions: PMSCompatibilityStatus[] = ['In Prod', 'In Test', 'Planned', 'Not Started', 'On Dev', 'Gateway Testing'];
  const xrayStatusOptions: XrayCompatibilityStatus[] = ['Done', 'Planned', 'Not Started', 'On Dev'];

  const handleEditClick = (software: CustomSoftware | null) => {
    setEditingSoftware(software);
    setIsEditModalOpen(true);
    setEditingCompatibility(null); // Reset compatibility editing
  };

  const handleEditCompatibility = (pms: CustomSoftware, xray: CustomSoftware, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering the cell click
    }
    setEditingCompatibility({ pms, xray });
    setModalData({
      pms,
      xray,
      compatibility: analyzeAllisoneCompatibility(pms.id, xray.id, pmsMatrix, xrayMatrix)
    });
    setModalOpen(true);
  };

  const handleSaveSoftware = (softwareToSave: CustomSoftware) => {
    const isNew = !softwareToSave.id;
    const listUpdater = softwareToSave.type === 'pms' ? setPmsSoftwareList : setXraySoftwareList;
    const list = softwareToSave.type === 'pms' ? pmsSoftwareList : xraySoftwareList;
    
    const id = isNew 
      ? `${softwareToSave.type}-${softwareToSave.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
      : softwareToSave.id;

    const newSoftware = { ...softwareToSave, id };

    // Update the software list
    if (isNew) {
      listUpdater([...list, newSoftware]);
    } else {
      listUpdater(list.map(s => (s.id === id ? newSoftware : s)));
    }

    // Update logo for edits
    if (!isNew && newSoftware.logo) {
      setLogoUpdates({ ...logoUpdates, [id]: newSoftware.logo as string });
    }

  // Update the compatibility matrix for both new and edited software
    if (newSoftware.type === 'pms') {
      setPmsMatrix({
        ...pmsMatrix,
        [id]: {
          ...pmsMatrix[id],
          // A PMS is compatible if it has a status that's not "Not Started" or if it has any modes defined
          compatible: pmsMatrix[id]?.compatible || 
                     newSoftware.status !== 'Not Started' || 
                     (pmsMatrix[id]?.allisoneMode && pmsMatrix[id]?.allisoneMode.length > 0),
          allisoneMode: pmsMatrix[id]?.allisoneMode || [],
          status: newSoftware.status as PMSCompatibilityStatus || 'Not Started',
        }
      });
    } else { // xray
      setXrayMatrix({
        ...xrayMatrix,
        [id]: {
          ...xrayMatrix[id],
          // X-ray systems are considered compatible if they have a status other than "Not Started"
          // or if they have integration modes defined
          compatible: xrayMatrix[id]?.compatible || 
                     newSoftware.status !== 'Not Started' || 
                     (xrayMatrix[id]?.allisoneMode && xrayMatrix[id]?.allisoneMode.length > 0),
          allisoneMode: xrayMatrix[id]?.allisoneMode || [],
          status: newSoftware.status as XrayCompatibilityStatus || 'Not Started',
        }
      });
    }

    toast.success(`${newSoftware.name} ${isNew ? 'added' : 'updated'} successfully!`);
    setIsEditModalOpen(false);
    setEditingSoftware(null);
  };

  const handleDeleteSoftware = (softwareId: string, type: 'pms' | 'xray') => {
    if (window.confirm('Are you sure you want to delete this software?')) {
      if (type === 'pms') {
        setPmsSoftwareList(pmsSoftwareList.filter(s => s.id !== softwareId));
      } else {
        setXraySoftwareList(xraySoftwareList.filter(s => s.id !== softwareId));
      }
      const newLogoUpdates = { ...logoUpdates };
      delete newLogoUpdates[softwareId];
      setLogoUpdates(newLogoUpdates);
      toast.info('Software deleted.');
    }
  };
  const handleSaveCompatibility = async (data: {
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
  }) => {
    // Show loading toast
    const toastId = toast.loading("Saving compatibility data...");
    
    try {
      // Use GitHub storage hook to save compatibility data (this will update local state too)
      const success = await saveCompatibilityEntry(data);
      
      if (success) {
        // Close modal and reset editing state
        setModalOpen(false);
        setEditingCompatibility(null);
        
        // Update the loading toast to success
        toast.update(toastId, { 
          render: "Compatibility data saved and synced with GitHub!", 
          type: "success", 
          isLoading: false,
          autoClose: 5000
        });
      } else {
        // Update toast to show error
        toast.update(toastId, { 
          render: "Saved locally but failed to sync with GitHub. Changes will sync later.", 
          type: "warning", 
          isLoading: false,
          autoClose: 5000
        });
        
        // Close modal anyway as data was saved locally
        setModalOpen(false);
        setEditingCompatibility(null);
      }
    } catch (error) {
      console.error("Error saving compatibility data:", error);
      
      // Update toast to show error
      toast.update(toastId, { 
        render: "Error saving compatibility data", 
        type: "error", 
        isLoading: false,
        autoClose: 5000
      });
    }
  };

  // Merge base data with custom data
  const allPmsSoftware = useMemo(() => {
    return pmsSoftwareList.map(pms => ({
      ...pms,
      logo: logoUpdates[pms.id] || pms.logo
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [pmsSoftwareList, logoUpdates]);

  const allXraySoftware = useMemo(() => {
    return xraySoftwareList.map(xray => ({
      ...xray,
      logo: logoUpdates[xray.id] || xray.logo
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, [xraySoftwareList, logoUpdates]);

  const pmsCompatibilityResult = useMemo(() => {
    if (!selectedPMS) return null;
    const pmsData = pmsMatrix[selectedPMS];
    return pmsData || null;
  }, [selectedPMS, pmsMatrix]);

  // Check if selected PMS has gateway capabilities
  const selectedPmsData = useMemo(() => {
    return allPmsSoftware.find(pms => pms.id === selectedPMS);
  }, [selectedPMS, allPmsSoftware]);

  const hasGatewayIntegration = useMemo(() => {
    if (!selectedPmsData) return false;
    const pmsMatrixData = pmsMatrix[selectedPMS];
    return pmsMatrixData?.allisoneMode?.includes('Gateway') || pmsMatrixData?.allisoneMode?.includes('API Gateway');
  }, [selectedPMS, pmsMatrix]);  const handleCellClick = (pms: any, xray: any) => {
    const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsMatrix, xrayMatrix);
    // Ensure mode is properly set for display in the modal
    if (compatibility.compatible && compatibility.commonModes && compatibility.commonModes.length > 0) {
      compatibility.mode = compatibility.commonModes[0];
    }
    setModalData({ pms, xray, compatibility });
    setEditingCompatibility(null); // Viewing mode only
    setModalOpen(true);
  };

  const handleDocumentClick = (softwareId: string, type?: 'pms' | 'xray') => {
    // Determine type if not provided
    let softwareType = type;
    if (!softwareType) {
      // Check if it's a PMS software
      if (allPmsSoftware.find(s => s.id === softwareId)) {
        softwareType = 'pms';
      } else if (allXraySoftware.find(s => s.id === softwareId)) {
        softwareType = 'xray';
      } else {
        return; // Unknown software type
      }
    }
    
    const docUrl = getDocumentationUrl(softwareId, softwareType);
    if (docUrl) {
      const software = softwareType === 'pms' 
        ? allPmsSoftware.find(s => s.id === softwareId) 
        : allXraySoftware.find(s => s.id === softwareId);
      const title = getDocumentationTitle(software?.name || softwareId, softwareType);
      const description = getDocumentationDescription(softwareType);
      setNotionModalData({ url: docUrl, title, description });
      setNotionModalOpen(true);
    }
  };

  const compatibilityResult = useMemo(() => {
    if (!selectedPMS || !selectedXray) return null;
    return getCompatibilityRequirements(selectedPMS, selectedXray, pmsMatrix, xrayMatrix);
  }, [selectedPMS, selectedXray, pmsMatrix, xrayMatrix]);

      // Extract useMemo calls from JSX to maintain consistent hook order  
  const tableHeaders = useMemo(() => {
    return allXraySoftware.map((xray) => (
      <th key={xray.id} scope="col" className="p-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[150px]">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="h-10 w-10 flex items-center justify-center">
            <EnhancedLogo 
              src={xray.logo} 
              alt={xray.name} 
              className="h-10 w-10 object-contain" 
              size="medium"
              notionDocUrl={getDocumentationUrl(xray.id, 'xray')}
              onDocumentClick={() => handleDocumentClick(xray.id, 'xray')}
            />
          </div>
          <span className="block text-center font-semibold">{xray.name}</span>
        </div>
      </th>
    ));
  }, [allXraySoftware]);    // Optimize matrix rendering
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [visibleStartRow, setVisibleStartRow] = useState(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    // Enhanced scroll handler with debounce for better performance
    useEffect(() => {
      const handleScroll = () => {
        const table = tableContainerRef.current;
        if (!table) return;
        
        // Clear any existing timeout to debounce scroll events
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set a short timeout to avoid excessive updates
        scrollTimeoutRef.current = setTimeout(() => {
          const scrollTop = table.scrollTop;
          const rowHeight = 74; // Approximate height of each row in pixels (adjusted for more accuracy)
          const visibleHeight = table.clientHeight;
          
          // Calculate visible rows with buffer
          const visibleRows = Math.ceil(visibleHeight / rowHeight);
          const bufferRows = Math.min(5, Math.floor(visibleRows / 2)); // Buffer of 5 rows or half of visible rows
          
          // Calculate new start row with buffer
          const newStart = Math.max(0, Math.floor(scrollTop / rowHeight) - bufferRows);
          
          setVisibleStartRow(newStart);
        }, 50); // 50ms debounce
      };
      
      const tableContainer = tableContainerRef.current;
      if (tableContainer) {
        tableContainer.addEventListener('scroll', handleScroll);
        return () => {
          tableContainer.removeEventListener('scroll', handleScroll);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
        };
      }
    }, []);
    
    // Pre-compute compatibility data for only visible rows
    const tableRows = useMemo(() => {
      // Only compute for a limited number of rows at a time for performance
      const maxVisibleRows = 30; // Increased from 25 to 30 for better visibility
      const totalRows = allPmsSoftware.length;
      
      // Calculate which rows should be visible
      const startRow = Math.min(visibleStartRow, Math.max(0, totalRows - maxVisibleRows));
      const endRow = Math.min(totalRows, startRow + maxVisibleRows);
      
      // Only process visible rows
      return allPmsSoftware.slice(startRow, endRow).map((pms, idx) => {
        const rowIndex = startRow + idx;
        
        // Process all X-ray software instead of limiting to just 15 columns
        // This ensures all X-ray systems show up in the matrix
        const rowCompatibilities = allXraySoftware.map(xray => {
          const compatibility = analyzeAllisoneCompatibility(pms.id, xray.id, pmsMatrix, xrayMatrix);
          
          // Set mode properly for display in the StatusIndicator
          if (compatibility.compatible && compatibility.commonModes && compatibility.commonModes.length > 0) {
            // Use the most advanced integration mode for display
            compatibility.mode = compatibility.commonModes[0];
          }
          return { xray, compatibility };
        });
      
      return (
        <tr 
          key={pms.id} 
          className={`${rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/20'} hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200 group`}
        >
          <td className={`sticky left-0 z-10 ${rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/20'} group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/10 p-3 min-w-[250px] border-r border-gray-200 dark:border-gray-700 shadow-sm`}>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden">
                <EnhancedLogo 
                  src={pms.logo} 
                  alt={pms.name} 
                  className="h-8 w-8 object-contain" 
                  size="small"
                  notionDocUrl={getDocumentationUrl(pms.id, 'pms')}
                  onDocumentClick={() => handleDocumentClick(pms.id, 'pms')}
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">{pms.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{pms.company}</div>
              </div>
            </div>
          </td>
          {rowCompatibilities.map(({xray, compatibility}) => (
            <td key={xray.id} className="text-center align-middle">
              <div className="flex justify-center items-center h-full p-1">
                <StatusIndicator
                  compatibility={compatibility}
                  onCellClick={() => handleCellClick(pms, xray)}
                  onEditClick={(e) => {
                    e.stopPropagation();
                    handleEditCompatibility(pms, xray, e);
                  }}
                />
              </div>
            </td>
          ))}
        </tr>
      );
    });
  }, [allPmsSoftware, allXraySoftware, pmsMatrix, xrayMatrix, visibleStartRow]);

  useEffect(() => {
    document.documentElement.classList.add('h-full', 'w-full');
    document.body.classList.add('h-full', 'w-full', 'bg-gray-100', 'dark:bg-gray-950');
    const root = document.getElementById('root');
    if (root) {
      root.classList.add('h-full', 'w-full');
    }
  }, []);

  // Cache busting and deployment info
  useEffect(() => {
    // Add build timestamp to document for cache busting
    const buildTimestamp = BUILD_INFO.timestamp;
    document.documentElement.setAttribute('data-build', buildTimestamp.toString());
    
    // Add cache-busting meta tags
    const cacheBustMeta = document.createElement('meta');
    cacheBustMeta.httpEquiv = 'Cache-Control';
    cacheBustMeta.content = 'no-cache, no-store, must-revalidate';
    document.head.appendChild(cacheBustMeta);
    
    const pragmaMeta = document.createElement('meta');
    pragmaMeta.httpEquiv = 'Pragma';
    pragmaMeta.content = 'no-cache';
    document.head.appendChild(pragmaMeta);
    
    const expiresMeta = document.createElement('meta');
    expiresMeta.httpEquiv = 'Expires';
    expiresMeta.content = '0';
    document.head.appendChild(expiresMeta);
    
    // Log deployment info for debugging
    console.log('🚀 Allisone+ Enhanced Deployment Info:', {
      version: BUILD_INFO.version,
      buildDate: BUILD_INFO.buildDate,
      timestamp: BUILD_INFO.timestamp,
      gitCommit: BUILD_INFO.gitCommit,
      cacheBustParam: `v=${BUILD_INFO.timestamp}`
    });
    
    // Force refresh of any cached data
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('🧹 Browser caches cleared for fresh deployment');
      });
    }
    
    return () => {
      // Cleanup meta tags on unmount
      document.head.removeChild(cacheBustMeta);
      document.head.removeChild(pragmaMeta);
      document.head.removeChild(expiresMeta);
    };
  }, []);  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      {currentView === 'matrix' ? (
        <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-white dark:bg-gray-800">
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                <span>Compatibility Matrix</span>
                <span className="sm:ml-3 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit">
                  {allPmsSoftware.length} PMS × {allXraySoftware.length} X-ray
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                Showing all {allXraySoftware.length} X-ray systems. Scroll horizontally to view more.
              </p>
            </div>            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4 px-4 py-2 bg-white dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/20 border border-green-300 dark:border-green-700 rounded-md mr-2 flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Production</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/20 border border-yellow-300 dark:border-yellow-700 rounded-md mr-2 flex items-center justify-center">
                    <BeakerIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Testing</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 border border-blue-300 dark:border-blue-700 rounded-md mr-2 flex items-center justify-center">
                    <CloudIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Planned</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/40 dark:to-red-800/20 border border-red-300 dark:border-red-700 rounded-md mr-2 flex items-center justify-center">
                    <XCircleIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Incompatible</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-2 sm:px-0" ref={tableContainerRef}>
            <div className="min-w-full">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20">
                  <tr>
                    <th scope="col" className="sticky left-0 z-30 bg-gray-100 dark:bg-gray-900/80 p-2 sm:p-4 text-left text-xs sm:text-sm font-semibold text-gray-900 dark:text-white min-w-[180px] sm:min-w-[250px] shadow-sm">
                      PMS Software
                    </th>
                    {tableHeaders}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {tableRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-10 min-h-[calc(100vh-4rem)]">
        
        {currentView === 'checker' && (
          <div className="space-y-6 sm:space-y-8">
            <SoftwareSelector
              pmsSoftware={allPmsSoftware}
              xraySoftware={allXraySoftware}
              selectedPMS={selectedPMS}
              selectedXray={selectedXray}
              onPMSChange={(pmsId) => {
                setSelectedPMS(pmsId);
                setSelectedXray('');
              }}
              onXrayChange={setSelectedXray}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {selectedPMS && hasGatewayIntegration && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/70 dark:from-blue-900/30 dark:to-blue-800/10 p-4 rounded-lg shadow-sm border border-blue-200 dark:border-blue-700 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-800/30 flex items-center justify-center shadow-sm flex-shrink-0">
                    <CloudIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-300">Gateway Integration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {selectedPmsData?.name} supports gateway integration.
                    </p>
                  </div>
                </div>
              )}
              {selectedPMS && pmsCompatibilityResult?.compatible === true && (
                <div className="bg-gradient-to-r from-green-50 to-green-100/70 dark:from-green-900/30 dark:to-green-800/10 p-4 rounded-lg shadow-sm border border-green-200 dark:border-green-700 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center shadow-sm flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-300">PMS Compatible</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      This PMS is compatible with Allisone+. Select an X-ray system to check compatibility.
                    </p>
                  </div>
                </div>
              )}
              {selectedPMS && pmsCompatibilityResult?.compatible === false && (
                <div className="bg-gradient-to-r from-red-50 to-red-100/70 dark:from-red-900/30 dark:to-red-800/10 p-4 rounded-lg shadow-sm border border-red-200 dark:border-red-700 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center shadow-sm flex-shrink-0">
                    <XCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-300">PMS Not Compatible</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      This PMS is not yet compatible with Allisone+. Development may be planned or in progress.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {compatibilityResult && (
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">                <div className={`p-6 rounded-t-2xl ${compatibilityResult.compatible ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/10' : 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/10'} border-b border-gray-200 dark:border-gray-700`}>
                  <div className="flex items-center space-x-4">
                    {compatibilityResult.compatible ? 
                      <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center shadow-sm">
                        <CheckCircleIcon className="h-10 w-10 text-green-600 dark:text-green-400" />
                      </div> 
                      : 
                      <div className="h-14 w-14 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center shadow-sm">
                        <XCircleIcon className="h-10 w-10 text-red-600 dark:text-red-400" />
                      </div>
                    }
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {compatibilityResult.compatible ? 'Compatible' : 'Not Compatible'}
                        </h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">
                        {compatibilityResult.compatible
                          ? `Found ${compatibilityResult.options.length} integration option(s)`
                          : 'This combination is not currently compatible'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Documentation Links Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPMS && getDocumentationUrl(selectedPMS, 'pms') && (
                      <button
                        onClick={() => handleDocumentClick(selectedPMS, 'pms')}
                        className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 dark:bg-blue-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img 
                              src={selectedPmsData?.logo} 
                              alt={selectedPmsData?.name} 
                              className="h-6 w-6 object-contain" 
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <h5 className="font-medium text-blue-900 dark:text-blue-100">{selectedPmsData?.name} Documentation</h5>
                            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Guide d'installation et configuration</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                      </button>
                    )}
                    {selectedXray && getDocumentationUrl(selectedXray, 'xray') && (
                      <button
                        onClick={() => handleDocumentClick(selectedXray, 'xray')}
                        className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-purple-100 dark:bg-purple-800/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img 
                              src={allXraySoftware.find(x => x.id === selectedXray)?.logo} 
                              alt={allXraySoftware.find(x => x.id === selectedXray)?.name} 
                              className="h-6 w-6 object-contain" 
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <h5 className="font-medium text-purple-900 dark:text-purple-100">{allXraySoftware.find(x => x.id === selectedXray)?.name} Documentation</h5>
                            <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Guide d'installation et configuration</p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>

                  {compatibilityResult.compatible ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-3">Available Integration Options</h4>
                        <div className="space-y-4">
                          {compatibilityResult.options.map((option, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                              <div className="flex items-center mb-2">
                                <ShieldCheckIcon className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-3" />
                                <h5 className="font-bold text-md text-gray-900 dark:text-white">{option.name}</h5>
                                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${option.status === 'In Prod' || option.status === 'Done' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'}`}>
                                  {option.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 ml-9 mb-3">{option.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-9">
                                <div>
                                  <h6 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">PMS Mode</h6>
                                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{option.pmsMode}</p>
                                </div>
                                <div>
                                  <h6 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">X-ray Modes</h6>
                                  <div className="flex flex-wrap gap-1">
                                    {option.xrayModes.map((mode, i) => (
                                      <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                                        {mode}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {option.notes.length > 0 && (
                                <div className="mt-3 ml-9">
                                  <h6 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Notes</h6>
                                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                    {option.notes.map((note, i) => <li key={i}>{note}</li>)}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {compatibilityResult.notes.length > 0 && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-700 rounded-lg p-5 shadow-sm">
                          <div className="flex items-center mb-3">
                            <LightBulbIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                            <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-lg">Additional Information</h4>
                          </div>
                          <ul className="space-y-2">
                            {compatibilityResult.notes.map((note, index) => (
                              <li key={index} className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-blue-800 dark:text-blue-300">{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto h-16 w-16 text-red-400">
                        <XCircleIcon />
                      </div>
                      <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Compatible Integration Found</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {compatibilityResult.notes[0] || "This combination is not compatible with Allisone+."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'admin' && (
          <div className="space-y-8">            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Manage all software entries and their properties.</p>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Small sync status indicator */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      gitHubSyncStatus?.pms === 'syncing' || gitHubSyncStatus?.xray === 'syncing'
                        ? 'bg-blue-500 animate-pulse'
                        : gitHubSyncStatus?.pms === 'error' || gitHubSyncStatus?.xray === 'error'
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {gitHubSyncStatus?.pms === 'syncing' || gitHubSyncStatus?.xray === 'syncing'
                        ? 'Syncing...'
                        : gitHubSyncStatus?.pms === 'error' || gitHubSyncStatus?.xray === 'error'
                        ? 'Sync error'
                        : 'Synced'
                      }
                    </span>
                  </div>
                  <button
                    onClick={() => syncMatrices()}
                    className={`px-4 py-2 flex items-center text-sm rounded-md transition-colors ${
                      gitHubSyncStatus?.pms === 'syncing' || gitHubSyncStatus?.xray === 'syncing'
                        ? 'bg-blue-400 text-white cursor-not-allowed'
                        : gitHubSyncStatus?.pms === 'error' || gitHubSyncStatus?.xray === 'error'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/60'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/60'
                    }`}
                    disabled={gitHubSyncStatus?.pms === 'syncing' || gitHubSyncStatus?.xray === 'syncing'}
                  >
                    {gitHubSyncStatus?.pms === 'syncing' || gitHubSyncStatus?.xray === 'syncing' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"></path>
                        </svg>
                        Syncing...
                      </>
                    ) : gitHubSyncStatus?.pms === 'error' || gitHubSyncStatus?.xray === 'error' ? (
                      <>
                        <CloudArrowUpIcon className="h-4 w-4 mr-2" /> Retry Sync
                      </>
                    ) : (
                      <>
                        <CloudArrowUpIcon className="h-4 w-4 mr-2" /> Sync
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => handleEditClick(null)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center space-x-2 transition-colors">
                    <PlusCircleIcon className="w-5 h-5" />
                    <span>Add Software</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Deployment Info Section */}
            <DeploymentInfo />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">PMS Software ({allPmsSoftware.length})</h3>
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {allPmsSoftware.map(s => (
                    <li key={s.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center truncate space-x-3">
                        <EnhancedLogo 
                          src={s.logo} 
                          alt={s.name} 
                          className="h-8 w-8 object-contain rounded-md flex-shrink-0"
                          fallbackText="PMS"
                          size="small"
                          notionDocUrl={getDocumentationUrl(s.id, 'pms')}
                          onDocumentClick={() => handleDocumentClick(s.id, 'pms')}
                        />
                        <div className="truncate">
                          <p className="font-medium truncate text-gray-800 dark:text-gray-200">{s.name}</p>
                          <p className="text-sm text-gray-500 truncate">{s.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        <button onClick={() => handleEditClick(s)} className="text-blue-500 hover:text-blue-700 p-1">
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeleteSoftware(s.id, 'pms')} className="text-red-500 hover:text-red-700 p-1">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">X-ray Software ({allXraySoftware.length})</h3>
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {allXraySoftware.map(s => (
                    <li key={s.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="flex items-center truncate space-x-3">
                        <EnhancedLogo 
                          src={s.logo} 
                          alt={s.name} 
                          className="h-8 w-8 object-contain rounded-md flex-shrink-0"
                          fallbackText="X-RAY"
                          size="small"
                          notionDocUrl={getDocumentationUrl(s.id, 'xray')}
                          onDocumentClick={() => handleDocumentClick(s.id, 'xray')}
                        />
                        <div className="truncate">
                          <p className="font-medium truncate text-gray-800 dark:text-gray-200">{s.name}</p>
                          <p className="text-sm text-gray-500 truncate">{s.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        <button onClick={() => handleEditClick(s)} className="text-blue-500 hover:text-blue-700 p-1">
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeleteSoftware(s.id, 'xray')} className="text-red-500 hover:text-red-700 p-1">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}      {modalOpen && modalData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingCompatibility ? 'Edit Compatibility Settings' : 'Compatibility Details'}
              </h3>
              <div className="flex space-x-2">
                {!editingCompatibility && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCompatibility(modalData.pms, modalData.xray);
                    }} 
                    className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    title="Edit compatibility settings"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                )}
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="Close"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div><div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Modal Content */}
              {modalData && (
                <>
                  <div className={`p-5 rounded-xl ${modalData.compatibility.compatible ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/10' : 'bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/10'} border border-gray-200 dark:border-gray-700 mb-5`}>                    <div className="flex items-center space-x-4">
                      {modalData.compatibility.compatible ? 
                        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center shadow-sm">
                          <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div> 
                        : 
                        <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-800/30 flex items-center justify-center shadow-sm">
                          <XCircleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                      }
                      <div>                        <div className="flex items-baseline space-x-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {modalData.compatibility.compatible ? 'Compatible' : 'Not Compatible'}
                          </h3>
                          {modalData.compatibility.compatible && (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                              {modalData.compatibility.mode || (modalData.compatibility.commonModes && modalData.compatibility.commonModes.length > 0 ? modalData.compatibility.commonModes[0] : 'No Mode')}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">
                          via Allisone+ Integration Framework
                        </p>
                      </div>
                    </div>
                  </div>                  <div className="grid md:grid-cols-2 gap-6">
                    {/* PMS Compatibility */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 mr-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-1.5 flex items-center justify-center">
                          <img 
                            src={modalData.pms.logo} 
                            alt={modalData.pms.name} 
                            className="max-h-full max-w-full object-contain"
                            loading="lazy" 
                            width="40" 
                            height="40" 
                          />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {modalData.pms.name} → Allisone+
                        </h4>
                      </div>
                      {modalData.compatibility.compatible ? (
                        // Only show detailed information if the software is compatible
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-y-2 gap-x-4">
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Integration Status</span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center ${
                                modalData.compatibility.pmsCompatibility.status === 'In Prod' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' 
                                  : modalData.compatibility.pmsCompatibility.status === 'In Test' || modalData.compatibility.pmsCompatibility.status === 'Gateway Testing'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                                  : modalData.compatibility.pmsCompatibility.status === 'Planned'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {modalData.compatibility.pmsCompatibility.status === 'In Prod' && <CheckCircleIcon className="w-4 h-4 mr-1" />}
                                {modalData.compatibility.pmsCompatibility.status === 'In Test' && <BeakerIcon className="w-4 h-4 mr-1" />}
                                {modalData.compatibility.pmsCompatibility.status === 'Gateway Testing' && <BeakerIcon className="w-4 h-4 mr-1" />}
                                {modalData.compatibility.pmsCompatibility.status === 'Planned' && <CloudIcon className="w-4 h-4 mr-1" />}
                                {modalData.compatibility.pmsCompatibility.status}
                              </span>
                            </div>
                            
                            {modalData.compatibility.pmsCompatibility.allisoneMode && modalData.compatibility.pmsCompatibility.allisoneMode.length > 0 && (
                              <div>
                                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Integration Modes</span>
                                <div className="flex flex-wrap gap-1">
                                  {modalData.compatibility.pmsCompatibility.allisoneMode.map((mode: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                                      {mode}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {modalData.compatibility.pmsCompatibility.supportedVersions && (
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Supported Versions</span>
                              <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                                {modalData.compatibility.pmsCompatibility.supportedVersions}
                              </span>
                            </div>
                          )}
                          
                          {modalData.compatibility.pmsCompatibility.notes && (
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Notes</span>
                              <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                                {modalData.compatibility.pmsCompatibility.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        // For incompatible software, show simple explanation
                        <div className="text-center py-4">
                          <p className="text-gray-600 dark:text-gray-300 mb-2">This PMS is not compatible with Allisone+.</p>
                          <XCircleIcon className="h-12 w-12 mx-auto text-red-500 dark:text-red-400 opacity-50" />
                        </div>
                      )}
                    </div>
                    
                    {/* X-ray Compatibility */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 mr-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-1.5 flex items-center justify-center">
                          <img 
                            src={modalData.xray.logo} 
                            alt={modalData.xray.name}
                            className="max-h-full max-w-full object-contain" 
                            loading="lazy"
                            width="40" 
                            height="40"
                          />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {modalData.xray.name} → Allisone+
                        </h4>
                      </div>
                      
                      {modalData.compatibility.compatible ? (
                        // Only show detailed information if the software is compatible
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-y-2 gap-x-4">
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Integration Status</span>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center ${
                                modalData.compatibility.xrayCompatibility.status === 'Done' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' 
                                  : modalData.compatibility.xrayCompatibility.status === 'Planned'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {modalData.compatibility.xrayCompatibility.status === 'Done' && <CheckCircleIcon className="w-4 h-4 mr-1" />}
                                {modalData.compatibility.xrayCompatibility.status === 'Planned' && <CloudIcon className="w-4 h-4 mr-1" />}
                                {modalData.compatibility.xrayCompatibility.status}
                              </span>
                            </div>
                            
                            {modalData.compatibility.xrayCompatibility.allisoneMode && modalData.compatibility.xrayCompatibility.allisoneMode.length > 0 && (
                              <div>
                                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Integration Modes</span>
                                <div className="flex flex-wrap gap-1">
                                  {modalData.compatibility.xrayCompatibility.allisoneMode.map((mode: string, index: number) => (
                                    <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                                      {mode}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {modalData.compatibility.xrayCompatibility.supportedVersions && (
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Supported Versions</span>
                              <span className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                                {modalData.compatibility.xrayCompatibility.supportedVersions}
                              </span>
                            </div>
                          )}
                          
                          {modalData.compatibility.xrayCompatibility.notes && (
                            <div>
                              <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Notes</span>
                              <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                                {modalData.compatibility.xrayCompatibility.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        // For incompatible software, show simple explanation
                        <div className="text-center py-4">
                          <p className="text-gray-600 dark:text-gray-300 mb-2">This X-ray system is not compatible with Allisone+.</p>
                          <XCircleIcon className="h-12 w-12 mx-auto text-red-500 dark:text-red-400 opacity-50" />
                        </div>
                      )}
                    </div>
                  </div>                  {/* Only show recommendations if compatible AND there are recommendations to show */}
                  {modalData.compatibility.compatible && modalData.compatibility.recommendations && modalData.compatibility.recommendations.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 border border-blue-200 dark:border-blue-700 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center mb-2">
                        <LightBulbIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-base">Recommendations</h4>
                      </div>
                      <ul className="space-y-2">
                        {modalData.compatibility.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-blue-800 dark:text-blue-300">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>            </div>
          </div>
        )}
      </main>
      )}

      {isEditModalOpen && (
        <EditSoftwareModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingSoftware(null);
          }}
          onSave={handleSaveSoftware}
          software={editingSoftware}
          pmsStatusOptions={pmsStatusOptions}
          xrayStatusOptions={xrayStatusOptions}
        />
      )}

      {modalOpen && modalData && (
        <EditCompatibilityModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setModalData(null);
            setEditingCompatibility(null);
          }}
          pms={modalData.pms}
          xray={modalData.xray}
          compatibility={modalData.compatibility}
          onSave={handleSaveCompatibility}
          pmsStatusOptions={pmsStatusOptions}
          xrayStatusOptions={xrayStatusOptions}
          syncStatus={gitHubSyncStatus?.pms || 'idle'}
        />
      )}

      {/* Notion Documentation Modal */}
      <NotionEmbed
        notionUrl={notionModalData?.url}
        title={notionModalData?.title}
        description={notionModalData?.description}
        isOpen={notionModalOpen}
        onClose={() => setNotionModalOpen(false)}
      />

      <ToastContainer 
        position="bottom-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored" 
      />
    </div>
  );
}

export default App;
