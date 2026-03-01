#!/bin/bash

xattr -d com.apple.quarantine ./tailwindcss 2>/dev/null
chmod +x ./tailwindcss

VERSION=$(date +%s)

echo "🚀 Starting Tailwind Build for all landings..."

for dir in ./src/*/; do
    folder=$(basename "$dir")
    input_css="${dir}css/src-styles.css"
    output_css="${dir}css/styles.css"
    html_file="${dir}index.html"

    if [ -f "$input_css" ]; then
        echo "📦 Building: $folder"
        ./tailwindcss -i "$input_css" -o "$output_css" --content "${dir}**/*.html" --minify

        if [ -f "$html_file" ]; then
                    sed -i '' "s/styles.css?v=[0-9]*/styles.css?v=$VERSION/g" "$html_file"
                fi
    fi
done

echo "✅ All builds complete!"