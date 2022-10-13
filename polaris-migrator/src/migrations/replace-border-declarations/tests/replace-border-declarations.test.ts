import {check} from '../../../utilities/testUtils';

const migration = 'replace-border-declarations';
const fixtures = ['replace-border-declarations'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
