# Setting Up Your GitHub Repository for Allisone+ Data Storage

Follow these steps to set up your GitHub repository for storing Allisone+ compatibility data:

## 1. Repository Setup

1. Go to your repository: [https://github.com/SiSisuperTech/Allisone-compatibility-](https://github.com/SiSisuperTech/Allisone-compatibility-)

2. Create a `data` folder in the root of your repository:
   - Click on "Add file" > "Create new file"
   - For the name, type `data/README.md` 
   - Add some content like "This folder contains Allisone+ compatibility data"
   - Commit the file

## 2. Upload Initial Data Files

1. Navigate to the `data` folder you just created
2. Click "Add file" > "Upload files"
3. Upload the following files from your `initial-data` folder:
   - pms-software.json
   - xray-software.json
   - pms-matrix.json
   - xray-matrix.json
   - logo-updates.json
4. Commit these files

## 3. Set Up GitHub Actions

1. Create a `.github/workflows` folder:
   - Click on "Add file" > "Create new file"
   - For the name, type `.github/workflows/process-data-updates.yml`
   - Copy the content from your local `initial-data/.github/workflows/process-data-updates.yml` file
   - Commit the file

## 4. Configure Labels

1. Go to your repository "Issues" tab
2. Click on "Labels"
3. Create the following labels:
   - `data-update` (required for the workflow to process issues)
   - `pms-software`
   - `xray-software`
   - `pms-matrix`
   - `xray-matrix`
   - `logo-updates`
   - `compatibility`

## 5. Test Your Setup

1. In your application, make a change to compatibility data
2. Check that the app shows "syncing with GitHub"
3. Verify that an issue is created in your repository
4. The GitHub Action should process the issue and update the data files
5. Reload your application and verify the change is reflected

## Troubleshooting

If you encounter issues:

1. **GitHub Action not running**: Make sure the workflow file is correctly formatted and the issue has the `data-update` label
2. **Data not updating**: Check that your repository URL is correctly set in `src/services/githubStorage.ts`
3. **Permission issues**: Ensure the GitHub Action has permission to write to your repository

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub REST API Documentation](https://docs.github.com/en/rest)
