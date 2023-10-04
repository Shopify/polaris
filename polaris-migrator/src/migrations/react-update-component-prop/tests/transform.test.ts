import {check} from '../../../utilities/check';

const transform = 'react-update-component-prop';
const fixtures = [
  {
    name: 'basic',
    options: {
      componentName: 'MyComponent',
      fromProp: 'prop',
      toProp: 'newProp',
    },
  },
  {
    name: 'with-new-value',
    options: {
      componentName: 'MyComponent',
      fromProp: 'prop',
      toProp: 'newProp',
      toValue: 'new-value',
    },
  },
  {
    name: 'compound-component-with-new-value',
    options: {
      componentName: 'MyComponent.CompoundComponent',
      fromProp: 'prop',
      toProp: 'newProp',
      toValue: 'new-value',
    },
  },
  {
    name: 'compound-component-nested-with-new-value',
    options: {
      componentName: 'MyComponent.CompoundComponent.Nested',
      fromProp: 'prop',
      toProp: 'newProp',
      toValue: 'new-value',
    },
  },
  {
    name: 'with-boolean',
    options: {
      componentName: 'MyComponent',
      fromProp: 'booleanProp',
      toProp: 'variant',
      toValue: 'boolean-prop-value',
    },
  },
  {
    name: 'with-specific-value',
    options: {
      componentName: 'MyComponent',
      fromProp: 'prop',
      toProp: 'variant',
      fromValue: 'targetted-value',
      toValue: 'new-targetted-value',
    },
  },
  {
    name: 'comment-on-spread',
    options: {
      componentName: 'MyComponent',
      fromProp: 'booleanProp',
      toProp: 'variant',
      toValue: 'boolean-prop-value',
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
