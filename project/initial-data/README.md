# Initial Data Files for GitHub Storage

These files contain the initial data structure needed for setting up the GitHub-based storage for the Allisone+ compatibility matrix application.

## How to Use These Files

1. Create a `data` folder in your GitHub repository: [SiSisuperTech/Allisone-compatibility-](https://github.com/SiSisuperTech/Allisone-compatibility-)
2. Upload these JSON files to that folder
3. The application will then be able to read and update this data

## File Descriptions

- `pms-software.json` - List of PMS software with metadata
- `xray-software.json` - List of X-ray software with metadata
- `pms-matrix.json` - PMS compatibility information
- `xray-matrix.json` - X-ray compatibility information
- `logo-updates.json` - Updated logo URLs

## Next Steps

After uploading these files to your repository, set up a GitHub Actions workflow to process data update requests automatically. See the main README-GITHUB-STORAGE.md file for more detailed instructions.
