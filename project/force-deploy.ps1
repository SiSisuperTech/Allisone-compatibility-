# Cache Busting Deployment Script for Windows PowerShell
# This script forces a fresh deployment by adding a timestamp to trigger cache refresh

Write-Host "🚀 Force Cache Refresh Deployment" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Get current timestamp
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

Write-Host "📅 Timestamp: $timestamp" -ForegroundColor Yellow

# Add a cache-busting comment to CSS to force rebuild
Add-Content -Path "src/index.css" -Value "/* Cache bust deployment: $timestamp */"

# Clear any existing build cache
Write-Host "🧹 Clearing build cache..." -ForegroundColor Yellow
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
if (Test-Path "node_modules/.vite") { Remove-Item -Recurse -Force "node_modules/.vite" }

# Rebuild
Write-Host "🔨 Building fresh..." -ForegroundColor Yellow
npm run build

# Commit and push
Write-Host "📤 Deploying with cache bust..." -ForegroundColor Yellow
git add .
git commit -m "Force cache refresh deployment - $timestamp - Cache busting headers added - Fresh build - Force deployment visibility"

git push origin main

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 URL: https://SiSisuperTech.github.io/Allisone-compatibility-/" -ForegroundColor Cyan
Write-Host "⏰ Cache bust timestamp: $timestamp" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Tips to see fresh deployment:" -ForegroundColor Magenta
Write-Host "  - Wait 2-3 minutes for GitHub Pages cache" -ForegroundColor White
Write-Host "  - Use Ctrl+F5 (hard refresh) in browser" -ForegroundColor White  
Write-Host "  - Try incognito/private browsing mode" -ForegroundColor White
Write-Host "  - Add ?v=$timestamp to URL for testing" -ForegroundColor White
