const fs = require('fs');
const path = require('path');

const {
  getCustomPropertyNames,
} = require('../../polaris-react/scripts/utilities/getCustomPropertyNames');

const dirPath = path.join(__dirname, '../data');
const outFile = 'polaris-custom-property-names.js';
const filePath = path.join(dirPath, outFile);

const polarisCustomPropertyNames = getCustomPropertyNames();

try {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  fs.writeFileSync(
    filePath,
    `module.exports = ${JSON.stringify(polarisCustomPropertyNames)};`,
  );
} catch (err) {
  throw new Error(
    `Could not create custom properties file "${filePath}": ${err}`,
  );
}
