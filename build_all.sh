#!/bin/bash

xattr -d com.apple.quarantine ./tailwindcss 2>/dev/null
chmod +x ./tailwindcss

echo "Starting Build Tailwind for all landings..."

echo "vlasiuk-mevlasiuk-me"
./tailwindcss -i ./src/vlasiuk-me/css/src-styles.css \
              -o ./src/vlasiuk-me/css/styles.css \
              --content "./src/vlasiuk-me/**/*.html" \
              --minify

echo "Build real-time-speech-translator"
./tailwindcss -i ./src/real-time-speech-translator/css/src-styles.css \
              -o ./src/real-time-speech-translator/css/styles.css \
              --content "./src/real-time-speech-translator/**/*.html" \
              --minify

echo "owl-solution"
./tailwindcss -i ./src/owl-solution/css/src-styles.css \
              -o ./src/owl-solution/css/styles.css \
              --content "./src/owl-solution/**/*.html" \
              --minify

echo "dynamic-ui-bridge"
./tailwindcss -i ./src/dynamic-ui-bridge/css/src-styles.css \
              -o ./src/dynamic-ui-bridge/css/styles.css \
              --content "./src/dynamic-ui-bridge/**/*.html" \
              --minify

echo "✅ Build complete!"