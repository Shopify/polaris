import {check} from '../../../utilities/testUtils';

const migration = 'react-update-page-breadcrumbs';
const fixtures = ['react-update-page-breadcrumbs'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
