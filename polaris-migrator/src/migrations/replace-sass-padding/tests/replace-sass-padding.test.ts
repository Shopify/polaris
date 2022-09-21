import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-padding';
const fixtures = ['replace-sass-padding'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
