import { PMSSoftware, XraySoftware } from '../types/software';
import { PMSAllisoneMatrix, XrayAllisoneMatrix } from '../types/allisone';

// Define the types for integration options
export interface IntegrationOption {
  name: string;
  description: string;
  pmsMode: string;
  xrayModes: string[];
  notes: string[];
  limitations: string[];
  status: string;
}

// Données PMS (inchangées)
export const pmsSoftware: PMSSoftware[] = [
  // France 🇫🇷
  { id: 'biotech-dental', name: 'Biotech Dental', company: 'Biotech Dental', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/LOGO_BIOTECH_DENTAL-HD.jpg/1280px-LOGO_BIOTECH_DENTAL-HD.jpg' },
  { id: 'logosw', name: 'Logosw', company: 'Logosw', logo: 'https://www.logosw.net/telechargement/presse/logosw-1000.png' },
  { id: 'spdentaire', name: 'SPDentaire', company: 'SantéPlus', logo: 'https://www.sp-formations.eu/wp-content/uploads/2023/11/cropped-sante_rouge.webp' },
  { id: 'veasy', name: 'Veasy', company: 'Cegedim', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3wfhXKXkJ2yWx4CSXQpO-LXcDTnRV32DbjQ&s' },
  { id: 'desmos', name: 'Desmos', company: 'Orisha', logo: 'https://astucetierspayant.fr/wp-content/uploads/2023/12/Desmos.jpg' },
  { id: 'julie', name: 'Julie', company: 'Henry Schein', logo: 'https://www.julie.fr/julie_uploads/2022/10/logo-bleu-115x75-1.png' },
  { id: 'weclever', name: 'WeClever', company: 'Vatech', logo: 'https://weclever-dental.com/wp-content/uploads/2023/04/Weclever_Logo-Dental_Off_PNG.png' },
  { id: 'cc-dentaire', name: 'CC Dentaire', company: 'CC Dentaire', logo: '/logos/cc-dentaire.png' },
  { id: 'trophy-carestream', name: 'Trophy Carestream', company: 'Carestream', logo: '/logos/trophy-carestream.png' },
  { id: 'galaxie', name: 'Galaxie', company: 'Idem Santé', logo: '/logos/galaxie.png' },
  
  // Italy 🇮🇹
  { id: 'orisdent-orisline', name: 'OrisDent - OrisLine', company: 'Henry Schein', logo: 'https://orisdent.com/wp-content/themes/orisdent/img/orisline-logo.png' },
  { id: 'evodent', name: 'Evodent', company: 'DentalPro', logo: '/logos/evodent.png' },
  { id: 'xdent-italy', name: 'XDent', company: 'CompuGroup', logo: '/logos/xdent.png' },
  
  // Austria 🇦🇹
  { id: 'powerdent-kopfwerk', name: 'Powerdent - Kopfwerk', company: 'Henry Schein', logo: 'https://res.cloudinary.com/beleza-na-web/image/upload/f_auto,fl_progressive,q_auto:best/v1/brand/2023_04_11_17_51_41_9/48614d56-6434-40fc-984e-307c8cf1960f-marca-powerdent-carrossel.svg' },
  
  // Spain 🇪🇸
  { id: 'ulyses', name: 'Ulyses', company: 'Vitaldent', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Vitaldent.svg/2560px-Vitaldent.svg.png' },
  { id: 'abaden', name: 'Abaden', company: 'Abaden', logo: '/logos/abaden.png' },
  { id: 'mulhacensoft', name: 'MulhacenSoft', company: 'MulhacenSoft', logo: '/logos/mulhacensoft.png' },
  { id: 'klinikare', name: 'KliniKare', company: 'KliniKare', logo: '/logos/klinikare.png' },
  { id: 'cliniccloud', name: 'ClinicCloud', company: 'Doctoralia', logo: '/logos/cliniccloud.png' },
  { id: 'gesden', name: 'Gesden', company: 'Henry Schein', logo: '/logos/gesden.png' },
  { id: 'vevi-clinics', name: 'Vevi Clinics', company: 'Vevi Clinics', logo: '/logos/vevi-clinics.png' },
  
  // UK 🇬🇧
  { id: 'cloud4dentist', name: 'Cloud4Dentist', company: 'LPY Soft', logo: '/logos/cloud4dentist.png' },
  { id: 'aerona', name: 'Aerona', company: 'Soho Capital', logo: '/logos/aerona.png' },
  { id: 'carestack', name: 'CareStack', company: 'CareStack', logo: '/logos/carestack.png' },
  { id: 'r4-carestream', name: 'R4 Carestream', company: 'Carestream', logo: '/logos/r4-carestream.png' },
  { id: 'systems-for-dentists', name: 'Systems for Dentists', company: 'Systems for Dentists', logo: '/logos/systems-for-dentists.png' },
  { id: 'dentally', name: 'Dentally', company: 'Henry Schein', logo: '/logos/dentally.png' },
  { id: 'software-of-excellence', name: 'Software of Excellence', company: 'Henry Schein', logo: '/logos/software-of-excellence.png' },
  
  // Poland 🇵🇱
  { id: 'estomed', name: 'Estomed', company: 'Soho Capital', logo: '/logos/estomed.png' },
  
  // Portugal 🇵🇹
  { id: 'imaginasoft', name: 'ImaginaSoft', company: 'Soho Capital', logo: '/logos/imaginasoft.png' },
  
  // Germany 🇩🇪
  { id: 'solutio-gmbh', name: 'Solutio GmbH', company: 'Solutio GmbH', logo: '/logos/solutio.png' },
  { id: 'dampsoft', name: 'Dampsoft', company: 'Dampsoft', logo: '/logos/dampsoft.png' },
  { id: 'xdent-germany', name: 'XDent', company: 'CompuGroup', logo: '/logos/xdent-germany.png' },
];

// Données X-ray (inchangées)
export const xraySoftware: XraySoftware[] = [
  { id: 'romexis', name: 'Romexis', company: 'Planmeca', logo: 'https://www.lmdfrance.fr/public/img/big/maxresdefault1jpg_65f06fb46dd691.07855911.jpg' },
  { id: 'sidexis', name: 'Sidexis', company: 'Dentsply Sirona', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg2FwEARD5XNGrlEuZqACvEvvOSXbRVABu6pSemIcUlNajL90u_LQSHpdtjgoSr_ourHo&usqp=CAU' },
  { id: 'cs-imaging', name: 'CS Imaging', company: 'Carestream', logo: 'https://www.comident.fr/wp-media/uploads/2023/10/CSD_Logo_NEW2020_Shadow.png' },
  { id: 'vixwin', name: 'VixWin', company: 'Gendex', logo: '/Allisone-compatibility-/logos/vixwin.png' },
  { id: 'vistasoft', name: 'VistaSoft', company: 'Durr Dental', logo: 'https://help.vsmonitor.com/dd/graphics/00310898.png' },
  { id: 'ais', name: 'AIS', company: 'Acteon', logo: 'https://sfe-endo.fr/wp-content/uploads/2023/05/ACTEON-logo.png' },
  { id: 'examine-pro', name: 'Examine Pro', company: 'Examine Pro', logo: 'https://img.medicalexpo.fr/images_me/photo-mg/74092-8210123.jpg' },
  { id: 'quickvision', name: 'QuickVision', company: 'Owandy', logo: 'https://www.owandy.fr/wp-content/uploads/2024/12/logo-QuickVision_white.png' },
  { id: 'irys', name: 'iRYS', company: 'MyRay', logo: '/Allisone-compatibility-/logos/irys.png' },
  { id: 'ezdent-i', name: 'Ezdent-i', company: 'Vatech', logo: 'https://vatech-france.fr/wp-content/uploads/2019/12/Logo-1.png' },
  { id: 'visiquick', name: 'VisiQuick', company: 'Citodent', logo: 'https://i0.wp.com/www.citodent.com/wp-content/uploads/2016/12/cropped-Logo-VisiQuick.jpg?fit=512%2C512&ssl=1' },
  { id: 'cliniview', name: 'Cliniview', company: 'KaVo Instrumentarium', logo: 'https://cdn.elmed.cz/images/0/1ac8808f6d80b096/2/licence-cliniview-1-pc-network-user-add-on.jpg?hash=1487825817' },
  { id: 'mediadent', name: 'Mediadent', company: 'Mediadent', logo: 'https://www.mipacs.com//_next/static/media/mipacs-by-apryse-colour.8b5ddab8.svg' },
  { id: 'dbswin', name: 'DBSWin', company: 'Durr Dental', logo: 'https://cdn.bimedis.com/search/aimage/wide/1381652' },
  { id: 'i-dixel', name: 'i-Dixel', company: 'Morita', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfL0hhKiLWqsm2x9VTWK6K60j3N6PbMPXjA&s' },
  { id: 'rayscan', name: 'RayScan', company: 'Ray', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkSZoiRkki_lbu932Oxdjo09BygxAG51z5w&s' },
  { id: 'scanora', name: 'Scanora', company: 'Soredex', logo: 'https://www.dentalsky.com/media/amasty/shopby/option_images/Soredex.jpg' },
  { id: 'dtx-studio', name: 'DTX Studio', company: 'Visualization', logo: 'https://www.dtxstudio.com/sites/g/files/wdvifx246/files/styles/mobile_375_full_width_x1/public/DTX%20Studio%20Clinic%20icon_pseudoteaser.png.webp?itok=ORa8G9yA' },
  { id: 'nnt', name: 'NNT', company: 'Newtom', logo: 'https://alldent.nl/wp-content/uploads/2020/08/5958-nnt-logo_thumb.jpg' },
  { id: 'dentrix-ascend', name: 'Dentrix Ascend', company: 'Henry Schein', logo: 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_6cc28c7b4d8e98000efb5fea6a4ebd67/dentrix-ascend.png' },
  { id: 'mipacs', name: 'MiPACS Dental Enterprise Viewer', company: 'Medicor Imaging', logo: '/Allisone-compatibility-/logos/mipacs.png' },
  { id: 'xrayvision', name: 'XrayVision', company: 'Apteryx Imaging', logo: 'https://media.dentalcompare.com/m/25/article/517681-134x100.jpg' },
];

// NOUVELLE MATRICE : PMS → Allisone+ Compatibility
export const pmsAllisoneMatrix: PMSAllisoneMatrix = {
  'biotech-dental': {
    compatible: true,
    allisoneMode: ['CreateDiagnostic (legacy)'],
    status: 'In Prod',
    notes: 'Intégration legacy où le partenaire upload une image directement et reçoit le rapport en JSON',
    limitations: ['Intégration legacy uniquement']
  },
  'logosw': {
    compatible: true,
    allisoneMode: ['V1 + Image', 'V1 without Image', 'Wild Gateway'],
    status: 'In Prod',
    notes: "Logosw v12 : 1/3 utilisateurs l'ont (au 1er Septembre 24), 2/3 l'auront d'ici fin de l'année 24. Wild Gateway disponible.",
    limitations: ["Ordre de déploiement aléatoire", "Priorité aux cabinets <3 praticiens puis les plus gros"]
  },
  'spdentaire': {
    compatible: true,
    allisoneMode: ['Gateway', 'V1 without Image', 'Wild Gateway'],
    status: 'In Prod',
    notes: 'Treatment plan disponible depuis 15/11/2024',
    limitations: []
  },
  'veasy': {
    compatible: true,
    allisoneMode: ['V1 without Image'],
    status: 'In Prod',
    notes: 'Il semble compliqué de traiter Gateway avec Veasy. Auto-activation retardée beaucoup de temps',
    limitations: ['Gateway difficile à implémenter']
  },
  'desmos': {
    compatible: true,
    allisoneMode: ['Gateway', 'V1 without Image', 'Wild Gateway'],
    status: 'In Prod',
    notes: 'Amélioration pour treatmentPlan avec Gateway + UX TP dans Desmos trop compliquée',
    limitations: ['UX Treatment Plan complexe']
  },
  'julie': {
    compatible: true,
    allisoneMode: ['Gateway', 'Wild Gateway'],
    status: 'In Prod',
    notes: 'Connecteur (passerelle radio allisone) déployé entre octobre 2024 et janvier 2025',
    limitations: ['Diagnostic payant via forfait premium']
  },
  'weclever': {
    compatible: true,
    allisoneMode: ['Gateway', 'V1 + Image', 'Wild Gateway'],
    status: 'In Prod',
    notes: 'Gateway compatible avec Vatech, Carestream, Sirona',
    limitations: []
  },
  'orisdent-orisline': {
    compatible: true,
    allisoneMode: ['V1 Full (Watcher)'],
    status: 'In Prod',
    notes: 'Seulement watcher en prod. Ils vont travailler sur Gateway.',
    limitations: ['Watcher uniquement pour le moment']
  },
  'powerdent-kopfwerk': {
    compatible: true,
    allisoneMode: ['V1 Full (Watcher)'],
    status: 'In Prod',
    notes: 'Watcher workflow en prod depuis juillet 2024',
    limitations: []
  },
  'ulyses': {
    compatible: true,
    allisoneMode: ['Gateway'],
    status: 'In Prod',
    notes: 'Vitaldent PMS déployé gateway dans +50 cliniques',
    limitations: []
  },
  'estomed': {
    compatible: true,
    allisoneMode: ['Gateway'],
    status: 'In Test',
    notes: 'Plan de déploiement en janvier',
    limitations: []
  },
  'evodent': {
    compatible: true,
    allisoneMode: ['V1 + Image'],
    status: 'In Test',
    notes: 'Support du flux SSO, version test prévue 18 décembre 2024',
    limitations: []
  },
  'imaginasoft': {
    compatible: true,
    allisoneMode: ['Gateway'],    status: 'In Test',
    notes: 'Phase pilote en cours',
    limitations: []
  },
  'cloud4dentist': {
    compatible: true,
    allisoneMode: ['Gateway', 'V1 + Image'],
    status: 'On Dev',
    notes: 'Développement en cours',
    limitations: []
  },
  'xdent-italy': {
    compatible: true,
    allisoneMode: ['Gateway'],
    status: 'On Dev',
    notes: 'Doc A+ partagée pour gateway. Pas d\'ETA encore',
    limitations: []
  },
  'abaden': {
    compatible: true,
    allisoneMode: ['V1 + Image'],    status: 'Not Started',
    notes: 'Développement gelé',
    limitations: []
  },
  'aerona': {
    compatible: true,
    allisoneMode: ['Gateway'],
    status: 'In Test',
    notes: 'Développement en cours',
    limitations: []
  },
  'cc-dentaire': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'trophy-carestream': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'galaxie': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'mulhacensoft': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'klinikare': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'cliniccloud': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'gesden': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'vevi-clinics': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'carestack': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'r4-carestream': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'systems-for-dentists': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'dentally': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'software-of-excellence': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'solutio-gmbh': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'dampsoft': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  },
  'xdent-germany': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore démarré',
    limitations: []
  }
};

// NOUVELLE MATRICE : X-ray → Allisone+ Compatibility
export const xrayAllisoneMatrix: XrayAllisoneMatrix = {
  'romexis': {
    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Watcher Light + Dicom'],
    status: 'Done',
    supportedVersions: 'All versions ≥ 5.x',
    notes: 'Intégration complète avec toutes les fonctionnalités Allisone+'
  },
  'sidexis': {
    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Full Watcher'],
    status: 'Done',
    supportedVersions: 'All versions ≥ 4.x (XG not supported yet)',
    notes: 'Intégration complète, XG non supporté'
  },
  'cs-imaging': {
    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Full Watcher'],
    status: 'Done',
    supportedVersions: 'All versions ≥ 6.x, 7.x, 8.x',
    notes: 'Compatibilité complète toutes versions récentes'
  },
  'vixwin': {
    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Watcher Light + Dicom'],
    status: 'Done',
    supportedVersions: 'All versions prior to 4.x',
    notes: 'Versions antérieures à 4.x uniquement'
  },
  'vistasoft': {    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Watcher Light + Dicom'],
    status: 'Done',
    supportedVersions: '2.x or 3.x',
    notes: 'Compatible versions 2.x et 3.x'
  },
  'ais': {
    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Watcher Light + Dicom'],
    status: 'Done',
    supportedVersions: '≥ 5.3 (paid upgrade)',
    notes: 'Compatible version 5.3+ (mise à jour payante)'
  },
  'examine-pro': {
    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Full Watcher Dicom'],
    status: 'Done',
    notes: 'Intégration complète'
  },
  'quickvision': {
    compatible: true,    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Full Watcher Dicom'],
    status: 'Done',
    notes: 'Compatible avec Owandy QuickVision'
  },
  'ezdent-i': {
    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode', 'Full Watcher Dicom'],
    status: 'Done',
    supportedVersions: 'All versions (3.x)',
    notes: 'Compatible toutes versions Vatech'
  },
  'visiquick': {
    compatible: true,
    allisoneMode: ['A+ v2 - Server Mode', 'A+ v2 - Bridge Mode'],
    status: 'Done',
    notes: 'Intégration Citodent VisiQuick'
  },
  'cliniview': {
    compatible: true,
    allisoneMode: ['Full Watcher'],
    status: 'Planned',
    notes: 'A+ v2 Server Mode planifié'
  },
  'mediadent': {
    compatible: true,
    allisoneMode: ['Watcher Light + Dicom', 'Generic Dicom'],    status: 'Not Started',
    notes: 'Support DICOM générique disponible'
  },
  'dbswin': {
    compatible: true,
    allisoneMode: ['Watcher Light + Dicom'],
    status: 'Not Started',
    notes: 'Watcher Light + export DICOM'
  },
  'i-dixel': {
    compatible: true,
    allisoneMode: ['Watcher Light + Dicom'],
    status: 'Not Started',
    notes: 'Support Morita i-Dixel'
  },
  'rayscan': {
    compatible: true,
    allisoneMode: ['Full Watcher Dicom', 'Generic Dicom'],
    status: 'Done',
    notes: 'Support DICOM générique'
  },
  'scanora': {
    compatible: true,
    allisoneMode: ['Full Watcher'],
    status: 'Not Started',
    notes: 'Pas encore démarré'
  },
  'irys': {
    compatible: true,
    allisoneMode: ['A+ v2 - Bridge Mode', 'Full Watcher Dicom', 'Generic Dicom'],
    status: 'Done',    supportedVersions: '≥ 16',
    notes: 'Compatible versions 16+'
  },
  'dtx-studio': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas encore d\'intégration DTX Studio'
  },
  'nnt': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Intégration Newtom NNT pas démarrée'
  },
  'dentrix-ascend': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas d\'intégration Henry Schein Dentrix Ascend'
  },
  'mipacs': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas d\'intégration MiPACS'
  },
  'xrayvision': {
    compatible: false,
    allisoneMode: [],
    status: 'Not Started',
    notes: 'Pas d\'intégration XrayVision'
  }
};

// Define return type for clarity
interface CompatibilityRequirementsResult {
  compatible: boolean;
  options: IntegrationOption[];
  notes: string[];
  pmsStatus?: string;
  xrayStatus?: string;
}

// Helper function to check if two software are compatible and what requirements exist
export function getCompatibilityRequirements(
  pmsId: string, 
  xrayId: string,
  pmsMatrix: PMSAllisoneMatrix,
  xrayMatrix: XrayAllisoneMatrix
): CompatibilityRequirementsResult {
  const pmsInfo = pmsMatrix[pmsId];
  const xrayInfo = xrayMatrix[xrayId];
  
  if (!pmsInfo || !xrayInfo) {
    return {
      compatible: false,
      options: [],
      notes: ["Information not available for one or both software"],
    };
  }
  
  // Check if both are compatible with Allisone+
  if (!pmsInfo.compatible || !xrayInfo.compatible) {
    return {
      compatible: false,
      options: [],
      notes: ["One or both software are not compatible with Allisone+"],
    };
  }
  
  const options: IntegrationOption[] = [];
  const notes: string[] = [];

  // Iterate over each possible PMS mode and check for compatible X-ray modes
  pmsInfo.allisoneMode.forEach(pmsMode => {
    const compatibleXrayModes: string[] = [];
    let optionNotes: string[] = [];
    let limitations: string[] = [];

    if (pmsMode === 'Gateway' || pmsMode === 'Wild Gateway') {
      if (xrayInfo.allisoneMode.includes('A+ v2 - Bridge Mode') && xrayInfo.allisoneMode.includes('A+ v2 - Server Mode')) {
        compatibleXrayModes.push('A+ v2 - Bridge Mode', 'A+ v2 - Server Mode');
        optionNotes.push("Full Gateway integration available");
      }
    } else if (pmsMode.includes('V1')) {
      if (xrayInfo.allisoneMode.some(mode => mode.includes('A+ v2') || mode.includes('Watcher'))) {
        compatibleXrayModes.push(...xrayInfo.allisoneMode.filter(mode => mode.includes('A+ v2') || mode.includes('Watcher')));
        optionNotes.push("Compatible via V1 integration");
      }
    } else if (pmsMode === 'CreateDiagnostic (legacy)') {
        compatibleXrayModes.push('N/A'); // No specific X-ray mode required for legacy integration
        optionNotes.push('Legacy integration for direct image upload and JSON report retrieval.');
    }

    if (compatibleXrayModes.length > 0) {
        options.push({
            name: pmsMode,
            description: `Integration via ${pmsMode}`,
            pmsMode: pmsMode,
            xrayModes: compatibleXrayModes,
            notes: optionNotes,
            limitations: limitations,
            status: pmsInfo.status
        });
    }
  });

  // Add global notes and status if no options are available
  if (options.length === 0) {
      notes.push("No compatible integration mode found between these software");
  } else {
    if (pmsInfo.notes) notes.push(`PMS: ${pmsInfo.notes}`);
    if (xrayInfo.notes) notes.push(`X-ray: ${xrayInfo.notes}`);
    if (xrayInfo.supportedVersions) {
        notes.push(`X-ray version: ${xrayInfo.supportedVersions}`);
    }
    if (pmsInfo.limitations && pmsInfo.limitations.length > 0) {
        notes.push(`Limitations: ${pmsInfo.limitations.join(', ')}`);
    }
  }
  
  return {
    compatible: options.length > 0,
    options,
    notes,
    pmsStatus: pmsInfo.status,
    xrayStatus: xrayInfo.status
  };
}
