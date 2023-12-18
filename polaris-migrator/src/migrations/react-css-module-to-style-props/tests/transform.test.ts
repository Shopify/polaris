import {check} from '../../../utilities/check';

const transform = 'react-css-module-to-style-props';
const fixtures = [
  {
    name: 'simple-class',
    options: {
      componentName: 'MyComponent',
    },
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    transform,
    options: fixture.options,
  });
}
