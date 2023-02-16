import {check} from '../../../utilities/testUtils';

const migration = 'react-rename-component-prop';
const fixtures = ['react-rename-component-prop'];

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
