import {check} from '../../../utilities/testUtils';

const migration = 'v11-react-replace-link-external-property';
const fixtures = [
  'v11-react-replace-link-external-property',
  'v11-react-replace-link-external-property-invalid',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
