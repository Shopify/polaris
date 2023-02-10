import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property-motion';
const fixtures = ['styles-replace-custom-property-motion'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
