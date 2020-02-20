/* eslint-disable no-console */
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'polaris-integration-test';

async function uploadFile(filename) {
  await storage.bucket(bucketName).upload(filename, {
    gzip: true,
  });

  console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile(...process.argv.slice(2)).catch(console.error);
