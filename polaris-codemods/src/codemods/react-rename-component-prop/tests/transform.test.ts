import {check} from '../../../utilities/check';

const transform = 'react-rename-component-prop';
const fixtures = ['react-rename-component-prop'];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    transform,
    options: {
      componentName: 'MyComponent',
      from: 'prop',
      to: 'newProp',
    },
  });
}
