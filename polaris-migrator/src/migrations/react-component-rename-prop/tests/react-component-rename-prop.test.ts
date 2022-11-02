import {check} from '../../../utilities/testUtils';

const migration = 'react-component-rename-prop';
const fixtures = ['react-component-rename-prop'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    options: {
      componentName: 'MyComponent',
      from: 'prop',
      to: 'newProp',
    },
  });
}
