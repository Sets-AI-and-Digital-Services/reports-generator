#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Define variables
PROJECT_DIR=~/reports-generator-dynamic
BUILD_DIR=$PROJECT_DIR/dist
DEPLOY_DIR=/home/ubuntu/3000-build
DEPLOY_PORT=3000

SERVICE_NAME=client-1

echo "Starting Frontend Deployment..."

# Ensure the project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Error: Project directory $PROJECT_DIR does not exist!"
    exit 1
fi

# Navigate to the project directory
cd $PROJECT_DIR

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the React project
echo "Building the project..."
npm run build

# Move the build to the deployment directory
echo "Deploying build..."
sudo rm -rf $DEPLOY_DIR
sudo mv $BUILD_DIR $DEPLOY_DIR
sudo chown -R www-data:www-data $DEPLOY_DIR
sudo chmod -R 755 $DEPLOY_DIR

# Copy Environment file to the build directory
if [ -f "$PROJECT_DIR/.env" ]; then
    echo "Copying updated .env file to build directory..."
    sudo cp $PROJECT_DIR/.env $DEPLOY_DIR/

else
    echo "Warning: No .env file found in project directory!"
fi

# Setup systemd service for a Node.js server (if needed)
SERVICE_FILE=/etc/systemd/system/$SERVICE_NAME.service

if [ -f "$SERVICE_FILE" ]; then
    echo "Updating existing service..."
    sudo systemctl daemon-reload
    sudo systemctl restart $SERVICE_NAME
else
    echo "Creating new service..."
    cat <<EOL | sudo tee $SERVICE_FILE
[Unit]
Description=MCR Frontend Service
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=$DEPLOY_DIR
EnvironmentFile=$DEPLOY_DIR/.env
ExecStart=/bin/bash -c 'source $DEPLOY_DIR/.env && npx serve -s $DEPLOY_DIR -l $DEPLOY_PORT'
Restart=always

[Install]
WantedBy=multi-user.target
EOL

    # Enable and start the service
    sudo systemctl daemon-reload
    sudo systemctl enable $SERVICE_NAME
    sudo systemctl start $SERVICE_NAME
fi

echo "Deployment Successful .. Check Journal"
