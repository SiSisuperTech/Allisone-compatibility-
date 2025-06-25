# GitHub Repository Setup Guide

Follow these steps to push your app to GitHub and set up automatic deployment:

## Step 1: Create a new GitHub repository

1. Go to [GitHub](https://github.com)
2. Click the "+" button in the top right corner and select "New repository"
3. Name it "Allisone-compatibility-"
4. Make it public
5. Don't initialize with any files (no README, no .gitignore, no license)
6. Click "Create repository"

## Step 2: Push your code to GitHub

Copy and paste these commands into your terminal:

```powershell
git remote add origin https://github.com/SiSisuperTech/Allisone-compatibility-.git
git branch -M main
git push -u origin main
```

If you're prompted for credentials, enter your GitHub username and password or use a personal access token.

## Step 3: Set up GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to the "Pages" section
4. Under "Source", select "GitHub Actions"
5. The deployment workflow will run automatically after your first push

## Step 4: Configure GitHub Actions (Optional)

For the data update workflow to work properly with GitHub issues:

1. Go to your repository settings
2. Click on "Secrets and variables" → "Actions"
3. Add a new repository secret:
   - Name: `GITHUB_TOKEN`
   - Value: [Generate a personal access token with "repo" permissions](https://github.com/settings/tokens)

## Step 5: Check deployment

After a few minutes, your app should be live at:
https://SiSisuperTech.github.io/Allisone-compatibility-/

## Next steps

1. Update any hardcoded URLs in your code if needed
2. Test creating a compatibility update to ensure the GitHub issue workflow works
3. Share the public URL with your users

If you have any issues, check the "Actions" tab in your GitHub repository to see build logs.
