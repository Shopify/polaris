const fs = require('fs');
const path = require('path');

const glob = require('glob');
const yaml = require('js-yaml');

const iconBasePath = path.resolve(__dirname, '../icons');
const allIconMetadataFiles = glob.sync(path.join(iconBasePath, '*.yml'));

const data = {};
const ommitedKeys = [
  'version',
  'exclusive_use',
  'authors',
  'date_modified',
  'date_added',
];

allIconMetadataFiles.forEach((iconMetadataFile) => {
  const iconData = yaml.load(fs.readFileSync(iconMetadataFile), {
    schema: yaml.JSON_SCHEMA,
  });

  const iconKey = iconMetadataFile
    .replace(`${iconBasePath}/`, '')
    .replace('.yml', '');

  ommitedKeys.forEach((key) => delete iconData[key]);

  data[iconKey] = iconData;
});

fs.writeFileSync(
  path.join(__dirname, '../dist/metadata.json'),
  JSON.stringify(data),
  'utf8',
);
