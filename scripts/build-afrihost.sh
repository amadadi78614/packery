#!/usr/bin/env bash
# Build the Afrihost (Windows/IIS + PHP) version of the site into ./out
#   - static export of the Next.js site (NEXT_PUBLIC_STATIC_EXPORT=1)
#   - PHP form handlers + IIS web.config copied in from ./afrihost
set -euo pipefail
cd "$(dirname "$0")/.."

# Node route handlers can't be statically exported; park them during the build.
PARK=".afrihost-build-parked-api"
restore() { if [ -d "$PARK" ]; then rm -rf app/api; mv "$PARK" app/api; fi; }
trap restore EXIT
rm -rf "$PARK" out
mv app/api "$PARK"

NEXT_PUBLIC_STATIC_EXPORT=1 npx next build

cp afrihost/web.config out/web.config
mkdir -p out/api
cp -R afrihost/api/. out/api/
rm -f out/api/_config.php   # never ship a local config; the server keeps its own

echo "Afrihost build ready in ./out"
