import {check} from '../../../utilities/testUtils';

const migration = 'v9-styles-replace-custom-property-legacy';
const fixtures = ['v9-styles-replace-custom-property-legacy'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
