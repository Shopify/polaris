import {check} from '../../../utilities/testUtils';

const migration = 'v11-styles-replace-custom-property-font';
const fixtures = ['v11-styles-replace-custom-property-font'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
