#!/usr/bin/env bash
set -e
cd build

if [ -f "./Starship_Raycaster.exe" ]; then
  ./Starship_Raycaster.exe
elif [ -f "./Starship_Raycaster" ]; then
  ./Starship_Raycaster
else
  echo "Executable not found (expected Starship_Raycaster[.exe]). Build first."
  exit 1
fi

cd ..
