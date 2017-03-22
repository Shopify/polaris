// See https://github.com/Shopify/js-uploader

const glob = require('glob');
const Uploader = require('@shopify/js-uploader');
const {S3} = require('aws-sdk');
const awsConfig = require('../secrets.json').aws; // eslint-disable-line import/no-unresolved
const currentVersion = require('../package.json').version;

const argsStart = process.argv.findIndex((file) => file === __filename) + 1;
const args = process.argv.slice(argsStart);
const cdnFiles = args.reduce((result, pattern) =>
  result.concat(glob.sync(pattern)), []);

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
  s3: awsS3,
  files: cdnFiles,
  destination: 'quilt',
  version: currentVersion,
});

uploader.deployStaticFiles().catch((err) => {
  console.error(err); // eslint-disable-line no-console
  process.exit(1);
});
