// See https://github.com/Shopify/js-uploader

const {resolve} = require('path');
const Uploader = require('@shopify/js-uploader');
const {S3} = require('aws-sdk');
const awsConfig = require('../secrets.json').aws; // eslint-disable-line import/no-unresolved
const currentVersion = require('../package.json').version;

const files = [
  resolve(__dirname, '../build/quilt.css'),
  resolve(__dirname, '../build/quilt.min.css'),
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
  destination: 'quilt',
  version: currentVersion,
});

uploader.deployStaticFiles().catch((err) => {
  console.error(err); // eslint-disable-line no-console
  process.exit(1);
});
