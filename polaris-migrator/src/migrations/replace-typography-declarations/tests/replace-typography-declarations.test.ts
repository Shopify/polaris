import {check} from '../../../utilities/testUtils';

const migration = 'replace-typography-declarations';
const fixtures = ['replace-typography-declarations', 'with-namespace'];
// const fixtures = ['replace-typography-declarations'];

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
