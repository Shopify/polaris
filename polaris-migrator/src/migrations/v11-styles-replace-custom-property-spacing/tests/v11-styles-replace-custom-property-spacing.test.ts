import {check} from '../../../utilities/testUtils';

const migration = 'v11-styles-replace-custom-property-spacing';
const fixtures = ['v11-styles-replace-custom-property-spacing'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
