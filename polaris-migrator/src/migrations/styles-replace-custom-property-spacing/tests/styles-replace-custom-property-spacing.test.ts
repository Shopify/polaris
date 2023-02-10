import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property-spacing';
const fixtures = ['styles-replace-custom-property-spacing'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
