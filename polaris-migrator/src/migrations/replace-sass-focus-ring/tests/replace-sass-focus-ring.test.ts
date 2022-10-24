import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-focus-ring';
const fixtures = ['replace-sass-focus-ring'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
