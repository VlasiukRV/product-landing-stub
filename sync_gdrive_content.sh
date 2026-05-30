#!/bin/bash

# Configuration
SOURCE="gdrive:TSB_DOCs/TSB_app/uptarget_co/careers"
DEST="/home/ec2-user/product-landing-stub/projects/uptarget-co/src/content/careers"

echo "Starting sync from Google Drive to AWS..."

# Running rclone copy
# --copy-links: если есть симлинки
# --exclude: игнорируем системный мусор
/usr/bin/rclone copy "$SOURCE" "$DEST" \
    --progress \
    --exclude ".DS_Store" \
    --exclude "._*"

if [ $? -eq 0 ]; then
    echo "Sync completed successfully!"
else
    echo "Sync failed! Check your VPN connection."
fi