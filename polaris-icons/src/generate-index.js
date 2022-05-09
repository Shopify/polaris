const fs = require('fs');
const path = require('path');
const util = require('util');

const glob = require('glob');
const yaml = require('js-yaml');

const iconBasePath = path.resolve(__dirname, '../icons');
const distDir = path.join(__dirname, '../dist');
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
    `export {default as ${iconName}} from '../icons/${iconName}.svg';`,
  );
  iconTypes.push(
    `export declare const ${iconName}: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;`,
  );
});

const indexContent = `interface IconMetadata {
  name: string;
  set: 'major' | 'minor';
  description: string;
  keywords: string[];
}

export interface Metadata {
  [key: string]: IconMetadata;
}

export const metadata: Metadata = ${util.inspect(iconMetadata)};

${iconExports.join('\n')}
`;

const typesContent = `interface IconMetadata {
  name: string;
  set: 'major' | 'minor';
  description: string;
  keywords: string[];
}

export interface Metadata {
  [key: string]: IconMetadata;
}

export declare const metadata: Metadata;

${iconTypes.join('\n')}
`;

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

fs.writeFileSync(path.join(__dirname, './index.ts'), indexContent, 'utf8');
fs.writeFileSync(path.join(distDir, 'index.d.ts'), typesContent, 'utf8');
