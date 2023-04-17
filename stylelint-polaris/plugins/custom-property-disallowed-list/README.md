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

> Note: Property keys for `disallowedValues` are evaluated in order. Please ensure that you
> order your property keys from most specific to least specific.
