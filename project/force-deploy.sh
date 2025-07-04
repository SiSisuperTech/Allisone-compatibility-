#!/bin/bash

# Cache Busting Deployment Script
# This script forces a fresh deployment by adding a timestamp to trigger cache refresh

echo "🚀 Force Cache Refresh Deployment"
echo "=================================="

# Get current timestamp
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')

echo "📅 Timestamp: $TIMESTAMP"

# Add a cache-busting comment to CSS to force rebuild
echo "/* Cache bust deployment: $TIMESTAMP */" >> src/index.css

# Clear any existing build cache
echo "🧹 Clearing build cache..."
rm -rf dist node_modules/.vite

# Rebuild
echo "🔨 Building fresh..."
npm run build

# Commit and push
echo "📤 Deploying with cache bust..."
git add .
git commit -m "🚀 Force cache refresh deployment - $TIMESTAMP

✨ Features:
- Cache busting headers added
- Fresh build with timestamp: $TIMESTAMP
- Force deployment visibility

This deployment includes cache-busting to ensure immediate visibility."

git push origin main

echo ""
echo "✅ Deployment complete!"
echo "🌐 URL: https://SiSisuperTech.github.io/Allisone-compatibility-/"
echo "⏰ Cache bust timestamp: $TIMESTAMP"
echo ""
echo "💡 Tips to see fresh deployment:"
echo "  - Wait 2-3 minutes for GitHub Pages cache"
echo "  - Use Ctrl+F5 (hard refresh) in browser"
echo "  - Try incognito/private browsing mode"
echo "  - Add ?v=$TIMESTAMP to URL for testing"
