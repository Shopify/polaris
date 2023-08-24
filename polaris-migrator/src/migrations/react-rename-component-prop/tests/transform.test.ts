import {check} from '../../../utilities/check';

const transform = 'react-rename-component-prop';
const fixtures = [
  {
    name: 'react-rename-component-prop',
    options: {
      componentName: 'MyComponent',
      from: 'prop',
      to: 'newProp',
    },
  },
  {
    name: 'react-rename-component-prop-with-new-value',
    options: {
      componentName: 'MyComponent',
      from: 'prop',
      to: 'newProp',
      newValue: 'new-value',
    },
  },
  {
    name: 'react-rename-compound-component-prop-with-new-value',
    options: {
      componentName: 'MyComponent.SubComponent',
      from: 'prop',
      to: 'newProp',
      newValue: 'new-value',
    },
  },
  {
    name: 'react-rename-component-prop-with-boolean',
    options: {
      componentName: 'MyComponent',
      from: 'booleanProp',
      to: 'variant',
      newValue: 'boolean-prop-value',
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
