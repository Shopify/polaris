import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-custom-property-zindex';
const fixtures = ['styles-replace-custom-property-zindex'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
