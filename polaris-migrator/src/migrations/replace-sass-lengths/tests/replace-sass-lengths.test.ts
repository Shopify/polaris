import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-lengths';
const fixtures = ['replace-sass-lengths', 'with-namespace'];

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
