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
      toValue: 'new-value',
    },
  },
  {
    name: 'react-rename-compound-component-prop-with-new-value',
    options: {
      componentName: 'MyComponent.CompoundComponent',
      from: 'prop',
      to: 'newProp',
      toValue: 'new-value',
    },
  },
  {
    name: 'react-rename-component-prop-with-boolean',
    options: {
      componentName: 'MyComponent',
      from: 'booleanProp',
      to: 'variant',
      toValue: 'boolean-prop-value',
    },
  },
  {
    name: 'react-rename-component-prop-with-specific-value',
    options: {
      componentName: 'MyComponent',
      from: 'prop',
      to: 'variant',
      fromValue: 'targeted-value',
      toValue: 'new-targeted-value',
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
