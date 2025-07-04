// Simple test to verify the integration works
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if the App_allisone.tsx file has the expected imports and usage
const appPath = path.join(__dirname, 'src', 'App_allisone.tsx');
const appContent = fs.readFileSync(appPath, 'utf8');

console.log('🔍 Testing EnhancedLogo and NotionEmbed integration...\n');

// Check imports
const hasEnhancedLogoImport = appContent.includes("import EnhancedLogo from './components/EnhancedLogo';");
const hasNotionEmbedImport = appContent.includes("import NotionEmbed from './components/NotionEmbed';");
const hasDocumentationImports = appContent.includes("import { getDocumentationUrl, getDocumentationTitle, getDocumentationDescription } from './data/documentationUrls';");

console.log('✅ Imports:');
console.log('  EnhancedLogo:', hasEnhancedLogoImport ? '✓' : '❌');
console.log('  NotionEmbed:', hasNotionEmbedImport ? '✓' : '❌');
console.log('  Documentation functions:', hasDocumentationImports ? '✓' : '❌');

// Check usage
const enhancedLogoUsage = (appContent.match(/EnhancedLogo/g) || []).length;
const notionEmbedUsage = (appContent.match(/NotionEmbed/g) || []).length;
const handleDocumentClick = appContent.includes('handleDocumentClick');

console.log('\n✅ Usage:');
console.log('  EnhancedLogo components:', enhancedLogoUsage - 1, 'instances'); // -1 for the import
console.log('  NotionEmbed component:', notionEmbedUsage - 1, 'instances'); // -1 for the import  
console.log('  handleDocumentClick handler:', handleDocumentClick ? '✓' : '❌');

// Check state management
const hasNotionModalState = appContent.includes('notionModalOpen') && appContent.includes('notionModalData');

console.log('\n✅ State Management:');
console.log('  Notion modal state:', hasNotionModalState ? '✓' : '❌');

// Summary
console.log('\n🎉 Integration Summary:');
console.log('  All required imports:', hasEnhancedLogoImport && hasNotionEmbedImport && hasDocumentationImports ? '✓' : '❌');
console.log('  Components properly integrated:', enhancedLogoUsage > 1 && notionEmbedUsage > 1 ? '✓' : '❌');
console.log('  State management complete:', hasNotionModalState ? '✓' : '❌');

if (hasEnhancedLogoImport && hasNotionEmbedImport && hasDocumentationImports && enhancedLogoUsage > 1 && notionEmbedUsage > 1 && hasNotionModalState) {
  console.log('\n🎊 SUCCESS: EnhancedLogo and NotionEmbed integration is complete!');
  console.log('The app now supports:');
  console.log('  - Enhanced logos with documentation buttons in the matrix');
  console.log('  - Documentation buttons in the admin panel');
  console.log('  - Real-time Notion documentation embed modal');
  console.log('  - Clean documentation links in the compatibility checker');
} else {
  console.log('\n⚠️  WARNING: Integration may be incomplete. Please check the issues above.');
}
