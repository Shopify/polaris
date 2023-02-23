import {check} from '../../../utilities/testUtils';

const migration = 'v11-react-update-page-breadcrumbs';
const fixtures = ['v11-react-update-page-breadcrumbs'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
