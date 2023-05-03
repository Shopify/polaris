import {check} from '../../../utilities/testUtils';

const migration = 'v12-react-replace-link-components';
const fixtures = [
  'v12-react-replace-link-components',
  'v12-react-replace-link-components-invalid',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
