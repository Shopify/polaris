import {check} from '../../../utilities/testUtils';

const migration = 'scss-replace-color-tokens';
const fixtures = ['scss-replace-color-tokens'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
