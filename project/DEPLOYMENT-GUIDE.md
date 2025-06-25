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

If deployment fails:

1. Check GitHub Actions tab in your repository to see error logs
2. Make sure your `vite.config.ts` has the correct base path:

```typescript
// Add this to vite.config.ts if deploying to GitHub Pages
base: '/Allisone-compatibility-/'
```

## Security Note

The app currently simulates GitHub issue creation. For a production app with real issue creation, use a secure proxy server to protect your GitHub token.
