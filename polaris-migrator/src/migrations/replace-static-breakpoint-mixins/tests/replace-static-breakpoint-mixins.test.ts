import {check} from '../../../utilities/testUtils';

const migration = 'replace-static-breakpoint-mixins';
const fixtures = ['replace-static-breakpoint-mixins', 'with-namespace'];

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
