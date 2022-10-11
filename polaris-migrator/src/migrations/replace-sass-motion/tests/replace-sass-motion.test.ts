import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-motion';
const fixtures = ['replace-sass-duration', 'replace-sass-easing'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
  });
}
