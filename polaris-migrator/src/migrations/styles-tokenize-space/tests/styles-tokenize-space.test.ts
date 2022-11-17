import {check} from '../../../utilities/testUtils';

const migration = 'styles-tokenize-space';
const fixtures = ['styles-tokenize-space', 'with-namespace'];

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
