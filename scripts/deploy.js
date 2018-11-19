/* eslint-disable no-console */
// See https://github.com/Shopify/js-uploader

const {resolve} = require('path');
const Uploader = require('@shopify/js-uploader');
const {S3} = require('aws-sdk');
const awsConfig = require('../secrets.json').aws;
const currentVersion = require('../package.json').version;

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
  // Don't upload assets to the /latest/ directory
  // as this version is currently used in Shopify/web only,
  // while newer versions of polaris-react already exist in the wild
  latest: false,
});

uploader.deployStaticFiles().catch((err) => {
  console.error(err);
  process.exit(1);
});
