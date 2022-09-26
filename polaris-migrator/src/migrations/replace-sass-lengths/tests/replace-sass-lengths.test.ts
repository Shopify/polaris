import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-lengths';
const fixtures = ['replace-sass-lengths'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
