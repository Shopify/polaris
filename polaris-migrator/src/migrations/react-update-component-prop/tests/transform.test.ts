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
      fromPropType: 'boolean',
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
      fromValue: 'targeted-value',
      toValue: 'new-targeted-value',
    },
  },
  {
    name: 'with-comments-boolean-prop',
    options: {
      componentName: 'MyComponent',
      fromPropType: 'boolean',
      fromProp: 'booleanProp',
      toProp: 'newProp',
      toValue: 'new-value',
    },
  },
  {
    name: 'with-comments-string-prop',
    options: {
      componentName: 'MyComponent',
      fromProp: 'prop',
      toProp: 'newProp',
      toValue: 'new-value',
    },
  },
  {
    name: 'with-replacement-maps',
    options: {
      replacementMaps: {
        MyComponentA: [
          {
            fromProp: 'prop1',
            toProp: 'newProp1',
            fromValue: 'value-1',
            toValue: 'new-value-1',
          },
          {
            fromPropType: 'boolean',
            fromProp: 'prop2',
            toProp: 'newProp2',
            toValue: 'new-value-2',
          },
        ],
        MyComponentB: [
          {
            fromProp: 'prop3',
            toProp: 'newProp3',
            fromValue: 'value-3',
            toValue: 'new-value-3',
          },
        ],
      },
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
