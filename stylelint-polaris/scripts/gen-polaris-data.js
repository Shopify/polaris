const fs = require('fs');
const path = require('path');

const {
  getCustomPropertyNames,
} = require('../../polaris-react/scripts/utilities/getCustomPropertyNames');
const getKeyframeNames = require('../../polaris-react/scripts/utilities/getKeyframeNames');

const dirPath = path.join(__dirname, '../tmp-tokens');

const polarisCustomPropertyNames = getCustomPropertyNames();
const polarisKeyframeNames = getKeyframeNames();

try {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  fs.writeFileSync(
    path.join(dirPath, 'polaris-custom-property-names.js'),
    `module.exports = ${JSON.stringify(polarisCustomPropertyNames)};`,
  );

  fs.writeFileSync(
    path.join(dirPath, 'polaris-keyframe-names.js'),
    `module.exports = ${JSON.stringify(polarisKeyframeNames)};`,
  );
} catch (err) {
  throw new Error(`Failed to generate Polaris data: ${err}`);
}
