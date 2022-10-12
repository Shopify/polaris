import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-border';
const fixtures = ['replace-sass-border'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
