const fs = require('fs');
const path = require('path');

const glob = require('glob');
const jsYaml = require('js-yaml');

const iconBasePath = path.resolve(__dirname, '../../../icons');

const allDeprecationsString = glob
  .sync('*.yml', {cwd: iconBasePath})
  .reduce(
    (memo, filename) => memo.concat(deprecationsForMetadata(filename)),
    [],
  )
  .join('\n');

if (allDeprecationsString) {
  console.log(
    `The following deprecated icons and aliases were found.

${allDeprecationsString}

If you are releasing a major version please consider removing these deprecations first.
Learn more: https://github.com/Shopify/polaris-icons/blob/main/CONTRIBUTING.md#deprecation-guidelines`,
  );
} else {
  console.log('No deprecated icons or aliases were found');
}

function deprecationsForMetadata(filename) {
  const metadata = jsYaml.load(
    fs.readFileSync(`${iconBasePath}/${filename}`, 'utf8'),
  );

  const deprecations = [];

  if (metadata.deprecated) {
    deprecations.push(`"${filename}" is deprecated without a replacement`);
  }

  if (metadata.deprecated_aliases) {
    deprecations.push(
      ...metadata.deprecated_aliases.map((deprecatedAlias) => {
        return `"${filename}" contains a deprecated alias "${deprecatedAlias}"`;
      }),
    );
  }

  return deprecations;
}
