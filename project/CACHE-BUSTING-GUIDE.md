# 🧹 Cache Busting Guide - Force Fresh Deployments

When your Allisone+ compatibility checker deployment isn't showing the latest changes, it's usually due to caching at various levels. This guide provides multiple strategies to force fresh content.

## 🚀 Quick Cache Refresh (Choose One)

### Option 1: PowerShell Script (Recommended for Windows)
```powershell
.\force-deploy.ps1
```

### Option 2: Manual Cache Bust
```powershell
# Add timestamp to force refresh
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
Add-Content -Path "src/index.css" -Value "/* Cache bust: $timestamp */"
npm run build
git add .
git commit -m "Cache refresh - $timestamp"
git push origin main
```

### Option 3: Hard Browser Refresh
```
Ctrl + F5 (Windows) or Cmd + Shift + R (Mac)
```

## 🔍 Why Caching Happens

### 1. Browser Cache
- **What**: Browser stores files locally for faster loading
- **Duration**: Until manually cleared or expires
- **Solution**: Hard refresh (Ctrl+F5)

### 2. GitHub Pages Cache
- **What**: GitHub's CDN caches deployed content
- **Duration**: ~10 minutes
- **Solution**: Wait or force new deployment

### 3. DNS Cache
- **What**: Domain name resolution cache
- **Duration**: Varies by system
- **Solution**: `ipconfig /flushdns` (Windows)

### 4. Build Cache
- **What**: Vite caches build artifacts
- **Duration**: Until cleared
- **Solution**: Delete `dist` and `node_modules/.vite`

## 🛠️ Technical Solutions Added

### 1. HTML Cache Headers
Added to `index.html`:
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

### 2. Build-Time Cache Busting
Updated `vite.config.ts` with timestamp-based file names:
```typescript
build: {
  rollupOptions: {
    output: {
      entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
      chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
      assetFileNames: `assets/[name]-[hash]-${Date.now()}.[ext]`
    }
  }
}
```

### 3. Automated Scripts
- `force-deploy.ps1` - PowerShell cache-busting deployment
- `force-deploy.sh` - Bash cache-busting deployment

## 🎯 Step-by-Step Troubleshooting

### If Changes Don't Appear:

1. **Check GitHub Actions** (2 min)
   - Go to: https://github.com/SiSisuperTech/Allisone-compatibility-/actions
   - Verify "Deploy App" workflow completed successfully
   - Look for any error messages

2. **Hard Refresh Browser** (instant)
   - Press `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)
   - Or open DevTools (F12) → right-click refresh → "Empty Cache and Hard Reload"

3. **Try Incognito/Private Mode** (instant)
   - Open browser in private/incognito mode
   - Visit: https://SiSisuperTech.github.io/Allisone-compatibility-/
   - This bypasses all browser cache

4. **Wait for GitHub Pages Cache** (10 min)
   - GitHub Pages cache expires after ~10 minutes
   - Check again after waiting

5. **Force New Deployment** (3 min)
   ```powershell
   .\force-deploy.ps1
   ```

6. **URL Cache Busting** (instant)
   - Add parameter: `?v=TIMESTAMP`
   - Example: `https://SiSisuperTech.github.io/Allisone-compatibility-/?v=20250704`

## 🔧 Advanced Cache Clearing

### Clear All Local Caches
```powershell
# Clear build cache
Remove-Item -Recurse -Force dist, node_modules/.vite

# Clear npm cache
npm cache clean --force

# Clear DNS cache (Windows)
ipconfig /flushdns

# Rebuild everything
npm install
npm run build
```

### Verify Fresh Deployment
1. Check file timestamps in GitHub repository
2. Compare commit hash in GitHub Actions
3. Inspect network tab in DevTools for 200 vs 304 responses
4. Check `Last-Modified` headers in browser DevTools

## 📱 Mobile Cache Issues

### iOS Safari
- Settings → Safari → Clear History and Website Data

### Android Chrome  
- Chrome Menu → Settings → Privacy → Clear browsing data

### Mobile Testing
- Use mobile browser's "Request Desktop Site" option
- Try different mobile browsers
- Add `?mobile=test` parameter to URL

## 🎉 Success Indicators

You'll know cache is cleared when you see:
- ✅ New commit hash in GitHub Actions
- ✅ Enhanced logos with documentation buttons
- ✅ NotionEmbed modals working
- ✅ Updated timestamp in browser DevTools
- ✅ Network tab shows 200 responses (not 304)

## 🆘 Emergency Cache Clearing

If nothing else works:

```powershell
# Nuclear option - completely fresh deployment
Remove-Item -Recurse -Force dist, node_modules
npm install
npm run build

# Force commit with major change
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
Add-Content -Path "README.md" -Value "`n<!-- Force deploy: $timestamp -->"

git add .
git commit -m "🚨 EMERGENCY CACHE CLEAR - $timestamp"
git push origin main
```

---

**Remember**: First deployment may take 2-5 minutes, subsequent cache refreshes usually resolve within 10 minutes with the right approach!
