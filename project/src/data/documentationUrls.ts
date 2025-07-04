// Documentation URLs pour chaque X-ray software
export const xrayDocumentationUrls: Record<string, string> = {
  // Principales marques avec documentation complète
  'carestream': 'https://www.notion.so/Installation-guide-Carestream-503c7295b9e4440ea86bfd02b2cb63a1',
  'sirona': 'https://www.notion.so/Installation-guide-Sirona-503c7295b9e4440ea86bfd02b2cb63a2',
  'planmeca': 'https://www.notion.so/Installation-guide-Planmeca-503c7295b9e4440ea86bfd02b2cb63a3',
  'vatech': 'https://www.notion.so/Installation-guide-Vatech-503c7295b9e4440ea86bfd02b2cb63a4',
  'dentsply': 'https://www.notion.so/Installation-guide-Dentsply-503c7295b9e4440ea86bfd02b2cb63a5',
  'kavo': 'https://www.notion.so/Installation-guide-KaVo-503c7295b9e4440ea86bfd02b2cb63a6',
  'gendex': 'https://www.notion.so/Installation-guide-Gendex-503c7295b9e4440ea86bfd02b2cb63a7',
  'sota-precision': 'https://www.notion.so/Installation-guide-Sota-503c7295b9e4440ea86bfd02b2cb63a8',
  'soredex': 'https://www.notion.so/Installation-guide-Soredex-503c7295b9e4440ea86bfd02b2cb63a9',
  'owandy': 'https://www.notion.so/Installation-guide-Owandy-503c7295b9e4440ea86bfd02b2cb63aa',
  
  // Documentation générale
  'general': 'https://www.notion.so/Installation-guide-General-503c7295b9e4440ea86bfd02b2cb63ab'
};

// Documentation URLs pour chaque PMS software
export const pmsDocumentationUrls: Record<string, string> = {
  // PMS principaux avec guides spécifiques
  'dentally': 'https://www.notion.so/Integration-guide-Dentally-503c7295b9e4440ea86bfd02b2cb63b1',
  'software-of-excellence': 'https://www.notion.so/Integration-guide-SOE-503c7295b9e4440ea86bfd02b2cb63b2',
  'carestack': 'https://www.notion.so/Integration-guide-CareStack-503c7295b9e4440ea86bfd02b2cb63b3',
  'aerona': 'https://www.notion.so/Integration-guide-Aerona-503c7295b9e4440ea86bfd02b2cb63b4',
  'orisdent-orisline': 'https://www.notion.so/Integration-guide-OrisLine-503c7295b9e4440ea86bfd02b2cb63b5',
  'powerdent-kopfwerk': 'https://www.notion.so/Integration-guide-Powerdent-503c7295b9e4440ea86bfd02b2cb63b6',
  'julie': 'https://www.notion.so/Integration-guide-Julie-503c7295b9e4440ea86bfd02b2cb63b7',
  'veasy': 'https://www.notion.so/Integration-guide-Veasy-503c7295b9e4440ea86bfd02b2cb63b8',
  'desmos': 'https://www.notion.so/Integration-guide-Desmos-503c7295b9e4440ea86bfd02b2cb63b9',
  'logosw': 'https://www.notion.so/Integration-guide-Logosw-503c7295b9e4440ea86bfd02b2cb63ba',
  
  // Documentation générale PMS
  'general-pms': 'https://www.notion.so/Integration-guide-PMS-General-503c7295b9e4440ea86bfd02b2cb63bb'
};

// Fonction pour obtenir l'URL de documentation pour un logiciel donné
export const getDocumentationUrl = (softwareId: string, type: 'pms' | 'xray'): string | undefined => {
  if (type === 'pms') {
    return pmsDocumentationUrls[softwareId] || pmsDocumentationUrls['general-pms'];
  } else {
    return xrayDocumentationUrls[softwareId] || xrayDocumentationUrls['general'];
  }
};

// Fonction pour obtenir le titre de la documentation
export const getDocumentationTitle = (softwareName: string, type: 'pms' | 'xray'): string => {
  if (type === 'pms') {
    return `Guide d'intégration - ${softwareName}`;
  } else {
    return `Guide d'installation - ${softwareName}`;
  }
};

// Fonction pour obtenir la description de la documentation
export const getDocumentationDescription = (type: 'pms' | 'xray'): string => {
  if (type === 'pms') {
    return 'Configuration et intégration avec Allisone+';
  } else {
    return 'Installation et configuration du logiciel X-ray';
  }
};
