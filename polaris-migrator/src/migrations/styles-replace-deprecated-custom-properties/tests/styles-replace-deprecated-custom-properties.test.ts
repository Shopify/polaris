import {check} from '../../../utilities/testUtils';

const migration = 'styles-replace-deprecated-custom-properties';
const fixtures = ['styles-replace-deprecated-custom-properties'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
