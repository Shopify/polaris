const fs = require('fs');
const path = require('path');

const glob = require('glob');
const yaml = require('js-yaml');

const FILEPATH = path.join(__dirname, '../metadata.json');
const allIconMetadataFiles = glob.sync(path.join(__dirname, '../icons/*.yml'));

const metadata = allIconMetadataFiles.map((iconMetadataFile) =>
  yaml.load(fs.readFileSync(iconMetadataFile), {
    schema: yaml.JSON_SCHEMA,
  }),
);

fs.writeFileSync(FILEPATH, JSON.stringify(metadata, null, 2), 'utf8');

console.log('📝 Metadata exported to:');
console.log(`   ${FILEPATH}`);
console.log('   Tip: cmd + click the filename to open.');
