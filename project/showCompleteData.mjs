// Load the built project and run the upload
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// For now, let's create a simple manual upload
const data = {
  pmsSoftware: [
    { id: 'dentally', name: 'Dentally', company: 'Dentally', logo: '/placeholder.svg' },
    { id: 'cleardent', name: 'ClearDent', company: 'ClearDent', logo: '/placeholder.svg' },
    { id: 'curve', name: 'Curve Dental', company: 'Curve Dental', logo: '/placeholder.svg' },
    { id: 'eaglesoft', name: 'EagleSoft', company: 'Patterson Dental', logo: '/placeholder.svg' },
    { id: 'open-dental', name: 'Open Dental', company: 'Open Dental Software', logo: '/placeholder.svg' },
    { id: 'dentrix', name: 'Dentrix', company: 'Envista Holdings', logo: '/placeholder.svg' },
    { id: 'practice-works', name: 'Practice Works', company: 'Practice Works', logo: '/placeholder.svg' },
    { id: 'softdent', name: 'SoftDent', company: 'Envista Holdings', logo: '/placeholder.svg' },
    { id: 'axium', name: 'Axium', company: 'Axium', logo: '/placeholder.svg' },
    { id: 'macpractice', name: 'MacPractice', company: 'MacPractice', logo: '/placeholder.svg' },
    { id: 'dentimax', name: 'DentiMax', company: 'DentiMax', logo: '/placeholder.svg' },
    { id: 'tab32', name: 'Tab32', company: 'Tab32', logo: '/placeholder.svg' },
    { id: 'carestack', name: 'CareStack', company: 'CareStack', logo: '/placeholder.svg' },
    { id: 'dentalink', name: 'DentalLink', company: 'DentalLink', logo: '/placeholder.svg' },
    { id: 'vistasoft', name: 'VistaSoft', company: 'VistaSoft', logo: '/placeholder.svg' },
    { id: 'easy-dental', name: 'Easy Dental', company: 'Henry Schein', logo: '/placeholder.svg' },
    { id: 'planet-dds', name: 'Planet DDS', company: 'Planet DDS', logo: '/placeholder.svg' },
    { id: 'dental-office-manager', name: 'Dental Office Manager', company: 'Dental Office Manager', logo: '/placeholder.svg' },
    { id: 'practice-by-numbers', name: 'Practice-by-Numbers', company: 'Practice-by-Numbers', logo: '/placeholder.svg' },
    { id: 'practice-mojo', name: 'Practice Mojo', company: 'Practice Mojo', logo: '/placeholder.svg' },
    { id: 'sensei-cloud', name: 'Sensei Cloud', company: 'Sensei Cloud', logo: '/placeholder.svg' },
    { id: 'progeny', name: 'Progeny', company: 'Progeny', logo: '/placeholder.svg' },
    { id: 'apteryx', name: 'Apteryx', company: 'Apteryx', logo: '/placeholder.svg' },
    { id: 'dental-vision', name: 'Dental Vision', company: 'Dental Vision', logo: '/placeholder.svg' },
    { id: 'practice-suite', name: 'Practice Suite', company: 'Practice Suite', logo: '/placeholder.svg' },
    { id: 'oryx', name: 'Oryx', company: 'Oryx', logo: '/placeholder.svg' },
    { id: 'nextgen', name: 'NextGen', company: 'NextGen', logo: '/placeholder.svg' },
    { id: 'maxident', name: 'MaxiDent', company: 'MaxiDent', logo: '/placeholder.svg' },
    { id: 'dental-intelligence', name: 'Dental Intelligence', company: 'Dental Intelligence', logo: '/placeholder.svg' },
    { id: 'practice-management', name: 'Practice Management', company: 'Practice Management', logo: '/placeholder.svg' },
    { id: 'dental-software', name: 'Dental Software', company: 'Dental Software', logo: '/placeholder.svg' },
    { id: 'clinix', name: 'Clinix', company: 'Clinix', logo: '/placeholder.svg' },
    { id: 'dental-studio', name: 'Dental Studio', company: 'Dental Studio', logo: '/placeholder.svg' }
  ]
};

console.log('Complete PMS software data with all 33 systems including Dentally:');
console.log(JSON.stringify(data.pmsSoftware, null, 2));
console.log(`\nTotal PMS systems: ${data.pmsSoftware.length}`);
console.log('\nTo upload this data to GitHub, you would need to:');
console.log('1. Use the GitHub API to update the PMS software JSON file');
console.log('2. Make sure all 33 systems are included in the production data');
console.log('3. Verify that the fallback logic in the app is working correctly');
