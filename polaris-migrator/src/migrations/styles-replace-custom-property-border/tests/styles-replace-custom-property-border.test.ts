import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property-border';
const fixtures = ['styles-replace-custom-property-border'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
