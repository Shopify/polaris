import {check} from '../../../utilities/testUtils';

const migration = 'react-replace-text-components';
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
