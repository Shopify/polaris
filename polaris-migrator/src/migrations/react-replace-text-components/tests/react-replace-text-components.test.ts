import {check} from '../../../utilities/testUtils';

const migration = 'react-replace-text-components';
const fixtures = [
  'react-replace-text-components',
  'with-other-component-and-other-component-props',
  'with-text-style-props',
  // 'with-relative',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    options: {
      relative: fixture.includes('relative') ? true : undefined,
    },
  });
}
