import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property-shape';
const fixtures = ['styles-replace-custom-property-shape'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
