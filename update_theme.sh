#!/bin/bash
set -e

echo "Applying modern FilePizza-inspired theme to TodoTrack..."

# First create directory to store customizations
mkdir -p webapp/custom_theme

# Generate a simple FilePizza-inspired SVG icon
cat > webapp/custom_theme/todotrack-icon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="95" fill="#2962FF" />
  <path d="M100 40 L140 120 L60 120 Z" fill="white" />
  <circle cx="100" cy="100" r="20" fill="white" />
</svg>
EOF

# Update the favicon with the new SVG
cp webapp/custom_theme/todotrack-icon.svg webapp/favicon.ico

echo "Theme applied successfully!"
echo ""
echo "To run the docker build process with the new theme:"
echo "chmod +x update_theme.sh && ./update_theme.sh && docker-compose build"
echo ""
echo "Or to run with docker:"
echo "chmod +x update_theme.sh && ./update_theme.sh && docker build -t ankitosm/todotrack:latest ." 