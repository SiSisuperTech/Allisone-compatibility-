# Automatic Deployment Guide

This guide explains how to set up automatic deployment for your Allisone+ compatibility matrix app.

## How It Works

When you push changes to your GitHub repository, two workflows will run:

1. **Data Processing Workflow** (`process-data-updates.yml`): 
   - Processes data update issues
   - Updates JSON data files
   - Ensures all users share the same compatibility data

2. **Deployment Workflow** (`deploy-app.yml`):
   - Builds your React app
   - Deploys it to GitHub Pages
   - Makes it accessible online to everyone

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll to the "Pages" section
4. Under "Source", select "GitHub Actions"

### 2. Add GitHub Secrets (Optional, for issue creation)

For the GitHub issue creation to work fully (not just simulate):

1. Go to repository "Settings" > "Secrets and variables" > "Actions"
2. Add a new secret called `GH_TOKEN` with a [Personal Access Token](https://github.com/settings/tokens) that has `repo` permissions

### 3. Update GitHub Repository URL

Make sure your GitHub repository URL is correct in:

```typescript
// src/services/githubStorage.ts
const DATA_REPO_URL = 'https://raw.githubusercontent.com/SiSisuperTech/Allisone-compatibility-/main';
```

### 4. Push Your Code

Push your code to GitHub:

```powershell
git add .
git commit -m "Set up automatic deployment"
git push origin main
```

### 5. Access Your Deployed App

After pushing, your app will be deployed to:
https://[your-username].github.io/[your-repository-name]/

Example: https://SiSisuperTech.github.io/Allisone-compatibility-/

## Data Sharing

All users of your app will share the same data because:

1. The app fetches data from your GitHub repository's `data/` folder
2. When users make changes, they create GitHub issues
3. The `process-data-updates.yml` workflow processes these issues and updates the data files
4. All other users' apps will fetch these updated files

## Troubleshooting

### Cache Issues - Force Fresh Deployment

If you don't see your latest changes after deployment, it's likely a caching issue. Here are several ways to force a clean cache:

#### 1. Browser Cache Clearing
```bash
# For users visiting the site:
# Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac) for hard refresh
# Or open Developer Tools (F12) and right-click refresh button → "Empty Cache and Hard Reload"
```

#### 2. Add Cache Busting to Your App
Add this to your `index.html` to force cache invalidation:

```html
<!-- Add this meta tag to force cache refresh -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

#### 3. URL Parameters for Testing
Access your deployed app with cache-busting parameters:
```
https://SiSisuperTech.github.io/Allisone-compatibility-/?v=TIMESTAMP
https://SiSisuperTech.github.io/Allisone-compatibility-/?nocache=true
```

#### 4. GitHub Pages Cache Clearing
GitHub Pages has its own cache. To force refresh:

1. **Wait 10 minutes** - GitHub Pages cache typically expires after 10 minutes
2. **Check GitHub Actions** - Ensure deployment completed successfully
3. **Use different browser** - Test in incognito/private mode
4. **Clear DNS cache** (Windows):
   ```powershell
   ipconfig /flushdns
   ```

#### 5. Vite Build Cache Clearing
If build seems stale, clear Vite cache:

```powershell
# Clear Vite cache and rebuild
npm run build -- --force
# Or manually delete and rebuild
rm -rf dist node_modules/.vite
npm run build
```

#### 6. Force New Deployment
To force a completely fresh deployment:

```powershell
# Make a small change and redeploy
echo "/* Cache bust $(date) */" >> src/index.css
git add .
git commit -m "Force cache refresh - $(date)"
git push origin main
```

### Common Deployment Issues

If deployment fails:

1. Check GitHub Actions tab in your repository to see error logs
2. Make sure your `vite.config.ts` has the correct base path:

```typescript
// Add this to vite.config.ts if deploying to GitHub Pages
base: '/Allisone-compatibility-/'
```

## Security Note

The app currently simulates GitHub issue creation. For a production app with real issue creation, use a secure proxy server to protect your GitHub token.
