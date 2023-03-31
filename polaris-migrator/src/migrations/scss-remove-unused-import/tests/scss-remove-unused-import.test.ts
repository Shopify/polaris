import {check} from '../../../utilities/testUtils';

const migration = 'scss-remove-unused-import';
const fixtures = [
  'scss-remove-unused-import',
  'with-used-import',
  'with-import-alias',
  'with-used-import-alias',
  'with-options',
  'with-configuration',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
    options: {
      url: fixture.includes('options')
        ? 'media-queries'
        : 'global-styles/legacy-polaris-v8',
    },
  });
}
