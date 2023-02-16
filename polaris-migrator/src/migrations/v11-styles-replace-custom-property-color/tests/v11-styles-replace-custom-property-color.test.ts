import {check} from '../../../utilities/testUtils';

const migration = 'v11-styles-replace-custom-property-color';
const fixtures = ['v11-styles-replace-custom-property-color'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
