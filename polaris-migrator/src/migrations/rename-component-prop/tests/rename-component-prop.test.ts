import {check} from '../../../utilities/testUtils';

const migration = 'rename-component-prop';
const fixtures = ['rename-component-prop'];

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
