import {check} from '../../../utilities/testUtils';

const migration = 'replace-card-component';
const fixtures = ['replace-card-component'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
