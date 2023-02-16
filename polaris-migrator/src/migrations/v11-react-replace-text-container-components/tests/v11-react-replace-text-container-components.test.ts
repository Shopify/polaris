import {check} from '../../../utilities/testUtils';

const migration = 'v11-react-replace-text-container-components';
const fixtures = [
  'v11-react-replace-text-container-components',
  'v11-react-replace-text-container-components-tight',
  'v11-react-replace-text-container-components-loose',
  'v11-react-replace-text-container-components-multi',
  'v11-react-replace-text-container-components-multi-key',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
