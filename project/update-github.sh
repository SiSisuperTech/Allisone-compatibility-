#!/bin/bash
# Script to update GitHub repository with complete data
# This script assumes you have git access to the repository

echo "🚀 Updating GitHub repository with complete data..."

# Navigate to the repository root
cd "$(dirname "$0")"

# Add the updated files
git add data/pms-software.json
git add data/xray-software.json
git add data/pms-matrix.json
git add data/xray-matrix.json

# Commit the changes
git commit -m "Update data files with complete PMS and X-ray software lists

- Add missing PMS systems (23 additional entries)
- Include Dentally and other missing PMS systems
- Update X-ray software list
- Update compatibility matrices
- Total: 33 PMS + 22 X-ray systems

This fixes the issue where only 10 PMS systems were showing in production/dev environments."

# Push to GitHub
git push origin main

echo "✅ Data uploaded to GitHub successfully!"
echo "🔄 All environments will now show the complete data within a few minutes."
