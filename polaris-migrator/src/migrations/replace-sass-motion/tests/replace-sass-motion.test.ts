import {check} from '../../../utilities/testUtils';

const migration = 'replace-sass-motion';
// const fixtures = ['debug'];
// const fixtures = ['replace-sass-duration', 'replace-sass-easing'];
const fixtures = ['replace-sass-duration'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: 'scss',
    options: {
      namespace: 'legacy-polaris-v8',
    },
  });
}
