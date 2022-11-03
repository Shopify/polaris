import {check} from '../../../utilities/testUtils';

const migration = 'scss-replace-line-height';
const fixtures = ['scss-replace-line-height', 'with-namespace'];

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
