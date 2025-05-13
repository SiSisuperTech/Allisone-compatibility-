// Global Variables
let compatibilityData = {};
let currentLanguage = 'en';
const translations = {
    en: {
        selectPms: 'Select PMS software',
        selectXray: 'Select X-ray software',
        filterOptions: 'Filter Options',
        compatibilityResults: 'Compatibility Results',
        compatibilityMatrix: 'Compatibility Matrix',
        documentation: 'Documentation',
        searchPlaceholder: 'Select software options to view compatibility information',
        fullCompatibility: 'Full Compatibility',
        partialCompatibility: 'Partial Compatibility',
        noCompatibility: 'No Compatibility',
        integrationOptions: 'Integration Options',
        viewDetails: 'View Details',
        downloadGuide: 'Download Guide',
        getSupport: 'Get Support',
        apiIntegration: 'API Integration',
        directIntegration: 'Direct Integration',
        cloudSync: 'Cloud Sync',
        fileExport: 'File Export/Import',
        manualImport: 'Manual Import',
        gateway: 'Gateway',
        wildGateway: 'Wild Gateway',
        v1Light: 'V1 Light',
        v1Full: 'V1 Full (Watcher)',
        v2: 'V2'
    },
    fr: {
        selectPms: 'Sélectionner un logiciel PMS',
        selectXray: 'Sélectionner un logiciel à rayons X',
        filterOptions: 'Options de filtrage',
        compatibilityResults: 'Résultats de compatibilité',
        compatibilityMatrix: 'Matrice de compatibilité',
        documentation: 'Documentation',
        searchPlaceholder: 'Sélectionnez des options de logiciel pour afficher les informations de compatibilité',
        fullCompatibility: 'Compatibilité complète',
        partialCompatibility: 'Compatibilité partielle',
        noCompatibility: 'Aucune compatibilité',
        integrationOptions: 'Options d\'intégration',
        viewDetails: 'Voir les détails',
        downloadGuide: 'Télécharger le guide',
        getSupport: 'Obtenir de l\'aide',
        apiIntegration: 'Intégration API',
        directIntegration: 'Intégration directe',
        cloudSync: 'Synchronisation cloud',
        fileExport: 'Exportation/Importation de fichiers',
        manualImport: 'Importation manuelle',
        gateway: 'Passerelle',
        wildGateway: 'Passerelle sauvage',
        v1Light: 'V1 Light',
        v1Full: 'V1 Complète (Observateur)',
        v2: 'V2'
    },
    es: {
        selectPms: 'Seleccionar software PMS',
        selectXray: 'Seleccionar software de rayos X',
        filterOptions: 'Opciones de filtro',
        compatibilityResults: 'Resultados de compatibilidad',
        compatibilityMatrix: 'Matriz de compatibilidad',
        documentation: 'Documentación',
        searchPlaceholder: 'Seleccione opciones de software para ver información de compatibilidad',
        fullCompatibility: 'Compatibilidad completa',
        partialCompatibility: 'Compatibilidad parcial',
        noCompatibility: 'Sin compatibilidad',
        integrationOptions: 'Opciones de integración',
        viewDetails: 'Ver detalles',
        downloadGuide: 'Descargar guía',
        getSupport: 'Obtener soporte',
        apiIntegration: 'Integración API',
        directIntegration: 'Integración directa',
        cloudSync: 'Sincronización en la nube',
        fileExport: 'Exportación/Importación de archivos',
        manualImport: 'Importación manual',
        gateway: 'Gateway',
        wildGateway: 'Gateway salvaje',
        v1Light: 'V1 Light',
        v1Full: 'V1 Completo (Vigilante)',
        v2: 'V2'
    }
};

// Real data for the application
const realData = {
    pms: [
        { id: 'desmos', name: 'Desmos' },
        { id: 'julie', name: 'Julie' },
        { id: 'ulyses', name: 'Ulyses' },
        { id: 'weclever', name: 'WeClever' },
        { id: 'veasy', name: 'Veasy' },
        { id: 'powerdent', name: 'Powerdent - Kopfwerk' },
        { id: 'orisdent', name: 'OrisDent - OrisLine' },
        { id: 'spdentaire', name: 'SPDentaire' },
        { id: 'logosw', name: 'Logosw' },
        { id: 'biotech', name: 'Biotech Dental' },
        { id: 'dental4windows', name: 'Dental4Windows' },
        { id: 'opendental', name: 'Open Dental' },
        { id: 'eaglesoft', name: 'Eaglesoft' },
        { id: 'dentrix', name: 'Dentrix' },
        { id: 'denticon', name: 'Denticon' }
    ],
    xray: [
        { id: 'planmeca', name: 'Romexis - Planmeca' },
        { id: 'acteon', name: 'AIS - Acteon' },
        { id: 'gendex', name: 'VixWin - Gendex' },
        { id: 'durr', name: 'VistaSoft - Durr Dental' },
        { id: 'mediadent', name: 'Mediadent - Mediadent' },
        { id: 'durrdbswin', name: 'DBSWin - Durr Dental' },
        { id: 'morita', name: 'i-Dixel - Morita' },
        { id: 'carestream', name: 'CS Imaging - Carestream' },
        { id: 'sirona', name: 'Sidexis - Dentsply Sirona' },
        { id: 'kavo', name: 'Cliniview - KaVo Instrumentarium' },
        { id: 'soredex', name: 'Scanora - Soredex' },
        { id: 'vatech', name: 'Ezdent-i - Vatech' },
        { id: 'owandy', name: 'QuickVision - Owandy' },
        { id: 'myray', name: 'iRYS - MyRay' },
        { id: 'ray', name: 'RayScan - Ray' },
        { id: 'examinepro', name: 'Examine Pro - Examine Pro' },
        { id: 'citodent', name: 'VisiQuick - Citodent' },
        { id: 'apteryx', name: 'XrayVision - Apteryx Imaging' },
        { id: 'medicor', name: 'MiPACS Dental Enterprise Viewer - Medicor Imaging' },
        { id: 'dentrix-ascend', name: 'Dentrix Ascend - Henry Schein' },
        { id: 'newtom', name: 'NNT - Newtom' },
        { id: 'dtx', name: 'DTX Studio - Visualization' },
        { id: 'allisone', name: 'Allisone X-ray' }
    ],
    compatibility: {
        'logosw-carestream': { 
            level: 'full', 
            options: ['API Integration', 'Direct Integration', 'Gateway'],
            description: 'Full integration between Logosw PMS and Carestream X-ray with multiple connection methods including direct API and gateway options.',
            features: ['Bidirectional data sync', 'Automatic patient matching', 'X-ray acquisition from PMS']
        },
        'logosw-planmeca': { 
            level: 'partial', 
            options: ['Gateway', 'File Export/Import'],
            description: 'Partial integration between Logosw and Planmeca using gateway connection or file export/import.',
            features: ['One-way data sync', 'Manual patient matching', 'External launching']
        },
        'logosw-sirona': { 
            level: 'full', 
            options: ['V2', 'API Integration'],
            description: 'Full integration between Logosw and Sidexis (Sirona) using Allisone V2 connector.',
            features: ['Direct connectivity', 'Patient auto-matching', 'Real-time image sync']
        },
        'logosw-kavo': { 
            level: 'partial', 
            options: ['V1 Light', 'Manual Import'],
            description: 'Basic integration between Logosw and Cliniview (KaVo) with limited functionality.',
            features: ['Manual image transfer', 'Basic image linking']
        },
        'julie-carestream': { 
            level: 'full', 
            options: ['Direct Integration', 'Gateway'],
            description: 'Comprehensive integration between Julie and Carestream with direct connectivity.',
            features: ['Automated workflow', 'One-click acquisition', 'Full data exchange']
        },
        'julie-sirona': { 
            level: 'full', 
            options: ['Gateway', 'V2'],
            description: 'Full integration between Julie and Sidexis using gateway technology.',
            features: ['Complete workflow integration', 'Automatic synchronization', 'Patient matching']
        },
        'julie-vatech': { 
            level: 'full', 
            options: ['V2', 'Direct Integration'],
            description: 'Complete integration between Julie and Vatech using Allisone V2 connector.',
            features: ['Seamless imaging workflow', 'Automated patient matching', 'Quick image acquisition']
        },
        'julie-planmeca': { 
            level: 'partial', 
            options: ['Gateway', 'File Export/Import'],
            description: 'Partial integration between Julie and Planmeca using gateway technology.',
            features: ['Limited automated workflow', 'Manual configuration required']
        },
        'desmos-carestream': { 
            level: 'full', 
            options: ['V2', 'Gateway', 'API Integration'],
            description: 'Complete integration between Desmos and Carestream with multiple connection options.',
            features: ['Full bidirectional sync', 'Automated workflow', 'Real-time updates']
        },
        'desmos-planmeca': { 
            level: 'full', 
            options: ['Gateway', 'Cloud Sync'],
            description: 'Full integration between Desmos and Planmeca using advanced connectivity.',
            features: ['Cloud-based synchronization', 'Automated patient matching', 'Simple setup']
        },
        'desmos-sirona': { 
            level: 'full', 
            options: ['Gateway', 'V2'],
            description: 'Enhanced integration between Desmos and Sidexis with full feature support.',
            features: ['Complete workflow integration', 'One-click acquisition', 'Advanced filtering']
        },
        'weclever-carestream': { 
            level: 'full', 
            options: ['Gateway', 'V2', 'API Integration'],
            description: 'Complete integration between WeClever and Carestream.',
            features: ['Automated workflow', 'Real-time synchronization', 'Patient auto-matching']
        },
        'weclever-vatech': { 
            level: 'full', 
            options: ['Gateway', 'V2'],
            description: 'Full integration between WeClever and Vatech with all features supported.',
            features: ['Direct connectivity', 'Seamless workflow', 'Real-time image sync']
        },
        'ulyses-carestream': { 
            level: 'full', 
            options: ['Gateway', 'V2'],
            description: 'Complete integration between Ulyses and Carestream.',
            features: ['Bidirectional sync', 'Automated workflow', 'Easy configuration']
        },
        'ulyses-sirona': { 
            level: 'partial', 
            options: ['File Export/Import'],
            description: 'Basic integration between Ulyses and Sidexis.',
            features: ['Manual file transfer', 'Basic patient linking']
        },
        'ulyses-planmeca': { 
            level: 'partial', 
            options: ['Gateway'],
            description: 'Limited gateway connectivity between Ulyses and Planmeca.',
            features: ['One-way synchronization', 'Manual configuration']
        },
        'spdentaire-carestream': { 
            level: 'full', 
            options: ['Gateway', 'V2'],
            description: 'Full integration between SPDentaire and Carestream.',
            features: ['Complete data exchange', 'Automated workflow', 'Patient matching']
        },
        'spdentaire-planmeca': { 
            level: 'partial', 
            options: ['File Export/Import', 'V1 Light'],
            description: 'Basic integration between SPDentaire and Planmeca.',
            features: ['Limited automation', 'Manual patient matching']
        },
        'veasy-carestream': { 
            level: 'partial', 
            options: ['V1 Light'],
            description: 'Limited integration between Veasy and Carestream.',
            features: ['Basic image linking', 'Manual synchronization']
        },
        'veasy-planmeca': { 
            level: 'none', 
            options: [],
            description: 'No current integration between Veasy and Planmeca.',
            features: []
        },
        'powerdent-carestream': { 
            level: 'partial', 
            options: ['V1 Light'],
            description: 'Limited integration between Powerdent and Carestream.',
            features: ['Basic image viewing', 'Manual patient linking']
        },
        'powerdent-sirona': { 
            level: 'partial', 
            options: ['V1 Light'],
            description: 'Limited integration between Powerdent and Sidexis.',
            features: ['Basic integration', 'Manual workflow']
        },
        'orisdent-carestream': { 
            level: 'partial', 
            options: ['V1 Light'],
            description: 'Basic integration between OrisDent and Carestream.',
            features: ['Manual image linking', 'Basic viewing capabilities']
        },
        'orisdent-vatech': { 
            level: 'none', 
            options: [],
            description: 'No current integration between OrisDent and Vatech.',
            features: []
        },
        'biotech-carestream': { 
            level: 'partial', 
            options: ['File Export/Import'],
            description: 'Limited integration between Biotech Dental and Carestream.',
            features: ['Manual file transfer', 'Basic image viewing']
        },
        'dental4windows-carestream': { 
            level: 'full', 
            options: ['API Integration', 'Direct Integration'],
            description: 'Full integration between Dental4Windows and Carestream.',
            features: ['Bidirectional sync', 'Automated workflow', 'Complete patient matching']
        },
        'dental4windows-sirona': { 
            level: 'full', 
            options: ['Gateway', 'API Integration'],
            description: 'Complete integration between Dental4Windows and Sidexis.',
            features: ['Advanced connectivity', 'Automated workflow', 'Comprehensive features']
        },
        'opendental-carestream': { 
            level: 'full', 
            options: ['API Integration', 'Direct Integration'],
            description: 'Full integration between Open Dental and Carestream.',
            features: ['Complete data exchange', 'Real-time synchronization', 'Easy setup']
        },
        'opendental-dexis': { 
            level: 'full', 
            options: ['Direct Integration'],
            description: 'Native integration between Open Dental and Dexis.',
            features: ['Built-in support', 'Seamless workflow', 'Complete feature set']
        },
        'eaglesoft-carestream': { 
            level: 'full', 
            options: ['Direct Integration', 'API Integration'],
            description: 'Complete integration between Eaglesoft and Carestream.',
            features: ['Native support', 'Automatic synchronization', 'Full feature set']
        },
        'eaglesoft-planmeca': { 
            level: 'partial', 
            options: ['File Export/Import'],
            description: 'Limited integration between Eaglesoft and Planmeca.',
            features: ['Manual file transfer', 'Basic patient linking']
        },
        'dentrix-carestream': { 
            level: 'full', 
            options: ['Direct Integration', 'API Integration'],
            description: 'Full native integration between Dentrix and Carestream.',
            features: ['Built-in support', 'Complete workflow', 'Advanced features']
        },
        'dentrix-dexis': { 
            level: 'full', 
            options: ['Direct Integration'],
            description: 'Native integration between Dentrix and Dexis.',
            features: ['Built-in Bridge', 'Complete workflow integration', 'Automatic synchronization']
        },
        'denticon-carestream': { 
            level: 'partial', 
            options: ['File Export/Import'],
            description: 'Basic integration between Denticon and Carestream.',
            features: ['Manual file transfer', 'Limited automation']
        },
        'denticon-sirona': { 
            level: 'partial', 
            options: ['Cloud Sync'],
            description: 'Partial integration between Denticon and Sidexis using cloud technology.',
            features: ['Cloud-based synchronization', 'Manual configuration required']
        }
    },
    documentation: {
        'logosw-carestream': `<h3>Integration Guide: Logosw + Carestream</h3>
            <p>This integration offers multiple connection methods:</p>
            <ul>
                <li><strong>API Integration:</strong> Direct connection with full data exchange</li>
                <li><strong>Gateway Connection:</strong> Using Allisone gateway for enhanced reliability</li>
                <li><strong>Direct Integration:</strong> Built-in native support</li>
            </ul>
            <p>For optimal performance, we recommend using the API integration method with automatic patient matching enabled.</p>
            <h4>Setup Requirements</h4>
            <p>Logosw version 4.2+ and Carestream 8.0+ required for full functionality.</p>
            <div class="documentation-links">
                <a href="#" class="btn btn-outlined">Download Setup Guide</a>
                <a href="#" class="btn btn-outlined">View Video Tutorial</a>
            </div>`,
        'logosw-planmeca': `<h3>Integration Guide: Logosw + Planmeca</h3>
            <p>This integration provides two connection options:</p>
            <ul>
                <li><strong>Gateway Connection:</strong> Using Allisone gateway for data exchange</li>
                <li><strong>File Export/Import:</strong> Manual or semi-automated file transfer</li>
            </ul>
            <p>Note that this integration has some limitations and does not provide real-time synchronization.</p>
            <h4>Setup Requirements</h4>
            <p>Requires gateway configuration and file path setup.</p>
            <div class="documentation-links">
                <a href="#" class="btn btn-outlined">Download Setup Guide</a>
            </div>`,
        'julie-carestream': `<h3>Integration Guide: Julie + Carestream</h3>
            <p>This integration offers a comprehensive solution:</p>
            <ul>
                <li><strong>Direct Integration:</strong> Built-in native support</li>
                <li><strong>Gateway Connection:</strong> Using Allisone gateway for enhanced features</li>
            </ul>
            <p>The integration provides automated workflows and one-click acquisition.</p>
            <h4>Setup Requirements</h4>
            <p>Julie 3.5+ and Carestream 7.5+ for optimal performance.</p>
            <div class="documentation-links">
                <a href="#" class="btn btn-outlined">Download Setup Guide</a>
                <a href="#" class="btn btn-outlined">View Video Tutorial</a>
            </div>`,
        'dentally-planmeca': `<h3>Integration Guide: Dentally + Planmeca</h3>
            <p>This modern cloud-based integration offers:</p>
            <ul>
                <li><strong>Cloud Synchronization:</strong> Real-time data exchange via cloud</li>
                <li><strong>API Integration:</strong> Direct connectivity with extended features</li>
            </ul>
            <p>This integration works across platforms and provides automatic updates.</p>
            <h4>Setup Requirements</h4>
            <p>Dentally cloud subscription and Planmeca Romexis 5.0+</p>
            <div class="documentation-links">
                <a href="#" class="btn btn-outlined">Download Setup Guide</a>
                <a href="#" class="btn btn-outlined">View API Documentation</a>
            </div>`,
        'weclever-dexis': `<h3>Integration Guide: WeClever + Dexis</h3>
            <p>Enhanced integration using the latest connector:</p>
            <ul>
                <li><strong>Gateway Connection:</strong> Using Allisone gateway for reliable data exchange</li>
                <li><strong>V2 Integration:</strong> Latest Allisone connector for advanced features</li>
            </ul>
            <p>This integration provides fast image acquisition and intelligent patient matching.</p>
            <h4>Setup Requirements</h4>
            <p>WeClever 2.1+ and Dexis 10+</p>
            <div class="documentation-links">
                <a href="#" class="btn btn-outlined">Download Setup Guide</a>
                <a href="#" class="btn btn-outlined">Watch Tutorial</a>
            </div>`,
        'desmos-allisone': `<h3>Integration Guide: Desmos + Allisone X-ray</h3>
            <p>Full featured native integration:</p>
            <ul>
                <li><strong>Gateway Connection:</strong> Native gateway support</li>
                <li><strong>V2 Integration:</strong> Latest Allisone connector</li>
                <li><strong>Cloud Sync:</strong> Real-time cloud synchronization</li>
            </ul>
            <p>This integration offers the most complete feature set with multiple connectivity options.</p>
            <h4>Setup Requirements</h4>
            <p>Desmos latest version with Allisone X-ray module</p>
            <div class="documentation-links">
                <a href="#" class="btn btn-outlined">Download Setup Guide</a>
                <a href="#" class="btn btn-outlined">View Video Tutorial</a>
            </div>`
    }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    compatibilityData = realData;
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize language selector
    initLanguageSelector();
    
    // Populate dropdowns
    populateDropdowns();
    
    // Add event listeners
    setupEventListeners();
});

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Language selector functionality
function initLanguageSelector() {
    const languageSelect = document.getElementById('language-select');
    
    // Set initial language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
        languageSelect.value = currentLanguage;
    }
    
    languageSelect.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('language', currentLanguage);
        updateUILanguage();
    });
    
    // Initial language update
    updateUILanguage();
}

function updateUILanguage() {
    const langData = translations[currentLanguage];
    
    // Update all text elements
    document.querySelector('label[for="pms-select"]').textContent = langData.selectPms;
    document.querySelector('label[for="xray-select"]').textContent = langData.selectXray;
    document.querySelector('.filter-container h3').textContent = langData.filterOptions;
    document.querySelector('.results-section h2').textContent = langData.compatibilityResults;
    document.querySelector('.matrix-section h2').textContent = langData.compatibilityMatrix;
    document.querySelector('.documentation-section h2').textContent = langData.documentation;
    
    // Update placeholders
    document.querySelector('#pms-select option[value=""]').textContent = langData.selectPms;
    document.querySelector('#xray-select option[value=""]').textContent = langData.selectXray;
    
    // Update empty state text
    if (document.querySelector('.empty-state p')) {
        document.querySelector('.empty-state p').textContent = langData.searchPlaceholder;
    }
    
    // Update compatibility badges if present
    document.querySelectorAll('.compatibility-full').forEach(el => {
        if (!el.classList.contains('compatibility-badge')) {
            el.textContent = langData.fullCompatibility;
        }
    });
    
    document.querySelectorAll('.compatibility-partial').forEach(el => {
        if (!el.classList.contains('compatibility-badge')) {
            el.textContent = langData.partialCompatibility;
        }
    });
    
    document.querySelectorAll('.compatibility-none').forEach(el => {
        if (!el.classList.contains('compatibility-badge')) {
            el.textContent = langData.noCompatibility;
        }
    });
}

// Populate dropdowns with data
function populateDropdowns() {
    const pmsSelect = document.getElementById('pms-select');
    const xraySelect = document.getElementById('xray-select');
    
    // Clear existing options except the first placeholder option
    while (pmsSelect.options.length > 1) pmsSelect.remove(1);
    while (xraySelect.options.length > 1) xraySelect.remove(1);
    
    // Add PMS options
    compatibilityData.pms.forEach(pms => {
        const option = document.createElement('option');
        option.value = pms.id;
        option.textContent = pms.name;
        pmsSelect.appendChild(option);
    });
    
    // Add X-ray options
    compatibilityData.xray.forEach(xray => {
        const option = document.createElement('option');
        option.value = xray.id;
        option.textContent = xray.name;
        xraySelect.appendChild(option);
    });
}

// Set up event listeners
function setupEventListeners() {
    const pmsSelect = document.getElementById('pms-select');
    const xraySelect = document.getElementById('xray-select');
    
    // Listen for changes on the selects
    pmsSelect.addEventListener('change', updateResults);
    xraySelect.addEventListener('change', updateResults);
    
    // Initialize filter buttons
    updateFilterButtons();
}

// Update filter buttons based on available integration options
function updateFilterButtons() {
    const filterContainer = document.querySelector('.filter-buttons');
    filterContainer.innerHTML = '';
    
    // Predefined categories for better organization
    const filterCategories = [
        'API Integration', 'Direct Integration', 'Gateway', 'Wild Gateway',
        'V1 Light', 'V1 Full', 'V2', 'Cloud Sync', 'File Export/Import', 'Manual Import'
    ];
    
    // Create a button for each option
    filterCategories.forEach(option => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = translateOption(option);
        button.dataset.filter = option;
        
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            updateResults();
        });
        
        filterContainer.appendChild(button);
    });
}

// Translate integration options
function translateOption(option) {
    const langData = translations[currentLanguage];
    switch(option) {
        case 'API Integration': return langData.apiIntegration || option;
        case 'Direct Integration': return langData.directIntegration || option;
        case 'Cloud Sync': return langData.cloudSync || option;
        case 'File Export/Import': return langData.fileExport || option;
        case 'Manual Import': return langData.manualImport || option;
        case 'Gateway': return langData.gateway || option;
        case 'Wild Gateway': return langData.wildGateway || option;
        case 'V1 Light': return langData.v1Light || option;
        case 'V1 Full': return langData.v1Full || option;
        case 'V2': return langData.v2 || option;
        default: return option;
    }
}

// Update results based on selected options
function updateResults() {
    const pmsSelect = document.getElementById('pms-select');
    const xraySelect = document.getElementById('xray-select');
    const resultsContainer = document.querySelector('.results-container');
    const documentsContainer = document.querySelector('.documentation-container');
    
    const selectedPms = pmsSelect.value;
    const selectedXray = xraySelect.value;
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    documentsContainer.innerHTML = '';
    
    // If both selections are made, show compatibility
    if (selectedPms && selectedXray) {
        const compatKey = `${selectedPms}-${selectedXray}`;
        const compatibility = compatibilityData.compatibility[compatKey];
        
        if (compatibility) {
            // Get selected filters
            const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
                .map(btn => btn.dataset.filter);
            
            // Check if any integration option matches the filters
            const passesFilter = activeFilters.length === 0 || 
                compatibility.options.some(option => activeFilters.includes(option));
            
            if (passesFilter) {
                // Find the names of the selected software
                const pmsName = compatibilityData.pms.find(p => p.id === selectedPms).name;
                const xrayName = compatibilityData.xray.find(x => x.id === selectedXray).name;
                
                // Create result card
                const resultCard = document.createElement('div');
                resultCard.className = 'result-card';
                
                // Compatibility badge class
                const badgeClass = `compatibility-${compatibility.level}`;
                
                // Translate compatibility level
                let compatibilityText;
                if (compatibility.level === 'full') {
                    compatibilityText = translations[currentLanguage].fullCompatibility;
                } else if (compatibility.level === 'partial') {
                    compatibilityText = translations[currentLanguage].partialCompatibility;
                } else {
                    compatibilityText = translations[currentLanguage].noCompatibility;
                }
                
                // Get translated options
                const translatedOptions = compatibility.options.map(opt => translateOption(opt));
                
                // Create main result card with enhanced information
                resultCard.innerHTML = `
                    <div class="result-header ${badgeClass.replace('compatibility-', '')}">
                        <h3>${pmsName} + ${xrayName}</h3>
                        <span class="compatibility-badge ${badgeClass}">${compatibilityText}</span>
                    </div>
                    <div class="result-body">
                        <p class="result-description">${compatibility.description}</p>
                        
                        <div class="result-features">
                            <h4>${translations[currentLanguage].integrationOptions}:</h4>
                            <div class="integration-options">
                                ${compatibility.options.map(option => 
                                    `<span class="integration-option">${translateOption(option)}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        ${compatibility.features.length > 0 ? `
                        <div class="result-features">
                            <h4>Features:</h4>
                            <ul>
                                ${compatibility.features.map(feature => 
                                    `<li><i class="fas fa-check-circle"></i> ${feature}</li>`
                                ).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        <div class="result-actions">
                            <button class="btn btn-primary view-docs-btn">
                                <i class="fas fa-file-alt"></i> ${translations[currentLanguage].viewDetails}
                            </button>
                            ${compatibility.level !== 'none' ? `
                            <button class="btn btn-outlined">
                                <i class="fas fa-download"></i> ${translations[currentLanguage].downloadGuide}
                            </button>
                            ` : ''}
                        </div>
                    </div>
                `;
                
                resultsContainer.appendChild(resultCard);
                
                // Add event listener to view documentation button
                const viewDocsBtn = resultCard.querySelector('.view-docs-btn');
                if (viewDocsBtn) {
                    viewDocsBtn.addEventListener('click', () => {
                        // Scroll to documentation section
                        document.querySelector('.documentation-section').scrollIntoView({
                            behavior: 'smooth'
                        });
                    });
                }
                
                // Show documentation if available
                if (compatibilityData.documentation[compatKey]) {
                    documentsContainer.innerHTML = compatibilityData.documentation[compatKey];
                } else {
                    documentsContainer.innerHTML = `
                        <div class="documentation-placeholder">
                            <i class="fas fa-file-alt"></i>
                            <p>Detailed documentation for ${pmsName} + ${xrayName} integration is being prepared.</p>
                            <p>Please contact support for assistance with this integration.</p>
                            <button class="btn btn-primary">
                                <i class="fas fa-headset"></i> ${translations[currentLanguage].getSupport}
                            </button>
                        </div>
                    `;
                }
                
                // Update compatibility matrix
                updateMatrix();
            } else {
                // Show empty state if no results pass filter
                showEmptyState(resultsContainer, 'No results match your filter criteria');
            }
        } else {
            // Show empty state if no compatibility data
            showEmptyState(resultsContainer, 'No compatibility data available for the selected software');
        }
    } else {
        // Show default empty state
        showEmptyState(resultsContainer, translations[currentLanguage].searchPlaceholder);
    }
}

// Show empty state message
function showEmptyState(container, message) {
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-search"></i>
            <p>${message}</p>
        </div>
    `;
}

// Update the compatibility matrix
function updateMatrix() {
    const matrixContainer = document.querySelector('.compatibility-matrix');
    matrixContainer.innerHTML = '';
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th></th>';
    
    compatibilityData.xray.forEach(xray => {
        headerRow.innerHTML += `<th>${xray.name}</th>`;
    });
    
    thead.appendChild(headerRow);
    matrixContainer.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    compatibilityData.pms.forEach(pms => {
        const row = document.createElement('tr');
        row.innerHTML = `<th>${pms.name}</th>`;
        
        compatibilityData.xray.forEach(xray => {
            const compatKey = `${pms.id}-${xray.id}`;
            const compatibility = compatibilityData.compatibility[compatKey];
            
            let cellContent = '';
            let cellClass = '';
            
            if (compatibility) {
                if (compatibility.level === 'full') {
                    cellContent = '<span class="compatibility-icon full">✓</span>';
                    cellClass = 'full';
                } else if (compatibility.level === 'partial') {
                    cellContent = '<span class="compatibility-icon partial">⚠</span>';
                    cellClass = 'partial';
                } else {
                    cellContent = '<span class="compatibility-icon none">✗</span>';
                    cellClass = 'none';
                }
                
                // Add tooltip with integration options
                if (compatibility.options.length > 0) {
                    const optionsText = compatibility.options.join(', ');
                    cellContent += `<span class="matrix-tooltip">${optionsText}</span>`;
                }
            } else {
                cellContent = '<span class="compatibility-icon none">✗</span>';
                cellClass = 'none';
            }
            
            row.innerHTML += `<td class="matrix-cell ${cellClass}" data-pms="${pms.id}" data-xray="${xray.id}">${cellContent}</td>`;
        });
        
        tbody.appendChild(row);
    });
    
    matrixContainer.appendChild(tbody);
    
    // Add click event to matrix cells
    document.querySelectorAll('.matrix-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const pmsId = cell.dataset.pms;
            const xrayId = cell.dataset.xray;
            
            // Set the select values
            document.getElementById('pms-select').value = pmsId;
            document.getElementById('xray-select').value = xrayId;
            
            // Update results
            updateResults();
            
            // Scroll to results
            document.querySelector('.results-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
} 