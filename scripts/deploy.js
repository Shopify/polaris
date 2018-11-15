/* eslint-disable no-console */
// See https://github.com/Shopify/js-uploader

const {resolve} = require('path');
const Uploader = require('@shopify/js-uploader');
const {S3} = require('aws-sdk');
const semver = require('semver');
const awsConfig = require('../secrets.json').aws;
const currentVersion = require('../package.json').version;

// Check if the current version is stable
// and doesn’t include -alpha.x, -beta.x, -rc.x tags
const isStableVersion = !semver.prerelease(currentVersion);

const files = [
  resolve(__dirname, '../build/polaris.css'),
  resolve(__dirname, '../build/polaris.min.css'),
];

const awsS3 = new S3({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  region: 'us-east-1',
  params: {
    Bucket: 'sdks.shopifycdn.com',
    ACL: 'public-read',
  },
});

const uploader = new Uploader({
  files,
  s3: awsS3,
  destination: 'polaris',
  version: currentVersion,
  // Upload assets to the /latest/ directory
  // only when the version is stable (no alpha, beta, rc…)
  latest: isStableVersion,
});

uploader.deployStaticFiles().catch((err) => {
  console.error(err);
  process.exit(1);
});
