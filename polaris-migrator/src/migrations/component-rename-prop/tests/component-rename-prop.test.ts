import {check} from '../../../utilities/testUtils';

const migration = 'component-rename-prop';
const fixtures = ['component-rename-prop'];

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
