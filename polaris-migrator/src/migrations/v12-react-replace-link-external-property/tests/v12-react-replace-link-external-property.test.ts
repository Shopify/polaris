import {check} from '../../../utilities/testUtils';

const migration = 'v12-react-replace-link-external-property';
const fixtures = [
  'v12-react-replace-link-external-property',
  'v12-react-replace-link-external-property-invalid',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
