const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const Ajv = require('ajv');
const yaml = require('js-yaml');
const glob = require('glob');

const metadataSchema = require('./metadata-schema.json');

const ajvInstance = new Ajv({
  allErrors: true,
  formats: {date: true},
});
const validate = ajvInstance.compile(metadataSchema);

const allIconMetadataFiles = glob
  .sync(path.resolve(__dirname, '../icons/*.yml'))
  .map((absoluteIconPath) => {
    return {
      iconPath: path.relative(path.join(__dirname, '..'), absoluteIconPath),
      iconMetadata: yaml.load(fs.readFileSync(absoluteIconPath), {
        schema: yaml.JSON_SCHEMA,
      }),
    };
  }, []);

allIconMetadataFiles.forEach(({iconPath, iconMetadata}) => {
  describe(`Metadata: packages/${iconPath}`, () => {
    it(`has a valid schema`, () => {
      validate(iconMetadata);
      expect(ajvInstance.errorsText(validate.errors)).toBe('No errors');
    });

    it(`has filename that matches the schema name and set`, () => {
      const expectedName = pascalCase(
        `${iconMetadata.name} ${iconMetadata.set}`,
      );

      expect(path.basename(iconPath)).toStrictEqual(`${expectedName}.yml`);
    });

    // Skip icons missing a description untill we know every icon has one
    const skipIfIncomplete = iconMetadata.description === 'N/A' ? it.skip : it;
    skipIfIncomplete(`has a description and at least one valid keyword`, () => {
      const validDescription = iconMetadata.description
        .replace(/n\/a/i, '')
        .trim();

      // eslint-disable-next-line jest/no-standalone-expect
      expect(validDescription).not.toStrictEqual('');

      const validKeywords = iconMetadata.keywords.filter(
        (keyword) => keyword.trim().toLowerCase() !== 'n/a',
      );

      // eslint-disable-next-line jest/no-standalone-expect
      expect(validKeywords.length).toBeGreaterThan(0);
    });

    (iconMetadata.deprecated_aliases || []).forEach((alias) => {
      it(`deprecated alias ${alias} does not conflict with other icon names`, () => {
        const otherNames = allIconMetadataFiles.reduce((memo, fileData) => {
          return memo.concat(
            [path.basename(fileData.iconPath, path.extname(fileData.iconPath))],
            // Don't include aliases for current item
            // eslint-disable-next-line jest/no-if
            fileData.iconPath === iconPath
              ? []
              : fileData.iconMetadata.deprecated_aliases || [],
          );
        }, []);

        expect(otherNames).not.toContain(alias);
      });
    });
  });
});

function pascalCase(string) {
  return _.upperFirst(_.camelCase(string));
}
