import {check} from '../../../utilities/testUtils';

const migration = 'v9-styles-replace-custom-property-font';
const fixtures = ['v9-styles-replace-custom-property-font'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
