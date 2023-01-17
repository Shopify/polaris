import {check} from '../../../utilities/testUtils';

const migration = 'react-breadcrumbs-migrate-from-array';
const fixtures = ['react-breadcrumbs-migrate-from-array'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
