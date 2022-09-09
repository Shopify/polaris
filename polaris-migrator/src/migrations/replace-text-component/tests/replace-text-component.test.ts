import {check} from '../../../utilities/testUtils';

const migration = 'replace-text-component';
const fixtures = ['replace-components'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
