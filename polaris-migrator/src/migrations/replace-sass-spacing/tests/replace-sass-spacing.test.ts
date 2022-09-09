import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-spacing';
const fixtures = ['replace-spacing'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
