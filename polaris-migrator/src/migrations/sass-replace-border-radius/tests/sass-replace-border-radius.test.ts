import {check} from '../../../utilities/testUtils';

const migration = 'sass-replace-border-radius';
const fixtures = ['sass-replace-border-radius', 'with-namespace'];

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
