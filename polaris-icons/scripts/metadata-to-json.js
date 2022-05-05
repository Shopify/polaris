const fs = require('fs');
const path = require('path');

const glob = require('glob');
const yaml = require('js-yaml');

const FILEPATH = path.join(__dirname, '../dist/metadata.json');
const allIconMetadataFiles = glob.sync(path.join(__dirname, '../icons/*.yml'));

const metadata = allIconMetadataFiles.map((iconMetadataFile) =>
  yaml.load(fs.readFileSync(iconMetadataFile), {
    schema: yaml.JSON_SCHEMA,
  }),
);

fs.writeFileSync(FILEPATH, JSON.stringify(metadata), 'utf8');

const message = [
  '📝 Metadata exported to:',
  FILEPATH,
  'Tip: cmd + click the filename to open.',
].join('\n');

// eslint-disable-next-line no-console
console.log(message);
