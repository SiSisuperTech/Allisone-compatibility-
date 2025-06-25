# GitHub-Based Data Storage for Dental Software Compatibility Matrix

This document explains how the GitHub repository is used to store and share the compatibility matrix data for the Allisone+ dental software integration platform.

## 1. Repository Setup

1. **Repository Information**
   - Repository: [SiSisuperTech/Allisone-compatibility-](https://github.com/SiSisuperTech/Allisone-compatibility-)
   - This repository is used to store and share compatibility data between different instances of the application
   - Ensure the repository is set to public so data can be accessed without authentication

2. **Required Data Structure**
   - The repository needs a `/data` folder with the following files:
     - `pms-software.json` - Stores PMS software information
     - `xray-software.json` - Stores X-ray software information
     - `pms-matrix.json` - Stores PMS compatibility matrix
     - `xray-matrix.json` - Stores X-ray compatibility matrix
     - `logo-updates.json` - Stores logo URL updates
   - If these files don't exist yet, they'll need to be created with the appropriate structure

3. **Optional GitHub Pages Setup**
   - For easier data viewing, you can set up GitHub Pages
   - Go to repository Settings > Pages
   - Set Source branch to `main` and folder to `/docs`
   - Create a `/docs` folder in your repo with a simple viewer application
   - Add a simple index.html file to `/docs` to verify it works

## 2. Setting Up GitHub Actions for Data Updates

Create a GitHub Action workflow that will:
1. Process incoming issues with data update requests
2. Validate the data format
3. Update the appropriate JSON files
4. Commit the changes back to the repository

Create a file `.github/workflows/process-data-updates.yml`:

```yaml
name: Process Data Updates

on:
  issues:
    types: [opened, edited]

jobs:
  process-data-updates:
    if: contains(github.event.issue.labels.*.name, 'data-update')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
      
      - name: Extract JSON data from issue
        id: extract-data
        uses: actions/github-script@v6
        with:
          script: |
            const issue = context.payload.issue;
            const body = issue.body;
            
            // Extract the data between the ```json and ``` markers
            const jsonMatch = body.match(/```json\n([\s\S]*?)```/);
            if (!jsonMatch) {
              core.setFailed('No JSON data found in the issue');
              return;
            }
            
            // Parse the JSON data
            const jsonData = JSON.parse(jsonMatch[1]);
            
            // Determine which file to update based on the issue labels
            let filePath = null;
            if (issue.labels.find(l => l.name === 'pms-software')) {
              filePath = 'data/pms-software.json';
            } else if (issue.labels.find(l => l.name === 'xray-software')) {
              filePath = 'data/xray-software.json';
            } else if (issue.labels.find(l => l.name === 'pms-matrix')) {
              filePath = 'data/pms-matrix.json';
            } else if (issue.labels.find(l => l.name === 'xray-matrix')) {
              filePath = 'data/xray-matrix.json';
            } else if (issue.labels.find(l => l.name === 'logo-updates')) {
              filePath = 'data/logo-updates.json';
            } else if (issue.labels.find(l => l.name === 'compatibility')) {
              // For compatibility updates, we need to update both matrices
              // This requires a more complex update logic
              // For now, just log the data and we'll handle this case separately
              console.log('Compatibility update', jsonData);
            }
            
            if (!filePath && !issue.labels.find(l => l.name === 'compatibility')) {
              core.setFailed('Unknown data type');
              return;
            }
            
            core.setOutput('filePath', filePath);
            core.setOutput('data', JSON.stringify(jsonData));
            core.setOutput('isCompatibility', issue.labels.find(l => l.name === 'compatibility') ? 'true' : 'false');
      
      - name: Update data files
        if: steps.extract-data.outputs.isCompatibility != 'true'
        run: |
          FILE_PATH="${{ steps.extract-data.outputs.filePath }}"
          DATA='${{ steps.extract-data.outputs.data }}'
          
          # Create file if it doesn't exist
          mkdir -p $(dirname $FILE_PATH)
          touch $FILE_PATH
          
          # If file is empty, initialize with empty JSON object/array
          if [ ! -s $FILE_PATH ]; then
            if [[ $FILE_PATH == *matrix* || $FILE_PATH == *logo* ]]; then
              echo "{}" > $FILE_PATH
            else
              echo "[]" > $FILE_PATH
            fi
          fi
          
          # Merge the new data with existing data (this would require a more complex script)
          # For now, just overwriting the file with the new data as a placeholder
          echo $DATA > $FILE_PATH
      
      - name: Handle compatibility update
        if: steps.extract-data.outputs.isCompatibility == 'true'
        run: |
          DATA='${{ steps.extract-data.outputs.data }}'
          PARSED_DATA=$(echo $DATA | jq '.')
          
          # Extract required fields
          PMS_ID=$(echo $PARSED_DATA | jq -r '.pmsId')
          XRAY_ID=$(echo $PARSED_DATA | jq -r '.xrayId')
          PMS_STATUS=$(echo $PARSED_DATA | jq -r '.pmsStatus')
          XRAY_STATUS=$(echo $PARSED_DATA | jq -r '.xrayStatus')
          PMS_MODES=$(echo $PARSED_DATA | jq -r '.pmsModes')
          XRAY_MODES=$(echo $PARSED_DATA | jq -r '.xrayModes')
          
          # Load the current matrices
          PMS_MATRIX_FILE="data/pms-matrix.json"
          XRAY_MATRIX_FILE="data/xray-matrix.json"
          
          # Initialize if needed
          mkdir -p data
          if [ ! -f "$PMS_MATRIX_FILE" ]; then
            echo "{}" > $PMS_MATRIX_FILE
          fi
          
          if [ ! -f "$XRAY_MATRIX_FILE" ]; then
            echo "{}" > $XRAY_MATRIX_FILE
          fi
          
          # Update matrices (this would require a more complex script in practice)
          # This is just a placeholder to demonstrate the concept
          echo "Updating matrices with compatibility data between PMS $PMS_ID and X-ray $XRAY_ID"
          # In a real implementation, you would use jq to update the JSON files
      
      - name: Commit and push changes
        run: |
          git config --global user.name 'GitHub Actions Bot'
          git config --global user.email 'github-actions[bot]@users.noreply.github.com'
          git add data
          git commit -m "Update data from issue #${{ github.event.issue.number }}" || echo "No changes to commit"
          git push
      
      - name: Close issue
        uses: actions/github-script@v6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: 'Data has been updated. Thank you for your contribution! ✨'
            })
            
            github.rest.issues.update({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'closed'
            })
```

## 3. Updating your React App

1. Update the `DATA_REPO_URL` in `githubStorage.ts` with your actual repository URL:
   ```typescript
   const DATA_REPO_URL = 'https://raw.githubusercontent.com/YourUsername/dental-compatibility-data/main';
   ```

2. Use the `useGitHubStorage` hook in your app instead of `useLocalStorage`:
   ```typescript
   const { 
     pmsMatrix, 
     xrayMatrix, 
     setPmsMatrix, 
     setXrayMatrix,
     saveCompatibilityEntry,
     syncMatrices
   } = useCompatibilityData();
   ```

3. Add a sync button to your UI to allow users to manually refresh data from GitHub:
   ```jsx
   <button 
     onClick={() => syncMatrices()}
     className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
   >
     <RefreshIcon className="mr-2 h-4 w-4" /> Sync Data
   </button>
   ```

## 4. Security Considerations

1. **Public vs. Private Repository**: If your compatibility data is sensitive, consider using a private repository. You'll need to manage access through GitHub's permissions system.

2. **Data Validation**: Implement proper validation for data submissions in the GitHub Action to prevent malicious data.

3. **Access Control**: For a production app, consider implementing authentication for data submission, possibly through a small server-side API that validates user credentials before creating issues.

## 5. Scaling Considerations

For a small to medium-sized dataset (less than a few thousand entries), this approach works well. For larger datasets or high-frequency updates, consider:

1. Using a proper database with a REST API
2. Using a Firebase or similar real-time database
3. Setting up your own server with a GraphQL or REST API

## Getting Help

If you encounter any issues with this setup:

1. Check the GitHub Actions logs for error messages
2. Make sure your repository is properly configured for GitHub Pages
3. Verify the format of your JSON data in issues
