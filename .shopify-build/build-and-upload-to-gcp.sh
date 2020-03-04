#!/usr/bin/env bash
shopt -s extglob
set -e

yarn run build
yarn pack
echo $GOOGLE_CLOUD_SERVICE_ACCOUNT | base64 -d > './gcpKey.json'
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/gcpKey.json"
mv shopify-polaris-*.tgz "shopify-polaris-${BUILDKITE_COMMIT}.tgz"
node ./scripts/upload-artifact.js "./shopify-polaris-${BUILDKITE_COMMIT}.tgz"
