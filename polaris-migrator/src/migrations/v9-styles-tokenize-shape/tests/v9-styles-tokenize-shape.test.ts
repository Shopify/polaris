import {check} from '../../../utilities/testUtils';

const migration = 'v9-styles-tokenize-shape';
const fixtures = ['v9-styles-tokenize-shape', 'with-namespace'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
    options: {
      namespace: fixture.includes('with-namespace')
        ? 'legacy-polaris-v8'
        : undefined,
    },
  });
}
