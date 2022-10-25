import {check} from '../../../utilities/testUtils';

const migration = 'replace-text-component';
const fixtures = ['replace-components-relative'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    options: {
      relative: fixture.includes('relative') ? true : undefined,
    },
  });
}
