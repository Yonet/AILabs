#!/bin/bash
# Navigate to the root of the computer-vision package
cd "$(dirname "$0")/.."

# Ensure the script is executable: chmod +x scripts/run.sh (already done, but good practice)

# Run the demo script
python src/demo.py
