const fs = require('fs');
const path = require('path');
const util = require('util');

const glob = require('glob');
const yaml = require('js-yaml');

const iconBasePath = path.resolve(__dirname, '../icons');
const allIconMetadataFiles = glob.sync(path.join(iconBasePath, '*.yml'));

const iconExports = [];
const iconTypes = [];
const iconMetadata = {};
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

  const iconName = iconMetadataFile
    .replace(`${iconBasePath}/`, '')
    .replace('.yml', '');

  ommitedKeys.forEach((key) => delete iconData[key]);

  iconMetadata[iconName] = iconData;
  iconExports.push(
    `export {default as ${iconName}} from './icons/${iconName}.svg';`,
  );
  iconTypes.push(
    `export declare const ${iconName}: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;`,
  );
});

const fileContent = `type Icon = {
  name: string;
  set: 'major' | 'minor';
  description: string;
  keywords: string[];
};

type Icons = {
  [key: string]: Icon;
};

export const iconMetadata: Icons = ${util.inspect(iconMetadata)};

${iconExports.join('\n')}

${iconTypes.join('\n')}
`;

fs.writeFileSync(path.join(__dirname, '../index.ts'), fileContent, 'utf8');
