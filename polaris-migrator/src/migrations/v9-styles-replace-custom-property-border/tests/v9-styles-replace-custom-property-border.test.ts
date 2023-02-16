import {check} from '../../../utilities/testUtils';

const migration = 'v9-styles-replace-custom-property-border';
const fixtures = ['v9-styles-replace-custom-property-border'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
