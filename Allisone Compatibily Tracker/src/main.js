// Global data definitions
const notionLinks = {
    software: {
        // Example: "CS Imaging - Carestream": "https://notion.so/allisone/carestream-guide",
    },
    pms: {
        // Example: "Julie": "https://notion.so/allisone/julie-setup",
    },
    integration: {
        // Example: "CS Imaging - Carestream": {
        // "Julie": "https://notion.so/allisone/carestream-julie-integration"
        // }
    }
};

const xraySoftwareData = [
    { 
        name: "Romexis - Planmeca", 
        output: "Watcher Light + Dicom export ✅", 
        supportedVersions: "All versions ≥ 5.x",
        repartition: 15,
        v2ServerMode: true,
        v2BridgeMode: true,
        wildGateway: true
    },
    { 
        name: "AIS - Acteon", 
        output: "Watcher Light + Dicom export ✅", 
        supportedVersions: "≥ 5.3 (paid upgrade)",
        repartition: 2,
        v2ServerMode: true,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "VixWin - Gendex", 
        output: "Watcher Light + Dicom export ✅", 
        supportedVersions: "All versions prior to 4.x",
        repartition: 1,
        v2ServerMode: true,
        v2BridgeMode: true,
        wildGateway: false
    },
    { 
        name: "VistaSoft - Durr Dental", 
        output: "Watcher Light + Dicom export ✅", 
        supportedVersions: "2.x or 3.x",
        repartition: 0.5,
        v2ServerMode: true,
        v2BridgeMode: true,
        wildGateway: false
    },
    { 
        name: "Mediadent - Mediadent", 
        output: "Watcher Light + Dicom export ✅",
        repartition: 0.2,
        v2ServerMode: true,
        genericDicom: true,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "DBSWin - Durr Dental", 
        output: "Watcher Light + Dicom export ✅",
        repartition: 0,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "i-Dixel - Morita", 
        output: "Watcher Light + Dicom export ✅",
        repartition: 1.7,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "CS Imaging - Carestream", 
        output: "Full Watcher ✅", 
        supportedVersions: "All versions ≥ 6.x, 7.x, 8.x",
        repartition: 22,
        v2ServerMode: true,
        v2BridgeMode: true,
        wildGateway: true
    },
    { 
        name: "Sidexis - Dentsply Sirona", 
        output: "Full Watcher ✅", 
        supportedVersions: "All versions ≥ 4.x (XG not supported yet)",
        repartition: 12,
        v2ServerMode: true,
        v2BridgeMode: true,
        wildGateway: true
    },
    { 
        name: "Cliniview - KaVo Instrumentarium", 
        output: "Full Watcher ✅",
        repartition: 4,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "Scanora - Soredex", 
        output: "Full Watcher ✅",
        repartition: 1.3,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "Ezdent-i - Vatech", 
        output: "Full Watcher Dicom ✅", 
        supportedVersions: "All versions (3.x)",
        repartition: 14,
        v2ServerMode: true,
        v2BridgeMode: true,
        wildGateway: true
    },
    { 
        name: "QuickVision - Owandy", 
        output: "Full Watcher Dicom ✅",
        repartition: 5,
        v2ServerMode: true,
        genericDicom: true,
        v2BridgeMode: true,
        wildGateway: false,
        bridgeStatus: "R&D"
    },
    { 
        name: "iRYS - MyRay", 
        output: "Full Watcher Dicom ✅", 
        supportedVersions: "≥ 16",
        repartition: 3,
        v2ServerMode: true,
        genericDicom: true,
        v2BridgeMode: true,
        wildGateway: true,
        bridgeStatus: "In Development",
        wildGatewayStatus: "In Development"
    },
    { 
        name: "RayScan - Ray", 
        output: "Full Watcher Dicom ✅",
        repartition: 0.2,
        v2ServerMode: true,
        genericDicom: true,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "Examine Pro - Examine Pro", 
        output: "Full Watcher Dicom ✅",
        repartition: 0.2,
        v2ServerMode: true,
        v2BridgeMode: false,
        wildGateway: true,
        wildGatewayStatus: "In Development"
    },
    { 
        name: "VisiQuick - Citodent", 
        output: "Allisone+ v2 Bridge/Server ✅",
        repartition: 0,
        v2ServerMode: true,
        v2BridgeMode: true,
        wildGateway: false
    },
    { 
        name: "XrayVision - Apteryx Imaging", 
        output: "Manual X-ray upload ✅",
        repartition: 0,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "MiPACS Dental Enterprise Viewer - Medicor Imaging", 
        output: "Manual X-ray upload ✅",
        repartition: 0,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "Dentrix Ascend - Henry Schein", 
        output: "Manual X-ray upload ✅",
        repartition: 0,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "NNT - Newtom", 
        output: "Manual X-ray upload ✅",
        repartition: 0.4,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
    { 
        name: "DTX Studio - Visualization", 
        output: "Manual X-ray upload ✅",
        repartition: 0.2,
        v2ServerMode: false,
        v2BridgeMode: false,
        wildGateway: false
    },
];

const pmsData = [
    {
        name: "Desmos",
        country: "France",
        modesSupported: ["Gateway", "V1 without Image", "V2"],
        devStatus: "In Prod",
        integrationType: ["Diagnostic", "Treatment Plan"],
        estimatedProdDate: "June 30, 2024"
    },
    {
        name: "Julie",
        country: "France",
        modesSupported: ["Gateway", "V2"],
        devStatus: "In Prod",
        integrationType: ["Diagnostic"],
        estimatedProdDate: "October 17, 2024"
    },
    {
        name: "Ulyses",
        country: "Spain",
        modesSupported: ["Gateway", "V2"],
        devStatus: "In Prod",
        integrationType: [],
        estimatedProdDate: "March 22, 2024"
    },
    {
        name: "WeClever",
        country: "France",
        modesSupported: ["Gateway", "V1 + Image", "V2"],
        devStatus: "In Prod",
        integrationType: ["Diagnostic"],
        estimatedProdDate: "June 3, 2024"
    },
    {
        name: "Veasy",
        country: "France",
        modesSupported: ["V1 without Image"],
        devStatus: "In Prod",
        integrationType: ["Diagnostic"],
        estimatedProdDate: "July 15, 2024"
    },
    {
        name: "Powerdent - Kopfwerk",
        country: "Austria",
        modesSupported: ["V1 without Image"],
        devStatus: "In Prod",
        integrationType: ["Diagnostic", "Treatment Plan"],
        estimatedProdDate: "July 15, 2024"
    },
    {
        name: "OrisDent - OrisLine",
        country: "Italy",
        modesSupported: ["V1 without Image"],
        devStatus: "In Prod",
        integrationType: ["Diagnostic", "Treatment Plan"],
        estimatedProdDate: "May 31, 2023"
    },
    {
        name: "SPDentaire",
        country: "France",
        modesSupported: ["V1 without Image", "Gateway", "V2"],
        devStatus: "In Prod",
        integrationType: ["Diagnostic", "Treatment Plan"],
        estimatedProdDate: "September 2, 2024"
    },
    {
        name: "Logosw",
        country: "France",
        modesSupported: ["V1 without Image", "V1 + Image"],
        devStatus: "In Prod",
        integrationType: ["Diagnostic"],
        estimatedProdDate: "June 24, 2024"
    },
    {
        name: "Biotech Dental",
        country: "France",
        modesSupported: [],
        devStatus: "In Prod",
        integrationType: ["CreateDiagnostic (legacy)"],
        estimatedProdDate: ""
    }
];

const pmsNames = pmsData.map(pms => pms.name);

const commonXraySoftwareForPms = [
    "VistaSoft - Durr Dental",
    "Romexis - Planmeca",
    "Sidexis - Dentsply Sirona",
    "CS Imaging - Carestream",
    "Ezdent-i - Vatech",
];

const gatewayV2Combinations = {
    "Desmos": ["CS Imaging - Carestream", "Sidexis - Dentsply Sirona", "Romexis - Planmeca"],
    "Julie": ["CS Imaging - Carestream"],
    "WeClever": ["CS Imaging - Carestream", "Ezdent-i - Vatech"],
    "SPDentaire": ["CS Imaging - Carestream"],
    "Ulyses": ["CS Imaging - Carestream"]
};

const specialCombinations = {
    "Desmos": commonXraySoftwareForPms,
    "Julie": commonXraySoftwareForPms,
    "Logosw": commonXraySoftwareForPms,
    "SPDentaire": commonXraySoftwareForPms,
    "Ulyses": commonXraySoftwareForPms,
    "WeClever": commonXraySoftwareForPms,
};

const wildGatewayData = []; // Populated as needed

const xraySoftwareLogos = {
    "AIS - Acteon": "https://sfe-endo.fr/wp-content/uploads/2023/05/ACTEON-logo.png", 
    "Cliniview - KaVo Instrumentarium": "https://cdn.elmed.cz/images/0/1ac8808f6d80b096/2/licence-cliniview-1-pc-network-user-add-on.jpg?hash=1487825817",
    "CS Imaging - Carestream": "https://www.comident.fr/wp-media/uploads/2023/10/CSD_Logo_NEW2020_Shadow.png",
    "DBSWin - Durr Dental": "https://cdn.bimedis.com/search/aimage/wide/1381652",
    "Dentrix Ascend - Henry Schein": "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_6cc28c7b4d8e98000efb5fea6a4ebd67/dentrix-ascend.png",
    "DTX Studio - Visualization": "https://www.dtxstudio.com/sites/g/files/wdvifx246/files/styles/mobile_375_full_width_x1/public/DTX%20Studio%20Clinic%20icon_pseudoteaser.png.webp?itok=ORa8G9yA",
    "Examine Pro - Examine Pro": "https://img.medicalexpo.fr/images_me/photo-mg/74092-8210123.jpg",
    "Ezdent-i - Vatech": "https://vatech-france.fr/wp-content/uploads/2019/12/Logo-1.png",
    "i-Dixel - Morita": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfL0hhKiLWqsm2x9VTWK6K60j3N6PbMPXjA&s",
    "iRYS - MyRay": "placeholder-xray.png",
    "Mediadent - Mediadent": "https://www.mipacs.com//_next/static/media/mipacs-by-apryse-colour.8b5ddab8.svg",
    "MiPACS Dental Enterprise Viewer - Medicor Imaging": "placeholder-xray.png",
    "NNT - Newtom": "https://alldent.nl/wp-content/uploads/2020/08/5958-nnt-logo_thumb.jpg",
    "QuickVision - Owandy": "https://www.owandy.fr/wp-content/uploads/2024/12/logo-QuickVision_white.png",
    "RayScan - Ray": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkSZoiRkki_lbu932Oxdjo09BygxAG51z5w&s",
    "Romexis - Planmeca": "https://www.lmdfrance.fr/public/img/big/maxresdefault1jpg_65f06fb46dd691.07855911.jpg",
    "Scanora - Soredex": "https://www.dentalsky.com/media/amasty/shopby/option_images/Soredex.jpg",
    "Sidexis - Dentsply Sirona": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg2FwEARD5XNGrlEuZqACvEvvOSXbRVABu6pSemIcUlNajL90u_LQSHpdtjgoSr_ourHo&usqp=CAU",
    "VisiQuick - Citodent": "https://i0.wp.com/www.citodent.com/wp-content/uploads/2016/12/cropped-Logo-VisiQuick.jpg?fit=512%2C512&ssl=1",
    "VistaSoft - Durr Dental": "https://help.vsmonitor.com/dd/graphics/00310898.png",
    "VixWin - Gendex": "placeholder-xray.png",
    "XrayVision - Apteryx Imaging": "https://media.dentalcompare.com/m/25/article/517681-134x100.jpg",
};

const pmsLogos = {
    "Biotech Dental": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/LOGO_BIOTECH_DENTAL-HD.jpg/1280px-LOGO_BIOTECH_DENTAL-HD.jpg",
    "Desmos": "https://astucetierspayant.fr/wp-content/uploads/2023/12/Desmos.jpg",
    "Julie": "https://www.julie.fr/julie_uploads/2022/10/logo-bleu-115x75-1.png",
    "Logosw": "https://www.logosw.net/telechargement/presse/logosw-1000.png",
    "OrisDent - OrisLine": "https://orisdent.com/wp-content/themes/orisdent/img/orisline-logo.png",
    "Powerdent - Kopfwerk": "https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/brand/2023_04_11_17_51_41_9/48614d56-6434-40fc-984e-307c8cf1960f-marca-powerdent-carrossel.svg",
    "SPDentaire": "https://www.sp-formations.eu/wp-content/uploads/2023/11/cropped-sante_rouge.webp",
    "Ulyses": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Vitaldent.svg/2560px-Vitaldent.svg.png",
    "Veasy": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3wfhXKXkJ2yWx4CSXQpO-LXcDTnRV32DbjQ&s",
    "WeClever": "https://weclever-dental.com/wp-content/uploads/2023/04/Weclever_Logo-Dental_Off_PNG.png",
};

const logoswGroups = {
    group1: [
        "CS Imaging - Carestream",
        "Sidexis - Dentsply Sirona",
        "Cliniview - KaVo Instrumentarium",
        "Scanora - Soredex"
    ],
    group2: [
        "Ezdent-i - Vatech",
        "QuickVision - Owandy",
        "iRYS - MyRay",
        "RayScan - Ray",
        "Examine Pro - Examine Pro"
    ],
    group3: [
        "Romexis - Planmeca",
        "AIS - Acteon",
        "VixWin - Gendex",
        "VistaSoft - Durr Dental",
        "Mediadent - Mediadent",
        "DBSWin - Durr Dental",
        "i-Dixel - Morita"
    ]
};

const translations = {
    en: {
        title: "🔍 Allisone Compatibility Checker",
        headerTitle: "✨ Compatibility Checker",
        allSoftware: "All Software 📋",
        gatewayCompatible: "Gateway Compatible 🌉",
        fullWatcher: "Full Watcher 👁️",
        watcherDicom: "Watcher + Dicom 🏥",
        watcherLight: "Watcher Light 💡",
        xraySoftware: "X-ray Software: 📷",
        selectXray: "Select X-ray software...",
        pms: "PMS: 💻",
        selectPms: "Select practice management system...",
        reset: "Reset 🔄",
        compatible: "Compatible ✅",
        showMatrix: "Show Complete Compatibility Matrix 📊",
        hideMatrix: "Hide Compatibility Matrix 📊",
        completeMatrix: "📊 Complete Compatibility Matrix",
        search: "Search software... 🔍",
        compact: "Compact 📏",
        detailed: "Detailed 📋",
        grouped: "Grouped 📂",
        export: "Export 📩",
        fullGateway: "Full Gateway Compatibility ✅",
        gatewayV2: "Gateway + V2 Compatibility ⭐",
        compatibleFull: "Compatible with Full Watcher 👁️",
        limitedCompat: "Limited Compatibility ⚠️",
        notCompat: "Not Compatible ❌",
        fullScreen: "Full Screen 🔍",
        exitFullScreen: "Exit Full Screen 🔍",
        viewDocs: "View Installation Guides 📚",
        installDocs: "Installation Documentation 📚",
        integrationType: "Integration Type",
        synchronization: "Synchronization",
        setupComplexity: "Setup Complexity",
        fullGatewayIntegration: "Full Gateway Integration",
        fullWatcherIntegration: "Full Watcher Integration",
        watcherLightIntegration: "Watcher Light Integration",
        notCompatibleIntegration: "Not Compatible",
        bidirectional: "Bidirectional data exchange",
        oneWay: "One-way synchronization",
        manualExport: "Manual export required",
        noIntegration: "No integration available",
        easy: "Easy",
        moderate: "Moderate",
        complex: "Complex",
        notAvailable: "Not Available",
        downloadManual: "Download Manual",
        contactSupport: "Contact Support",
        partiallyCompatible: "PARTIALLY COMPATIBLE",
        limitedCompatibility: "LIMITED COMPATIBILITY",
        notCompatible: "NOT COMPATIBLE",
        compatibilityDetails: "Compatibility Details",
        dataExchange: "Data Exchange",
        imageTransfer: "Image Transfer",
        patientSync: "Patient Sync",
        setupProcess: "Setup Process",
        autoBidirectional: "Automatic bidirectional",
        fullResolution: "Full resolution",
        automatic: "Automatic",
        easySetup: "Easy (30 minutes)",
        oneWaySynchronization: "One-way synchronization",
        manualMatching: "Manual matching",
        moderateSetup: "Moderate (1-2 hours)",
        manualExportOnly: "Manual export only",
        compressedImages: "Compressed images",
        complexSetup: "Complex (3+ hours)",
        perfectCompatibility: "Perfect Compatibility",
        goodCompatibility: "Good Compatibility",
        limitedCompatibilityText: "Limited Compatibility",
        noCompatibility: "No Compatibility",
        gateway: "GATEWAY",
        fullWatcherText: "FULL WATCHER",
        watcherLightText: "WATCHER LIGHT",
        incompatible: "INCOMPATIBLE",
        directIntegration: "Direct integration via Allisone Gateway",
        watcherIntegration: "Integration via Allisone Full Watcher",
        basicIntegration: "Basic integration via Watcher Light",
        noIntegrationAvailable: "No integration is available",
        installationGuide: "Installation Guide",
        getSupport: "Get Support",
        xraySoftwareLabel: "X-ray Software:",
        practiceManagementLabel: "Practice Management:"
    },
    fr: {
        title: "🔍 Vérificateur de Compatibilité Allisone",
        headerTitle: "✨ Vérificateur de Compatibilité",
        allSoftware: "Tous les Logiciels 📋",
        gatewayCompatible: "Compatible Gateway 🌉",
        fullWatcher: "Full Watcher 👁️",
        watcherDicom: "Watcher + Dicom 🏥",
        watcherLight: "Watcher Light 💡",
        xraySoftware: "Logiciel de Radiographie: 📷",
        selectXray: "Sélectionnez un logiciel de radiographie...",
        pms: "Logiciel de Gestion: 💻",
        selectPms: "Sélectionnez un système de gestion...",
        reset: "Réinitialiser 🔄",
        compatible: "Compatible ✅",
        showMatrix: "Afficher la Matrice de Compatibilité 📊",
        hideMatrix: "Masquer la Matrice de Compatibilité 📊",
        completeMatrix: "📊 Matrice de Compatibilité Complète",
        search: "Rechercher des logiciels... 🔍",
        compact: "Compact 📏",
        detailed: "Détaillé 📋",
        grouped: "Groupé 📂",
        export: "Exporter 📩",
        fullGateway: "Compatibilité Gateway Complète ✅",
        gatewayV2: "Compatibilité Gateway + V2 ⭐",
        compatibleFull: "Compatible avec Full Watcher 👁️",
        limitedCompat: "Compatibilité Limitée ⚠️",
        notCompat: "Non Compatible ❌",
        fullScreen: "Plein Écran 🔍",
        exitFullScreen: "Quitter le Plein Écran 🔍",
        viewDocs: "Voir les Guides d'Installation 📚",
        installDocs: "Documentation d'Installation 📚",
        integrationType: "Type d'Intégration",
        synchronization: "Synchronisation",
        setupComplexity: "Complexité d'Installation",
        fullGatewayIntegration: "Intégration Gateway Complète",
        fullWatcherIntegration: "Intégration Full Watcher",
        watcherLightIntegration: "Intégration Watcher Light",
        notCompatibleIntegration: "Non Compatible",
        bidirectional: "Échange de données bidirectionnel",
        oneWay: "Synchronisation unidirectionnelle",
        manualExport: "Export manuel requis",
        noIntegration: "Aucune intégration disponible",
        easy: "Facile",
        moderate: "Modérée",
        complex: "Complexe",
        notAvailable: "Non Disponible",
        downloadManual: "Télécharger le Manuel",
        contactSupport: "Contacter le Support",
        partiallyCompatible: "PARTIELLEMENT COMPATIBLE",
        limitedCompatibility: "COMPATIBILITÉ LIMITÉE",
        notCompatible: "NON COMPATIBLE",
        compatibilityDetails: "Compatibilité Détaillée",
        dataExchange: "Échange de données",
        imageTransfer: "Transfert d'images",
        patientSync: "Synchronisation des patients",
        setupProcess: "Processus d'installation",
        autoBidirectional: "Échange de données bidirectionnel automatique",
        fullResolution: "Résolution complète",
        automatic: "Automatique",
        easySetup: "Facile (30 minutes)",
        oneWaySynchronization: "Synchronisation unidirectionnelle",
        manualMatching: "Correspondance manuelle",
        moderateSetup: "Modérée (1-2 heures)",
        manualExportOnly: "Export manuel uniquement",
        compressedImages: "Images compressées",
        complexSetup: "Complexe (3+ heures)",
        perfectCompatibility: "Compatibilité parfaite",
        goodCompatibility: "Compatibilité bonne",
        limitedCompatibilityText: "Compatibilité limitée",
        noCompatibility: "Pas de compatibilité",
        gateway: "GATEWAY",
        fullWatcherText: "FULL WATCHER",
        watcherLightText: "WATCHER LIGHT",
        incompatible: "INCOMPATIBLE",
        directIntegration: "Intégration directe via Allisone Gateway",
        watcherIntegration: "Intégration via Allisone Full Watcher",
        basicIntegration: "Intégration de base via Watcher Light",
        noIntegrationAvailable: "Aucune intégration disponible",
        installationGuide: "Guide d'installation",
        getSupport: "Obtenir de l'aide",
        xraySoftwareLabel: "Logiciel de radiographie:",
        practiceManagementLabel: "Système de gestion:"
    },
    es: {
        title: "🔍 Verificador de Compatibilidad Allisone",
        headerTitle: "✨ Verificador de Compatibilidad",
        allSoftware: "Todo el Software 📋",
        gatewayCompatible: "Compatible con Gateway 🌉",
        fullWatcher: "Full Watcher 👁️",
        watcherDicom: "Watcher + Dicom 🏥",
        watcherLight: "Watcher Light 💡",
        xraySoftware: "Software de Rayos X: 📷",
        selectXray: "Seleccione software de rayos X...",
        pms: "Sistema de Gestión: 💻",
        selectPms: "Seleccione sistema de gestión...",
        reset: "Reiniciar 🔄",
        compatible: "Compatible ✅",
        showMatrix: "Mostrar Matriz de Compatibilidad 📊",
        hideMatrix: "Ocultar Matriz de Compatibilidad 📊",
        completeMatrix: "📊 Matriz Completa de Compatibilidad",
        search: "Buscar software... 🔍",
        compact: "Compacto 📏",
        detailed: "Detallado 📋",
        grouped: "Agrupado 📂",
        export: "Exportar 📩",
        fullGateway: "Compatibilidad Gateway Completa ✅",
        gatewayV2: "Compatibilidad Gateway + V2 ⭐",
        compatibleFull: "Compatible con Full Watcher 👁️",
        limitedCompat: "Compatibilidad Limitada ⚠️",
        notCompat: "No Compatible ❌",
        fullScreen: "Pantalla Completa 🔍",
        exitFullScreen: "Salir de Pantalla Completa 🔍",
        viewDocs: "Ver Guías de Instalación 📚",
        installDocs: "Documentación de Instalación 📚",
        integrationType: "Tipo de Integración",
        synchronization: "Sincronización",
        setupComplexity: "Complejidad de Configuración",
        fullGatewayIntegration: "Integración Gateway Completa",
        fullWatcherIntegration: "Integración Full Watcher",
        watcherLightIntegration: "Integración Watcher Light",
        notCompatibleIntegration: "No Compatible",
        bidirectional: "Intercambio bidireccional de datos",
        oneWay: "Sincronización unidireccional",
        manualExport: "Exportación manual requerida",
        noIntegration: "Sin integración disponible",
        easy: "Fácil",
        moderate: "Moderada",
        complex: "Compleja",
        notAvailable: "No Disponible",
        downloadManual: "Descargar Manual",
        contactSupport: "Contactar Soporte",
        partiallyCompatible: "PARCIALMENTE COMPATIBLE",
        limitedCompatibility: "COMPATIBILIDAD LIMITADA",
        notCompatible: "NO COMPATIBLE",
        compatibilityDetails: "Compatibilidad Detallada",
        dataExchange: "Intercambio de datos",
        imageTransfer: "Transferencia de imágenes",
        patientSync: "Sincronización de pacientes",
        setupProcess: "Proceso de instalación",
        autoBidirectional: "Intercambio bidireccional automático",
        fullResolution: "Resolución completa",
        automatic: "Automático",
        easySetup: "Fácil (30 minutos)",
        oneWaySynchronization: "Sincronización unidireccional",
        manualMatching: "Correspondencia manual",
        moderateSetup: "Moderada (1-2 horas)",
        manualExportOnly: "Exportación manual únicamente",
        compressedImages: "Imágenes comprimidas",
        complexSetup: "Compleja (3+ horas)",
        perfectCompatibility: "Compatibilidad perfecta",
        goodCompatibility: "Compatibilidad buena",
        limitedCompatibilityText: "Compatibilidad limitada",
        noCompatibility: "Sin compatibilidad",
        gateway: "GATEWAY",
        fullWatcherText: "FULL WATCHER",
        watcherLightText: "WATCHER LIGHT",
        incompatible: "INCOMPATIBLE",
        directIntegration: "Integración directa via Allisone Gateway",
        watcherIntegration: "Integración via Allisone Full Watcher",
        basicIntegration: "Integración básica via Watcher Light",
        noIntegrationAvailable: "No hay integración disponible",
        installationGuide: "Guía de instalación",
        getSupport: "Obtener soporte",
        xraySoftwareLabel: "Software de rayos X:",
        practiceManagementLabel: "Sistema de gestión:"
    }
};

// Function to set the language
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not found:', lang);
        return;
    }

    const currentTranslations = translations[lang];

    document.title = currentTranslations.title;
    
    const headerTitleEl = document.querySelector('.header-title');
    if (headerTitleEl) headerTitleEl.textContent = currentTranslations.headerTitle;
    
    const h1El = document.querySelector('h1');
    if (h1El) h1El.textContent = currentTranslations.title;

    document.querySelectorAll('.filter-btn').forEach((btn) => {
        const filterType = btn.dataset.filter;
        let translationKey = '';
        switch(filterType) {
            case 'all': translationKey = 'allSoftware'; break;
            case 'gateway': translationKey = 'gatewayCompatible'; break;
            case 'v1full': translationKey = 'fullWatcher'; break; // Matched to HTML data-filter
            case 'wildgateway': // Assuming a key for this, add if missing
                 // translationKey = 'wildGateway'; // Example, ensure this key exists in translations
                 break; 
            case 'v1light': // Assuming a key for this, add if missing
                // translationKey = 'v1Light'; // Example
                break;
            case 'v2': // Assuming a key for this
                // translationKey = 'v2Compatible'; // Example
                break;
        }
        if (translationKey && currentTranslations[translationKey]) {
            const icon = btn.querySelector('i');
            btn.innerHTML = '';
            if (icon) btn.appendChild(icon.cloneNode(true)); // Clone icon to preserve it
            btn.innerHTML += ' ' + currentTranslations[translationKey];
        }
    });
    
    const xrayLabelEl = document.querySelector('label[for="xraySoftware"]');
    if (xrayLabelEl) xrayLabelEl.innerHTML = `<i class="fas fa-x-ray"></i> ${currentTranslations.xraySoftware}`;
    
    const pmsLabelEl = document.querySelector('label[for="pms"]');
    if (pmsLabelEl) pmsLabelEl.innerHTML = `<i class="fas fa-laptop-medical"></i> ${currentTranslations.pms}`;
    
    const xraySelectDisabledOpt = document.querySelector('#xraySoftware option[disabled]');
    if (xraySelectDisabledOpt) xraySelectDisabledOpt.textContent = currentTranslations.selectXray;
    
    const pmsSelectDisabledOpt = document.querySelector('#pms option[disabled]');
    if (pmsSelectDisabledOpt) pmsSelectDisabledOpt.textContent = currentTranslations.selectPms;

    const resetButtonEl = document.querySelector('#resetButton');
    if (resetButtonEl) resetButtonEl.innerHTML = `<i class="fas fa-redo-alt"></i> ${currentTranslations.reset}`;

    // Update matrix toggle button
    const matrixToggleBtn = document.getElementById('matrixToggleBtn');
    if (matrixToggleBtn) {
        const isHidden = matrixToggleBtn.textContent.includes(translations['en'].showMatrix) || matrixToggleBtn.textContent.includes(translations['fr'].showMatrix) || matrixToggleBtn.textContent.includes(translations['es'].showMatrix) ; // Check across a base lang or current lang before change
        if (isHidden) {
            matrixToggleBtn.innerHTML = `<i class="fas fa-table"></i> ${currentTranslations.showMatrix}`;
        } else {
            matrixToggleBtn.innerHTML = `<i class="fas fa-chevron-up"></i> ${currentTranslations.hideMatrix}`;
        }
    }
    
    const matrixHeading = document.querySelector('#compatibility-matrix h2');
    if (matrixHeading) matrixHeading.textContent = currentTranslations.completeMatrix;

    const searchInput = document.getElementById('matrixSearchInput');
    if (searchInput) searchInput.placeholder = currentTranslations.search;

    document.querySelectorAll('.view-option').forEach((btn) => {
        const viewType = btn.dataset.view;
        if (viewType === 'compact' && currentTranslations.compact) btn.textContent = currentTranslations.compact;
        if (viewType === 'detailed' && currentTranslations.detailed) btn.textContent = currentTranslations.detailed;
        if (viewType === 'grouped' && currentTranslations.grouped) btn.textContent = currentTranslations.grouped;
    });

    const exportBtn = document.getElementById('exportMatrix');
    if (exportBtn) exportBtn.innerHTML = `<i class="fas fa-download"></i> ${currentTranslations.export}`;
    
    const legendItems = document.querySelectorAll('.legend-item');
    if (legendItems.length >= 5) {
        const legendKeys = ['fullGateway', 'gatewayV2', 'compatibleFull', 'limitedCompat', 'notCompat'];
        legendItems.forEach((item, index) => {
            if (index < legendKeys.length && currentTranslations[legendKeys[index]]) {
                const icon = item.querySelector('i');
                item.innerHTML = ''; // Clear existing content before appending
                if (icon) item.appendChild(icon.cloneNode(true));
                const span = document.createElement('span');
                span.textContent = currentTranslations[legendKeys[index]];
                item.appendChild(span);
            }
        });
    }

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) fullscreenBtn.innerHTML = `<i class="fas fa-expand"></i> ${currentTranslations.fullScreen}`;

    const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
    if (exitFullscreenBtn) exitFullscreenBtn.innerHTML = `<i class="fas fa-compress"></i> ${currentTranslations.exitFullScreen}`;
    
    const docsButton = document.querySelector('button.matrix-toggle-btn[style*="margin-top"]'); // More specific selector
    if (docsButton && !docsButton.id) { // Avoid re-translating the main matrix toggle button
         docsButton.innerHTML = `<i class="fas fa-book"></i> ${currentTranslations.viewDocs}`;
    }


    const docPanelTitle = document.getElementById('docPanelTitle');
    if (docPanelTitle) docPanelTitle.textContent = currentTranslations.installDocs;
    
    // Update result card (multi-option view)
    const outputCard = document.getElementById('output');
    if (outputCard && outputCard.classList.contains('result-card') && outputCard.style.display !== 'none') {
        // This implies the multi-option card is visible
        const statusTextEl = outputCard.querySelector('.status-text');
        const currentStatusKey = statusTextEl ? statusTextEl.dataset.statusKey : null; // Assume data-status-key="compatible" etc.
        if (statusTextEl && currentStatusKey && currentTranslations[currentStatusKey]) {
            statusTextEl.textContent = currentTranslations[currentStatusKey];
        }

        const resultPmsNameEl = document.getElementById('result-pms-name');
        const resultXrayNameEl = document.getElementById('result-xray-name');
        // PMS and X-ray names are data, not usually translated, but labels are:
        const pmsItemLabel = resultPmsNameEl ? resultPmsNameEl.closest('.software-item').querySelector('.item-label') : null;
        if(pmsItemLabel) pmsItemLabel.textContent = currentTranslations.practiceManagementLabel;
        const xrayItemLabel = resultXrayNameEl ? resultXrayNameEl.closest('.software-item').querySelector('.item-label') : null;
        if(xrayItemLabel) xrayItemLabel.textContent = currentTranslations.xraySoftwareLabel;

        // Option cards (more complex as their content is dynamic)
        // For simplicity, we might only translate static parts or re-render them if language changes.
        // Example for action buttons in multi-option view:
        const downloadAllGuidesBtn = outputCard.querySelector('.action-button.primary');
        if(downloadAllGuidesBtn) downloadAllGuidesBtn.innerHTML = `<i class="fas fa-download"></i> ${currentTranslations.downloadManual || 'Download All Guides'}`;
        const getSupportBtn = outputCard.querySelector('.action-button.secondary');
        if(getSupportBtn) getSupportBtn.innerHTML = `<i class="fas fa-headset"></i> ${currentTranslations.contactSupport || 'Get Support'}`;
    }
}


// DOM Elements
let xraySelect, pmsSelect, outputElement, logoDisplay, xrayLogoImg, pmsLogoImg, xrayLogoLabel, pmsLogoLabel;

// Sort data
xraySoftwareData.sort((a, b) => a.name.localeCompare(b.name));
pmsData.sort((a, b) => a.name.localeCompare(b.name));

function populateDropdowns() {
    xraySelect = document.getElementById("xraySoftware");
    pmsSelect = document.getElementById("pms");

    if (!xraySelect || !pmsSelect) return; // Exit if elements not found

    // Clear existing options except the placeholder
    while (xraySelect.options.length > 1) xraySelect.remove(1);
    while (pmsSelect.options.length > 1) pmsSelect.remove(1);
    
    xraySoftwareData.forEach((software) => {
        const option = document.createElement("option");
        option.value = software.name;
        option.textContent = software.name;
        xraySelect.appendChild(option);
    });

    pmsData.forEach((pms) => {
        const option = document.createElement("option");
        option.value = pms.name;
        option.textContent = pms.name;
        pmsSelect.appendChild(option);
    });
}

function updateOutput() {
    if (!xraySelect || !pmsSelect || !outputElement || !logoDisplay || !xrayLogoImg || !pmsLogoImg || !xrayLogoLabel || !pmsLogoLabel) {
        console.error("One or more DOM elements missing for updateOutput");
        return;
    }

    const selectedXray = xraySelect.value;
    const selectedPms = pmsSelect.value;

    outputElement.innerHTML = ""; 
    outputElement.className = 'result-card'; 
    
    logoDisplay.style.display = "none";
    document.getElementById("xrayLogo").style.display = "none";
    document.getElementById("pmsLogo").style.display = "none";
    const logoDividerEl = document.querySelector(".logo-divider");
    if (logoDividerEl) logoDividerEl.style.display = "none";
    
    if (!selectedXray || !selectedPms) {
        outputElement.style.display = "none";
        if (selectedXray) {
            const softwareName = selectedXray.split(" - ")[0];
            let xrayLogoSrc = xraySoftwareLogos[selectedXray] || "placeholder-xray.png";
            if (xrayLogoSrc.startsWith("https://example.com") || xrayLogoSrc.includes("google.com/url")) xrayLogoSrc = "placeholder-xray.png";
            xrayLogoImg.src = xrayLogoSrc;
            xrayLogoLabel.textContent = softwareName;
            document.getElementById("xrayLogo").style.display = "block";
            logoDisplay.style.display = "flex";
        }
        if (selectedPms) {
            let pmsLogoSrc = pmsLogos[selectedPms] || "placeholder-pms.png";
            if (pmsLogoSrc.startsWith("https://example.com") || pmsLogoSrc.includes("google.com/url")) pmsLogoSrc = "placeholder-pms.png";
            pmsLogoImg.src = pmsLogoSrc;
            pmsLogoLabel.textContent = selectedPms;
            document.getElementById("pmsLogo").style.display = "block";
            logoDisplay.style.display = "flex";
        }
        if (selectedXray && selectedPms && logoDividerEl) {
             logoDividerEl.style.display = "flex";
        }

        if (selectedXray || selectedPms) {
            const selectionPrompt = document.createElement("div");
            selectionPrompt.classList.add("selection-prompt"); 
            selectionPrompt.innerHTML = `<i class="fas fa-info-circle"></i> Please select both an X-ray software and a PMS to view compatibility information`;
            outputElement.appendChild(selectionPrompt);
            outputElement.style.display = "block"; 
        }
        return;
    }
    
    const xraySoftwareNameForLogo = selectedXray.split(" - ")[0];
    let currentXrayLogoSrc = xraySoftwareLogos[selectedXray] || "placeholder-xray.png";
    if (currentXrayLogoSrc.startsWith("https://example.com") || currentXrayLogoSrc.includes("google.com/url")) currentXrayLogoSrc = "placeholder-xray.png";
    xrayLogoImg.src = currentXrayLogoSrc;
    xrayLogoLabel.textContent = xraySoftwareNameForLogo;
    document.getElementById("xrayLogo").style.display = "block";
    
    let currentPmsLogoSrc = pmsLogos[selectedPms] || "placeholder-pms.png";
    if (currentPmsLogoSrc.startsWith("https://example.com") || currentPmsLogoSrc.includes("google.com/url")) currentPmsLogoSrc = "placeholder-pms.png";
    pmsLogoImg.src = currentPmsLogoSrc;
    pmsLogoLabel.textContent = selectedPms;
    document.getElementById("pmsLogo").style.display = "block";
    
    logoDisplay.style.display = "flex";
    if (logoDividerEl) logoDividerEl.style.display = "flex";
    
    const xraySoftwareDetails = xraySoftwareData.find((software) => software.name === selectedXray);
    const pmsDetails = pmsData.find(pms => pms.name === selectedPms);

    const isMultiOption = selectedPms === "Logosw" && 
        (logoswGroups.group1.includes(selectedXray) || 
         logoswGroups.group2.includes(selectedXray) || 
         logoswGroups.group3.includes(selectedXray));

    if (isMultiOption) { 
        outputElement.classList.remove('detailed-output'); // Make sure it's not in detailed mode
        outputElement.classList.add('result-card'); // Ensure multi-option view is active

        // Populate the static parts of the multi-option view
        const resultXrayNameEl = document.getElementById('result-xray-name');
        const resultPmsNameEl = document.getElementById('result-pms-name');
        if(resultXrayNameEl) resultXrayNameEl.textContent = selectedXray;
        if(resultPmsNameEl) resultPmsNameEl.textContent = selectedPms;

        const statusBar = outputElement.querySelector('.result-status-bar');
        const statusText = outputElement.querySelector('.status-text');
        const statusIcon = outputElement.querySelector('.status-icon i');

        if(statusBar) statusBar.className = 'result-status-bar'; // Default compatible
        if(statusText) {
            statusText.textContent = (translations[localStorage.getItem('language') || 'en'] || translations.en).compatible.toUpperCase();
            statusText.dataset.statusKey = 'compatible';
        }
        if(statusIcon) statusIcon.className = 'fas fa-check-circle';
        
        const optionsContainer = outputElement.querySelector('.options-container');
        if(optionsContainer){
            optionsContainer.innerHTML = ''; // Clear previous options
            
            let reportSyncTitle = "Report Synchronisation";
            let reportSyncTechDetail = "(through v1)";
            let reportSyncFeatures = [
                { icon: "fas fa-sync-alt", text: "Bidirectional data sync" },
                { icon: "fas fa-file-medical", text: "Complete report transfer" },
                { icon: "fas fa-user", text: "Automatic patient matching" }
            ];

            if (logoswGroups.group1.includes(selectedXray)) { 
                reportSyncTechDetail = "(Full Watcher)";
            } else if (logoswGroups.group2.includes(selectedXray)) { 
                reportSyncTechDetail = "(Full Watcher DICOM)";
            } else if (logoswGroups.group3.includes(selectedXray)) { 
                 reportSyncTechDetail = "(Watcher Light)";
                 reportSyncFeatures = [ 
                    { icon: "fas fa-upload", text: "One-way report upload" },
                    { icon: "fas fa-file-alt", text: "Report transfer" },
                    { icon: "fas fa-user-times", text: "Manual patient matching" }
                 ];
            }
            optionsContainer.appendChild(createOptionCard("OPTION 1", reportSyncTitle, "Full report synchronisation with patient matching.", reportSyncTechDetail, reportSyncFeatures, "#", ""));

            optionsContainer.appendChild(createOptionCard("OPTION 2", "Instant X-ray Acquisition", "Direct X-ray acquisition without report synchronisation.", "(through v2 connector)", [
                { icon: "fas fa-bolt", text: "Instant image capture" },
                { icon: "fas fa-image", text: "High-quality images" },
                { icon: "fas fa-arrows-alt", text: "Direct integration" }
            ], "#", ""));
            
            if (xraySoftwareDetails && xraySoftwareDetails.wildGateway) {
                 optionsContainer.appendChild(createOptionCard("OPTION 3", "Allisone as X-ray Software", "Using Allisone as an X-ray software without report synchronisation.", "(through wild gateway)", [
                    { icon: "fas fa-mountain", text: "Wild Gateway integration" },
                    { icon: "fas fa-database", text: "Common database" },
                    { icon: "fas fa-cogs", text: "Customizable workflow" }
                ], "#", "Created by Jordan | 7 Nov 2022")); 
            }
        }
    } else {
        // Single detailed view
        outputElement.classList.add('detailed-output'); 
        outputElement.classList.remove('result-card');
        
        const resultContainer = document.createElement('div'); 
        resultContainer.classList.add('result-content-detailed'); 

        const description = document.createElement('div');
        description.classList.add('compatibility-description');
        description.textContent = `Integration between ${selectedXray} and ${selectedPms}`;
        resultContainer.appendChild(description);

        if (xraySoftwareDetails && (xraySoftwareDetails.v2ServerMode || xraySoftwareDetails.v2BridgeMode || xraySoftwareDetails.wildGateway)) {
            const xraySection = document.createElement('div');
            xraySection.classList.add('compatibility-section');
            const xrayTitle = document.createElement('h4');
            xrayTitle.classList.add('section-title');
            xrayTitle.innerHTML = '<i class="fas fa-cogs item-icon-small"></i> X-ray Integration Capabilities';
            xraySection.appendChild(xrayTitle);
            const xrayList = document.createElement('ul');
            xrayList.classList.add('compatibility-list');

            if (xraySoftwareDetails.v2ServerMode) {
                const item = document.createElement('li');
                item.classList.add('compatibility-item');
                item.innerHTML = `<i class="fas fa-server item-icon-small"></i><span>A+ v2 Server Mode ${xraySoftwareDetails.genericDicom ? "(Generic DICOM)" : ""}</span>`;
                xrayList.appendChild(item);
            }
            if (xraySoftwareDetails.v2BridgeMode) {
                const item = document.createElement('li');
                item.classList.add('compatibility-item');
                item.innerHTML = `<i class="fas fa-exchange-alt item-icon-small"></i><span>A+ v2 Bridge Mode ${xraySoftwareDetails.bridgeStatus ? `(${xraySoftwareDetails.bridgeStatus})` : ""}</span>`;
                xrayList.appendChild(item);
            }
            if (xraySoftwareDetails.wildGateway) {
                const item = document.createElement('li');
                item.classList.add('compatibility-item');
                item.innerHTML = `<i class="fas fa-wifi item-icon-small"></i><span>A+ Wild Gateway ${xraySoftwareDetails.wildGatewayStatus ? `(${xraySoftwareDetails.wildGatewayStatus})` : ""}</span>`;
                xrayList.appendChild(item);
            }
            xraySection.appendChild(xrayList);
            resultContainer.appendChild(xraySection);
        }

        if (pmsDetails) {
            resultContainer.appendChild(addPmsIntegrationModes(pmsDetails)); 
        }

        const note = document.createElement('div');
        note.classList.add('compatibility-note');
        note.innerHTML = '<i class="fas fa-info-circle item-icon-small"></i> Check with your Allisone representative for specific integration details for this combination.';
        resultContainer.appendChild(note);

        resultContainer.appendChild(addInstallationGuideLinks(selectedXray, selectedPms)); 
        outputElement.appendChild(resultContainer);
        addVideoPlaceholdersForPMS(selectedPms, outputElement); 
    }
    
    outputElement.style.display = "block";
}

function addPmsIntegrationModes(pmsDetails) { 
    const pmsSection = document.createElement('div');
    pmsSection.classList.add('compatibility-section');
    let contentAdded = false;

    if (pmsDetails.modesSupported && pmsDetails.modesSupported.length > 0) {
        contentAdded = true;
        const modesTitle = document.createElement("h4");
        modesTitle.classList.add('section-title');
        modesTitle.innerHTML = '<i class="fas fa-sliders-h item-icon-small"></i> Modes Supported';
        pmsSection.appendChild(modesTitle);
        
        const modesList = document.createElement("ul");
        modesList.classList.add('compatibility-list');
        pmsDetails.modesSupported.forEach(mode => {
            const item = document.createElement('li');
            item.classList.add('compatibility-item');
            let iconClass = "fas fa-question-circle"; 
            if (mode === "Gateway") iconClass = "fas fa-wifi";
            else if (mode === "V1 + Image") iconClass = "fas fa-image";
            else if (mode === "V1 without Image") iconClass = "fas fa-file-alt";
            else if (mode === "V2") iconClass = "fas fa-code-branch";
            item.innerHTML = `<i class="${iconClass} item-icon-small"></i><span>${mode}</span>`;
            modesList.appendChild(item);
        });
        pmsSection.appendChild(modesList);
    }
    
    if (pmsDetails.integrationType && pmsDetails.integrationType.length > 0) {
        contentAdded = true;
        const typesTitle = document.createElement("h4");
        typesTitle.classList.add('section-title');
        typesTitle.innerHTML = '<i class="fas fa-plug item-icon-small"></i> Integration Types';
        if(pmsDetails.modesSupported && pmsDetails.modesSupported.length > 0) typesTitle.style.marginTop = "20px"; 
        pmsSection.appendChild(typesTitle);
        
        const typesList = document.createElement("ul");
        typesList.classList.add('compatibility-list');
        pmsDetails.integrationType.forEach(type => {
            const item = document.createElement('li');
            item.classList.add('compatibility-item');
            let iconClass = "fas fa-cogs"; 
            if (type === "Diagnostic") iconClass = "fas fa-microscope";
            else if (type === "Treatment Plan") iconClass = "fas fa-clipboard-list";
            else if (type === "CreateDiagnostic (legacy)") iconClass = "fas fa-history";
            item.innerHTML = `<i class="${iconClass} item-icon-small"></i><span>${type}</span>`;
            typesList.appendChild(item);
        });
        pmsSection.appendChild(typesList);
    }
    
    return contentAdded ? pmsSection : document.createDocumentFragment(); 
}

function addInstallationGuideLinks(selectedXray, selectedPms) { 
    const guidesSection = document.createElement('div');
    guidesSection.classList.add('compatibility-section');

    const header = document.createElement("h4");
    header.classList.add('section-title');
    header.innerHTML = '<i class="fas fa-book-open item-icon-small"></i> Installation Guides';
    guidesSection.appendChild(header);
    
    const guidesList = document.createElement("ul");
    guidesList.classList.add('compatibility-list'); 
    
    let hasGuides = false;
    
    if (selectedXray && notionLinks.software[selectedXray]) {
        const listItem = document.createElement("li");
        listItem.classList.add('guide-item'); 
        const link = document.createElement("a");
        link.href = notionLinks.software[selectedXray];
        link.target = "_blank";
        link.classList.add("guide-link");
        link.rel = "noopener noreferrer";
        link.innerHTML = `<i class="fas fa-file-alt item-icon-small"></i><span>${selectedXray} Installation Guide</span><i class="fas fa-external-link-alt" style="margin-left:auto; opacity:0.7;"></i>`;
        listItem.appendChild(link);
        guidesList.appendChild(listItem);
        hasGuides = true;
    }
    
    if (selectedPms && notionLinks.pms[selectedPms]) {
        const listItem = document.createElement("li");
        listItem.classList.add('guide-item');
        const link = document.createElement("a");
        link.href = notionLinks.pms[selectedPms];
        link.target = "_blank";
        link.classList.add("guide-link");
        link.rel = "noopener noreferrer";
        link.innerHTML = `<i class="fas fa-cog item-icon-small"></i><span>${selectedPms} Setup Guide</span><i class="fas fa-external-link-alt" style="margin-left:auto; opacity:0.7;"></i>`;
        listItem.appendChild(link);
        guidesList.appendChild(listItem);
        hasGuides = true;
    }
    
    if (selectedXray && selectedPms && notionLinks.integration[selectedXray]?.[selectedPms]) {
        const listItem = document.createElement("li");
        listItem.classList.add('guide-item');
        const link = document.createElement("a");
        link.href = notionLinks.integration[selectedXray][selectedPms];
        link.target = "_blank";
        link.classList.add("guide-link");
        link.rel = "noopener noreferrer";
        link.innerHTML = `<i class="fas fa-link item-icon-small"></i><span>${selectedXray} + ${selectedPms} Integration Guide</span><i class="fas fa-external-link-alt" style="margin-left:auto; opacity:0.7;"></i>`;
        listItem.appendChild(link);
        guidesList.appendChild(listItem);
        hasGuides = true;
    }
    
    if (!hasGuides) {
        const listItem = document.createElement("li");
        listItem.classList.add('compatibility-item'); 
        listItem.innerHTML = '<i class="fas fa-info-circle item-icon-small"></i><span>No specific installation guides available for this combination.</span>';
        guidesList.appendChild(listItem);
    }
    guidesSection.appendChild(guidesList);
    
    const viewAllItem = document.createElement('li');
    viewAllItem.classList.add('guide-item', 'view-all-guides'); 
    const viewAllLink = document.createElement('a');
    viewAllLink.href = "#"; 
    viewAllLink.classList.add('guide-link');
    viewAllLink.innerHTML = '<i class="fas fa-th-list item-icon-small"></i><span>View all installation guides</span>';
    viewAllLink.onclick = function(e) { e.preventDefault(); if(typeof showAllDocumentation === 'function') showAllDocumentation(); };
    viewAllItem.appendChild(viewAllLink);
    guidesList.appendChild(viewAllItem); 

    return guidesSection;
}

function addVideoPlaceholdersForPMS(pms, containerElement) { 
    if (!containerElement) return; 

    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video-placeholders-container"); 
    let videoPlaceholderHTML = "";

    switch (pms) {
        case "Julie":
            videoPlaceholderHTML = `
                <video controls class="video-placeholder">
                    <source src="videos/Julie_gateway.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        case "Logosw":
            videoPlaceholderHTML = `
                <video controls class="video-placeholder">
                    <source src="videos/Logosw.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <video controls class="video-placeholder">
                    <source src="videos/Allisone_v2_acquisition.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        default:
            return; 
    }

    if(videoPlaceholderHTML){
        const videoSection = document.createElement('div');
        videoSection.classList.add('compatibility-section');
        const videoTitle = document.createElement('h4');
        videoTitle.classList.add('section-title');
        videoTitle.innerHTML = '<i class="fas fa-video item-icon-small"></i> Demonstrations';
        videoSection.appendChild(videoTitle);
        videoContainer.innerHTML = videoPlaceholderHTML;
        videoSection.appendChild(videoContainer);
        containerElement.appendChild(videoSection);
    }
}

function createOptionCard(badgeText, titleText, descriptionHtml, techDetailText, features, linkUrl, creationInfoText) {
    const card = document.createElement('div');
    card.className = 'option-card';

    const header = document.createElement('div');
    header.className = 'option-header';
    header.innerHTML = `
        <div class="option-badge">${badgeText}</div>
        <div class="option-title">${titleText}</div>
    `;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'option-body';
    body.innerHTML = `
        <div class="option-description">
            <p>${descriptionHtml}</p>
            <div class="option-tech-detail">${techDetailText}</div>
        </div>
    `;
    
    const featuresContainer = document.createElement('div');
    featuresContainer.className = 'option-features';
    features.forEach(feature => {
        const featureEl = document.createElement('div');
        featureEl.className = 'option-feature';
        featureEl.innerHTML = `<i class="${feature.icon} feature-icon"></i><span>${feature.text}</span>`;
        featuresContainer.appendChild(featureEl);
    });
    body.appendChild(featuresContainer);
    card.appendChild(body);

    const footer = document.createElement('div');
    footer.className = 'option-footer';
    let footerHTML = `<a href="${linkUrl}" class="option-link" target="_blank" rel="noopener noreferrer">View Setup Guide</a>`;
    if (creationInfoText) {
        footerHTML += `<div class="creation-info">${creationInfoText}</div>`;
    }
    footer.innerHTML = footerHTML;
    card.appendChild(footer);

    return card;
}

// From index.html script block 1
function updateResultCard(compatibility) {
    const output = document.getElementById('output');
    if (!output) return; 

    const xraySoftwareEl = document.getElementById('xraySoftware');
    const pmsEl = document.getElementById('pms');
    if(!xraySoftwareEl || !pmsEl) return;

    const xraySoftware = xraySoftwareEl.selectedOptions[0] ? xraySoftwareEl.selectedOptions[0].text : "N/A";
    const pms = pmsEl.selectedOptions[0] ? pmsEl.selectedOptions[0].text : "N/A";
    
    const xrayNameEl = document.getElementById('result-xray-name');
    if (xrayNameEl) xrayNameEl.textContent = xraySoftware;
    
    const pmsNameEl = document.getElementById('result-pms-name');
    if (pmsNameEl) pmsNameEl.textContent = pms;
    
    // This function seems to target the multi-option card structure
    // Ensure it only runs if that structure is present.
    // If output is in 'detailed-output' mode, this function should not alter it.
    if (output.classList.contains('detailed-output')) {
        // console.warn("updateResultCard called while in detailed view. Aborting update to prevent conflicts.");
        return;
    }
    output.classList.add('result-card'); // Ensure it has the base class for multi-option
    output.classList.remove('detailed-output');


    const statusBar = output.querySelector('.result-status-bar');
    const statusText = output.querySelector('.status-text');
    const statusIcon = output.querySelector('.status-icon i');
    
    // The following selectors are specific to an older/different result card design
    // that was present in index.html's updateResultCard.
    // They might not match the current "multi-option" card structure populated by createOptionCard.
    // We need to decide which card structure is the current one for this function.
    // For now, assuming the multi-option view does not use these specific feature-item elements directly.

    const currentLang = localStorage.getItem('language') || 'en';
    const currentTranslations = translations[currentLang] || translations.en;

    if (statusBar && statusText && statusIcon) {
        if (compatibility === 'full') {
            statusBar.className = 'result-status-bar'; // Default green
            statusText.textContent = currentTranslations.compatible.toUpperCase();
            statusText.dataset.statusKey = 'compatible';
            statusIcon.className = 'fas fa-check-circle';
        } else if (compatibility === 'partial') {
            statusBar.className = 'result-status-bar partial';
            statusText.textContent = currentTranslations.partiallyCompatible.toUpperCase();
            statusText.dataset.statusKey = 'partiallyCompatible';
            statusIcon.className = 'fas fa-check-circle'; // Or a different icon
        } else if (compatibility === 'limited') {
            statusBar.className = 'result-status-bar limited';
            statusText.textContent = currentTranslations.limitedCompatibility.toUpperCase();
            statusText.dataset.statusKey = 'limitedCompatibility';
            statusIcon.className = 'fas fa-exclamation-triangle';
        } else { // Incompatible or other states
            statusBar.className = 'result-status-bar incompatible';
            statusText.textContent = currentTranslations.notCompatible.toUpperCase();
            statusText.dataset.statusKey = 'notCompatible';
            statusIcon.className = 'fas fa-times';
        }
    }
            
    output.style.display = 'block';
    const logoDisp = document.getElementById('logoDisplay');
    if (logoDisp) {
        logoDisp.style.display = 'flex';
    }
}

function addColumnHighlighting() {
    const table = document.getElementById('matrixTable');
    if (!table) return;
    const headerCells = table.querySelectorAll('thead th');
    
    headerCells.forEach((cell, index) => {
        if (index === 0) return; 
        
        cell.addEventListener('mouseenter', () => {
            cell.classList.add('highlighted-col');
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const rCell = row.querySelectorAll('td')[index];
                if (rCell) rCell.classList.add('highlighted-col');
            });
        });
        
        cell.addEventListener('mouseleave', () => {
            cell.classList.remove('highlighted-col');
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const rCell = row.querySelectorAll('td')[index];
                if (rCell) rCell.classList.remove('highlighted-col');
            });
        });
    });
}

function generateCompatibilityMatrix(viewType) {
    const table = document.getElementById('matrixTable');
    if (!table) return;
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');
    if (!thead || !tbody) return;
    
    while (thead.children.length > 1) {
        thead.removeChild(thead.lastChild);
    }
    tbody.innerHTML = '';
    
    pmsData.forEach(pmsObject => { 
        const th = document.createElement('th');
        const pmsName = pmsObject.name; 
        if (typeof pmsName === 'string' && pmsName.includes(' - ')) {
            th.textContent = pmsName.split(' - ')[0];
            th.setAttribute('title', pmsName); 
        } else {
            th.textContent = pmsName; 
            th.setAttribute('title', String(pmsName)); 
        }
        thead.appendChild(th);
    });
    
    if (viewType === 'grouped') {
        const groups = {
            'Full Watcher Dicom': [],
            'Full Watcher': [],
            'Watcher Light': [],
            'Other': []
        };
        
        xraySoftwareData.forEach(software => {
            if (software.output.includes('Full Watcher Dicom')) {
                groups['Full Watcher Dicom'].push(software);
            } else if (software.output.includes('Full Watcher') && !software.output.includes('Dicom')) {
                groups['Full Watcher'].push(software);
            } else if (software.output.includes('Watcher Light')) {
                groups['Watcher Light'].push(software);
            } else {
                groups['Other'].push(software);
            }
        });
        
        Object.entries(groups).forEach(([groupName, softwares]) => {
            if (softwares.length === 0) return;
            
            const headerRow = document.createElement('tr');
            const headerCell = document.createElement('td');
            headerCell.textContent = groupName;
            headerCell.colSpan = pmsData.length + 1;
            headerCell.classList.add('matrix-section-header');
            headerRow.appendChild(headerCell);
            headerRow.classList.add('matrix-section-row');
            tbody.appendChild(headerRow);
            
            softwares.forEach(software => {
                addSoftwareRow(software, tbody, viewType);
            });
        });
    } else {
        // Regular sorting (alphabetical) or detailed
        xraySoftwareData.forEach(software => {
            addSoftwareRow(software, tbody, viewType); // addSoftwareRow handles detailed vs compact name
        });
    }
    
    addColumnHighlighting();
    
    setTimeout(() => {
        const container = document.querySelector('.matrix-table-container');
        if (container) {
            container.style.display = 'block';
            container.style.width = '100%';
        }
    }, 100);
}

function addSoftwareRow(software, tbody, viewType) {
    const tr = document.createElement('tr');
    
    const tdName = document.createElement('td');
    if (viewType === 'detailed') {
        tdName.textContent = software.name; 
    } else {
        tdName.textContent = software.name.split(' - ')[0]; 
    }
    
    if (notionLinks.software[software.name]) {
        const docLink = document.createElement('button');
        docLink.classList.add('doc-link-btn');
        docLink.innerHTML = '<i class="fas fa-book"></i>';
        docLink.title = 'View documentation';
        docLink.type = 'button';
        docLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const docUrl = notionLinks.software[software.name];
            window.open(docUrl, '_blank');
        });
        tdName.appendChild(docLink);
    }
    tr.appendChild(tdName);
    
    pmsData.forEach(pmsObject => { 
        const td = document.createElement('td');
        td.classList.add('compatibility-cell');
        const pmsName = pmsObject.name; 
        
        let tooltipContent = '';
        const hasIntegrationDoc = notionLinks.integration[software.name]?.[pmsName];
        if (hasIntegrationDoc) {
            td.classList.add('has-docs');
        }
        
        const isSpecialCombo = specialCombinations[pmsName]?.includes(software.name);
        const hasGatewayV2 = gatewayV2Combinations[pmsName]?.includes(software.name);

        if (isSpecialCombo) {
            if (hasGatewayV2) {
                td.innerHTML = '<i class="fas fa-star compatibility-check"></i>'; // Gateway + V2
                tooltipContent = 'Gateway + V2 Compatibility';
            } else {
                td.innerHTML = '<i class="fas fa-check compatibility-check"></i>'; // Standard Gateway
                tooltipContent = 'Full Gateway Compatibility';
            }
        } else if (software.output.includes('Full Watcher Dicom')) {
            td.innerHTML = '<i class="fas fa-check-circle compatibility-partial"></i>';
            tooltipContent = 'Compatible with Full Watcher Dicom';
        } else if (software.output.includes('Full Watcher')) {
            td.innerHTML = '<i class="fas fa-check-circle compatibility-partial"></i>';
            tooltipContent = 'Compatible with Full Watcher';
        } else if (software.output.includes('Watcher Light')) {
            td.innerHTML = '<i class="fas fa-exclamation-triangle compatibility-partial"></i>';
            tooltipContent = 'Limited compatibility: Watcher Light + Dicom export';
        } else {
            td.innerHTML = '<i class="fas fa-times compatibility-cross"></i>';
            tooltipContent = 'Not compatible';
        }
        
        if (viewType === 'detailed' && isSpecialCombo) {
            tooltipContent += ' with X-ray acquisition and synchronisation';
        }
        if (hasIntegrationDoc) {
            tooltipContent += ' (Documentation available)';
        }
        
        const tooltip = document.createElement('div');
        tooltip.classList.add('compatibility-tooltip');
        tooltip.textContent = tooltipContent;
        td.appendChild(tooltip);
        
        if (hasIntegrationDoc) {
            td.addEventListener('click', function() {
                window.open(notionLinks.integration[software.name][pmsName], '_blank');
            });
        }
        tr.appendChild(td);
    });
    tbody.appendChild(tr);
}

function filterSoftwareOptions(filterType) {
    const xraySelectToFilter = document.getElementById('xraySoftware');
    if (!xraySelectToFilter) return;
    
    while (xraySelectToFilter.options.length > 1) {
        xraySelectToFilter.remove(1);
    }
    
    let filteredData = [];
    switch(filterType) {
        case 'all':
            filteredData = xraySoftwareData;
            break;
        case 'gateway': // Assuming 'gateway' corresponds to 'specialCombinations' logic broadly
            // This needs a clear definition. For now, let's show all if not specifically filtered by a capability.
            // Or, more accurately, X-ray software that *can* be part of a gateway.
             filteredData = xraySoftwareData.filter(software => 
                Object.values(specialCombinations).some(list => list.includes(software.name)) ||
                Object.values(gatewayV2Combinations).some(list => list.includes(software.name))
            );
            break;
        case 'wildgateway':
            filteredData = xraySoftwareData.filter(software => software.wildGateway === true);
            break;
        case 'v1light': // Watcher Light
            filteredData = xraySoftwareData.filter(software => software.output.includes('Watcher Light'));
            break;
        case 'v1full': // Full Watcher (Dicom or not)
            filteredData = xraySoftwareData.filter(software => software.output.includes('Full Watcher'));
            break;
        case 'v2': // All V2 capable (Server or Bridge)
            filteredData = xraySoftwareData.filter(software => software.v2ServerMode === true || software.v2BridgeMode === true);
            break;
        default:
            filteredData = xraySoftwareData;
    }
    
    filteredData.forEach((software) => {
        const option = document.createElement("option");
        option.value = software.name;
        option.textContent = software.name;
        xraySelectToFilter.appendChild(option);
    });
}

function setupDocumentationPanel() {
    const docPanel = document.getElementById('docPanel');
    const docOverlay = document.getElementById('docOverlay');
    const docPanelClose = document.getElementById('docPanelClose');
    
    if (!docPanel || !docOverlay || !docPanelClose) return;

    docPanelClose.addEventListener('click', function() {
        docPanel.classList.remove('active');
        docOverlay.classList.remove('active');
    });
    
    docOverlay.addEventListener('click', function() {
        docPanel.classList.remove('active');
        docOverlay.classList.remove('active');
    });
}

function showAllDocumentation() {
    const docPanel = document.getElementById('docPanel');
    const docOverlay = document.getElementById('docOverlay');
    const docPanelTitle = document.getElementById('docPanelTitle');
    const docList = document.getElementById('docList');

    if (!docPanel || !docOverlay || !docPanelTitle || !docList) return;
    
    docPanelTitle.textContent = (translations[localStorage.getItem('language') || 'en'] || translations.en).installDocs || 'All Installation Guides';
    docList.innerHTML = '';
    
    const softwareDocs = Object.entries(notionLinks.software);
    if (softwareDocs.length > 0) {
        const softwareHeader = document.createElement('h4');
        softwareHeader.textContent = 'X-ray Software';
        softwareHeader.style.fontSize = '1.1rem';
        softwareHeader.style.marginTop = '10px';
        softwareHeader.style.marginBottom = '15px';
        docList.appendChild(softwareHeader);
        
        softwareDocs.forEach(([name, url]) => {
            const listItem = createDocListItem(name, url);
            // Add status indicator logic if needed (similar to index.html's version)
            docList.appendChild(listItem);
        });
    }
    
    const pmsDocs = Object.entries(notionLinks.pms);
    if (pmsDocs.length > 0) {
        const pmsHeader = document.createElement('h4');
        pmsHeader.textContent = 'PMS Systems';
        pmsHeader.style.fontSize = '1.1rem';
        pmsHeader.style.marginTop = '25px';
        pmsHeader.style.marginBottom = '15px';
        docList.appendChild(pmsHeader);
        
        pmsDocs.forEach(([name, url]) => {
            const listItem = createDocListItem(name, url);
            docList.appendChild(listItem);
        });
    }
    
    // Integration Docs (Could be a third section)
    // Object.entries(notionLinks.integration).forEach(([xrayName, pmsLinks]) => {
    // For each pmsLink in pmsLinks... createDocListItem
    // });

    docPanel.classList.add('active');
    docOverlay.classList.add('active');
}

function createDocListItem(name, url) {
    const li = document.createElement('li');
    li.classList.add('doc-list-item');
    
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.classList.add('doc-list-link');
    link.rel = 'noopener noreferrer';
    
    const icon = document.createElement('div');
    icon.classList.add('doc-list-icon');
    if (name.includes('Carestream') || name.includes('CS Imaging')) {
        icon.innerHTML = '<i class="fas fa-teeth"></i>';
    } else if (name.includes('Julie') || name.includes('Desmos') || name.includes('WeClever')) {
        icon.innerHTML = '<i class="fas fa-laptop-medical"></i>';
    } else {
        icon.innerHTML = '<i class="fas fa-file-alt"></i>';
    }
    
    const info = document.createElement('div');
    info.classList.add('doc-list-info');
    
    const title = document.createElement('div');
    title.classList.add('doc-list-title');
    title.textContent = name;
    
    const desc = document.createElement('div');
    desc.classList.add('doc-list-desc');
    desc.textContent = 'Installation and configuration guide';
    
    info.appendChild(title);
    info.appendChild(desc);
    link.appendChild(icon);
    link.appendChild(info);
    li.appendChild(link);
    return li;
}

function toggleFullscreen() {
    const matrixSection = document.getElementById('compatibility-matrix');
    if (!matrixSection) return;
    const isFullscreen = matrixSection.classList.contains('fullscreen-mode');
    if (isFullscreen) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function enterFullscreen() {
    const matrixSection = document.getElementById('compatibility-matrix');
    if (!matrixSection) return;
    const cardBody = matrixSection.querySelector('.card-body');
    if (!cardBody) return;
    const matrixContent = cardBody.innerHTML;
    
    matrixSection.dataset.originalScrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    matrixSection.classList.add('fullscreen-mode');
    matrixSection.dataset.originalContent = matrixSection.innerHTML; // Save the whole #compatibility-matrix content
    
    matrixSection.innerHTML = `
        <div class="fullscreen-header">
            <h2 class="fullscreen-title">${(translations[localStorage.getItem('language') || 'en'] || translations.en).completeMatrix || 'Complete Compatibility Matrix'}</h2>
            <button class="fullscreen-close exit-fullscreen-btn" id="exitFullscreenBtn">
                <i class="fas fa-compress"></i> ${(translations[localStorage.getItem('language') || 'en'] || translations.en).exitFullScreen || 'Exit Full Screen'}
            </button>
        </div>
        <div class="fullscreen-content">
            ${matrixContent} 
        </div>
    `;
    
    document.getElementById('exitFullscreenBtn').addEventListener('click', exitFullscreen);
    
    // Re-initialize matrix controls inside fullscreen
    const viewType = document.querySelector('#compatibility-matrix .view-option.active')?.dataset.view || 'compact'; //Look within the original non-fullscreen matrix for active view
    generateCompatibilityMatrix(viewType); // This will generate into the new .fullscreen-content

    // Re-attach event handlers for view options *inside fullscreen*
    const fsViewOptions = matrixSection.querySelectorAll('.fullscreen-content .view-option');
    fsViewOptions.forEach(btn => {
        btn.addEventListener('click', function() {
            fsViewOptions.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const newViewType = this.dataset.view;
            generateCompatibilityMatrix(newViewType); // Regenerate matrix within fullscreen
        });
    });
     // Re-attach search functionality *inside fullscreen*
    const fsSearchInput = matrixSection.querySelector('.fullscreen-content #matrixSearchInput');
    if (fsSearchInput) {
        fsSearchInput.addEventListener('input', filterMatrixFromInput);
    }
     // Re-attach export functionality
    const fsExportBtn = matrixSection.querySelector('.fullscreen-content #exportMatrix');
    if (fsExportBtn) {
        fsExportBtn.addEventListener('click', exportMatrixCsv);
    }
}

function exitFullscreen() {
    const matrixSection = document.getElementById('compatibility-matrix');
    if (!matrixSection || !matrixSection.dataset.originalContent) return;
    
    matrixSection.innerHTML = matrixSection.dataset.originalContent;
    matrixSection.classList.remove('fullscreen-mode');
    document.body.style.overflow = '';
    if (matrixSection.dataset.originalScrollY) {
        window.scrollTo(0, parseInt(matrixSection.dataset.originalScrollY, 10));
    }
    
    // Re-attach event handlers to the original elements
    const originalFullscreenBtn = document.getElementById('fullscreenBtn'); // This ID should be on the original button
    if (originalFullscreenBtn) {
       originalFullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    // Re-attach view options, search, export to original matrix
    attachMatrixEventListeners();
    // Regenerate matrix in original location to reflect current state
    const currentView = document.querySelector('#compatibility-matrix .view-option.active')?.dataset.view || 'compact';
    generateCompatibilityMatrix(currentView);

}

function handleResponsiveTable() {
    const matrixTable = document.getElementById('matrixTable');
    const matrixContainer = document.querySelector('.matrix-table-container');
    
    if (!matrixTable || !matrixContainer) return;
    
    if (window.innerWidth < 768) {
        if (matrixContainer.querySelector('.matrix-card-view')) return;
        matrixTable.style.display = 'none';
        const cardView = document.createElement('div');
        cardView.className = 'matrix-card-view';
        
        const headers = Array.from(matrixTable.querySelectorAll('thead th')).map(th => th.textContent);
        const rows = Array.from(matrixTable.querySelectorAll('tbody tr'));
        
        rows.filter(row => !row.classList.contains('matrix-section-row')).forEach(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            const card = document.createElement('div');
            card.className = 'compatibility-card';
            const cardHeader = document.createElement('div');
            cardHeader.className = 'compatibility-card-header';
            cardHeader.textContent = cells[0].textContent; // X-Ray software name
            card.appendChild(cardHeader);
            
            for (let i = 1; i < cells.length; i++) {
                const cardRow = document.createElement('div');
                cardRow.className = 'compatibility-card-row';
                const label = document.createElement('div');
                label.className = 'compatibility-card-label';
                label.textContent = headers[i]; // PMS name
                const value = document.createElement('div');
                value.className = 'compatibility-card-value';
                value.innerHTML = cells[i].innerHTML; // Compatibility icon
                cardRow.appendChild(label);
                cardRow.appendChild(value);
                card.appendChild(cardRow);
            }
            cardView.appendChild(card);
        });
        matrixContainer.appendChild(cardView);
    } else {
        const cardView = matrixContainer.querySelector('.matrix-card-view');
        if (cardView) {
            cardView.remove();
            matrixTable.style.display = 'table'; // Or 'block' if that was its original
        }
    }
}

function filterMatrixFromInput(event) {
    const searchText = event.target.value.toLowerCase();
    // Determine if we are in fullscreen or not to target the correct table
    const currentMatrixTable = document.querySelector('.fullscreen-mode #matrixTable') || document.getElementById('matrixTable');
    if (!currentMatrixTable) return;

    const rows = currentMatrixTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        if (row.classList.contains('matrix-section-row')) {
            row.style.display = '';
            return;
        }
        const xraySoftwareNameCell = row.querySelector('td:first-child');
        if (xraySoftwareNameCell) {
            const xraySoftwareName = xraySoftwareNameCell.textContent.toLowerCase();
            if (xraySoftwareName.includes(searchText)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

function exportMatrixCsv() {
    const currentMatrixTable = document.querySelector('.fullscreen-mode #matrixTable') || document.getElementById('matrixTable');
    if (!currentMatrixTable) return;

    const rows = currentMatrixTable.querySelectorAll('tr');
    let csvContent = "data:text/csv;charset=utf-8,";
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowData = Array.from(cells).map(cell => {
            let text = cell.textContent.trim();
            if (cell.querySelector('.compatibility-check')) { // Full gateway
                text = "Full Gateway";
            } else if (cell.querySelector('.fa-star.compatibility-check')) { // Gateway V2
                text = "Gateway V2";
            } else if (cell.querySelector('.compatibility-partial.fa-check-circle')) { // Full Watcher
                 text = "Full Watcher";
            } else if (cell.querySelector('.compatibility-partial.fa-exclamation-triangle')) { // Watcher light
                 text = "Watcher Light";
            } else if (cell.querySelector('.compatibility-cross')) {
                text = "Not Compatible";
            }
            return '"' + text.replace(/"/g, '""') + '"';
        }).join(',');
        csvContent += rowData + '\r\n';
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "allisone_compatibility_matrix.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function attachMatrixEventListeners() {
    const matrixToggleBtn = document.getElementById('matrixToggleBtn');
    const matrixSection = document.getElementById('compatibility-matrix');
            
    if (matrixToggleBtn && matrixSection) {
        matrixToggleBtn.addEventListener('click', function() {
            const isVisible = matrixSection.style.display === 'block';
            const currentLang = localStorage.getItem('language') || 'en';
            const currentTranslations = translations[currentLang] || translations.en;
            
            if (isVisible) {
                matrixSection.style.display = 'none';
                this.innerHTML = `<i class="fas fa-table"></i> ${currentTranslations.showMatrix}`;
            } else {
                matrixSection.style.display = 'block';
                this.innerHTML = `<i class="fas fa-chevron-up"></i> ${currentTranslations.hideMatrix}`;
                if (!matrixSection.dataset.generated) {
                    generateCompatibilityMatrix('compact');
                    matrixSection.dataset.generated = 'true';
                }
            }
            handleResponsiveTable(); // Call responsive handler after toggling
        });
    }
            
    const viewOptions = document.querySelectorAll('#compatibility-matrix .view-option'); // Target original matrix controls
    if (viewOptions.length) {
        viewOptions.forEach(btn => {
            btn.addEventListener('click', function() {
                viewOptions.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const viewType = this.dataset.view;
                generateCompatibilityMatrix(viewType);
            });
        });
    }

    const searchInput = document.getElementById('matrixSearchInput'); // Original search
    if (searchInput) {
       searchInput.addEventListener('input', filterMatrixFromInput);
    }
        
    const exportMatrixBtn = document.getElementById('exportMatrix'); // Original export
    if (exportMatrixBtn) {
        exportMatrixBtn.addEventListener('click', exportMatrixCsv);
    }

    const fullscreenBtn = document.getElementById('fullscreenBtn'); // Original fullscreen button
    if(fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Assign global DOM element variables
    xraySelect = document.getElementById("xraySoftware");
    pmsSelect = document.getElementById("pms");
    outputElement = document.getElementById("output");
    logoDisplay = document.getElementById("logoDisplay");
    
    const xrayLogoDiv = document.getElementById("xrayLogo");
    if (xrayLogoDiv) xrayLogoImg = xrayLogoDiv.querySelector("img");
    const pmsLogoDiv = document.getElementById("pmsLogo");
    if (pmsLogoDiv) pmsLogoImg = pmsLogoDiv.querySelector("img");

    xrayLogoLabel = document.getElementById("xrayLogoLabel");
    pmsLogoLabel = document.getElementById("pmsLogoLabel");

    populateDropdowns();
    updateOutput(); // Initial call

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            if(xraySelect) xraySelect.selectedIndex = 0;
            if(pmsSelect) pmsSelect.selectedIndex = 0;
            if(outputElement) outputElement.style.display = 'none';
            if(logoDisplay) logoDisplay.style.display = 'none';
            updateOutput(); // To clear logos if one was selected
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterSoftwareOptions(filterType);
        });
    });
    if(document.querySelector('.filter-btn[data-filter="all"]')) { // Set 'all' as active by default
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    }


    // Documentation Panel Setup
    const docsViewButton = document.createElement('button');
    docsViewButton.classList.add('matrix-toggle-btn'); // Re-use style
    docsViewButton.style.marginTop = '20px';
    docsViewButton.style.marginBottom = '10px';
    docsViewButton.style.width = 'auto';
    docsViewButton.style.display = 'inline-block'; // Make it inline-block for centering
    // Text content will be set by setLanguage
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.textAlign = 'center'; // Center the button
    buttonContainer.appendChild(docsViewButton);
    
    const form = document.getElementById('compatibilityForm');
    if (form && form.parentNode) {
        form.parentNode.insertBefore(buttonContainer, form.nextSibling);
    }
    docsViewButton.addEventListener('click', function() {
        showAllDocumentation();
    });
    setupDocumentationPanel();
    
    // Language Selection
    const languageBtns = document.querySelectorAll('.language-btn');
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang); 
    
    languageBtns.forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            languageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            localStorage.setItem('language', lang);
            setLanguage(lang);
            // After language change, if matrix is visible, regenerate to update tooltips/headers
            const matrixSection = document.getElementById('compatibility-matrix');
            if (matrixSection && matrixSection.style.display === 'block') {
                const activeViewOption = document.querySelector('#compatibility-matrix .view-option.active');
                const viewType = activeViewOption ? activeViewOption.dataset.view : 'compact';
                generateCompatibilityMatrix(viewType);
            }
        });
    });

    // Compatibility Form Listeners (if updateResultCard is still used separately)
    // xraySelect.addEventListener('change', updateResultCard); // Or call main updateOutput
    // pmsSelect.addEventListener('change', updateResultCard);
    xraySelect.addEventListener("change", updateOutput);
    pmsSelect.addEventListener("change", updateOutput);


    // Matrix related event listeners
    attachMatrixEventListeners();

    // Responsive Table Handling
    window.addEventListener('resize', handleResponsiveTable);
    // Initial call to handleResponsiveTable might be needed after matrix is first drawn.
    // Or if matrix is initially visible. For now, called on toggle and resize.
    handleResponsiveTable(); // Initial check on load
}); 