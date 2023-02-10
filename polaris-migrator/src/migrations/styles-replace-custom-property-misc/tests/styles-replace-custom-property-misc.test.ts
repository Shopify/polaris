import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property-misc';
const fixtures = ['styles-replace-custom-property-misc'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
