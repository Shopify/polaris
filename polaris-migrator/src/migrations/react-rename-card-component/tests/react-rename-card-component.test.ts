import {check} from '../../../utilities/testUtils';

const migration = 'react-rename-card-component';
const fixtures = [
  'react-rename-card-component',
  'card-prop-types',
  'renamed-import',
  'renamed-available-jsx',
  'renamed-available-identifier',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
  });
}
