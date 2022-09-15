import {check} from '../../../utilities/testUtils';

const migration = 'replace-static-mixins-with-declarations';
const fixtures = ['replace-static-mixins-with-declarations'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
