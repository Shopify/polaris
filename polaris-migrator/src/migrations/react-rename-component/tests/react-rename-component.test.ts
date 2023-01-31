import {check} from '../../../utilities/testUtils';

const migration = 'react-rename-component';
const fixtures = ['react-rename-component'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
