import {check} from '../../../utilities/testUtils';

const migration = 'replace-static-mixins-with-declarations';
const fixtures = ['replace-static-mixins-with-declarations', 'with-namespace'];

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
