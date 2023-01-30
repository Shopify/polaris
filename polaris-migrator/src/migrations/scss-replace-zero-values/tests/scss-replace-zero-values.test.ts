import {check} from '../../../utilities/testUtils';

const migration = 'scss-replace-zero-values';
const fixtures = ['scss-replace-zero-values'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
