import {check} from '../../../utilities/testUtils';

const migration = 'react-replace-text-components';
const fixtures = [
  'react-replace-text-components',
  'remove-imports-all',
  'remove-imports-partial-identifier',
  'remove-imports-partial-props-type',
  'remove-imports-partial-props-invalid',
  'with-other-component-and-other-component-props',
  'with-text-style-props',
  'with-relative',
  'with-component-name',
  'with-relative-display-text',
  'with-relative-text-style-props',
  'with-relative-other-component-and-other-component-props',
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    options: {
      relative: fixture.includes('relative') ? true : undefined,
      componentName: fixture.includes('component-name') ? 'Heading' : undefined,
    },
  });
}
