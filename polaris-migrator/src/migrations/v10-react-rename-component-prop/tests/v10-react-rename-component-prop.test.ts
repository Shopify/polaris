import {check} from '../../../utilities/testUtils';

const migration = 'v10-react-rename-component-prop';
const fixtures = ['v10-react-rename-component-prop'];

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
