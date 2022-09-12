import {check} from '../../../utilities/testUtils';

const migration = 'replace-static-breakpoint-mixins';
const fixtures = ['replace-static-breakpoint-mixins'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
