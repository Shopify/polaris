import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-focus-ring';
const fixtures = ['replace-sass-focus-ring', 'with-namespace'];

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
