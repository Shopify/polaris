import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property-depth';
const fixtures = ['styles-replace-custom-property-depth'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
