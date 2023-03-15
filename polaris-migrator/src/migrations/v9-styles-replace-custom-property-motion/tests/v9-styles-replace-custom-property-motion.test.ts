import {check} from '../../../utilities/testUtils';

const migration = 'v9-styles-replace-custom-property-motion';
const fixtures = ['v9-styles-replace-custom-property-motion'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
