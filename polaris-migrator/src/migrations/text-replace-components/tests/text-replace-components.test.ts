import {check} from '../../../utilities/testUtils';

const migration = 'text-replace-components';
const fixtures = ['with-relative'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    options: {
      relative: fixture.includes('relative') ? true : undefined,
    },
  });
}
