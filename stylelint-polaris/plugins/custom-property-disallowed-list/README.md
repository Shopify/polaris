## Custom property disallowed list plugin

### Options:

```ts
interface PrimaryOptions {
  /**
   * A list of regular expressions or string literals that match disallowed custom properties.
   */
  disallowedProperties?: (string | RegExp)[];
  /**
   * A map of properties and their disallowed custom properties represented as a list
   * of regular expressions or string literals.
   */
  disallowedValues?: {[property: string]: (string | RegExp)[]};
}
```

### Configuration

#### Example 1

```js
const stylelintConfig = {
  rules: {
    'polaris/custom-property-disallowed-list': {
      disallowedProperties: ['--p-foo'],
      disallowedValues: {
        width: ['--p-foo', /--p-bar/ /* etc... */],
        '/.+/': ['--p-foo', /--p-bar/ /* etc... */],
      },
    },
  },
};
```

#### Example 2

```js
const disallowedVarsBorder = [
  // Legacy custom properties
  '--p-foo',
  '--p-bar',
];

const stylelintOptions = {
  border: [
    {
      'polaris/custom-property-disallowed-list': {
        disallowedProperties: disallowedVarsBorder,
        disallowedValues: {'/.+/': disallowedVarsBorder},
      },
    },
  ],
```

> Note: Property keys for `disallowedValues` are evaluated in order. Please ensure that you
> order your property keys from most specific to least specific.
