#!/bin/bash
set -e

# Set variables
IMAGE_NAME="ankitosm/todotrack"
VERSION="1.0"

# Build the image
echo "Building Docker image $IMAGE_NAME:$VERSION..."
docker build -t $IMAGE_NAME:latest -t $IMAGE_NAME:$VERSION .

# Check if user wants to push the image
echo ""
read -p "Do you want to push the image to Docker Hub? (y/n): " PUSH_IMAGE

if [ "$PUSH_IMAGE" = "y" ] || [ "$PUSH_IMAGE" = "Y" ]; then
    echo "Logging in to Docker Hub..."
    docker login -u ankitosm
    
    echo "Pushing image $IMAGE_NAME:$VERSION..."
    docker push $IMAGE_NAME:$VERSION
    docker push $IMAGE_NAME:latest
    
    echo "Image pushed successfully!"
else
    echo "Skipping push to Docker Hub."
fi

echo ""
echo "To run the image locally:"
echo "docker run -d --name todotrack -p 80:8080 -v todotrack-data:/home/todotrack/server/files -v todotrack-db:/home/todotrack/server $IMAGE_NAME:latest"
echo ""
echo "Or use docker-compose:"
echo "docker-compose up -d" 