import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property-font';
const fixtures = ['styles-replace-custom-property-font'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
