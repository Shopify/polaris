## At rule disallowed list plugin

The purpose of this plugin is to disallow usages of the defined at-rules.

## How to use

### Options

```ts
interface PrimaryOptions {
  /**
   * A map of at-rule names and disallowed at-rule identifiers represented as a list
   * of regular expressions or string literals.
   */
  [atRuleName: string]: (string | RegExp)[];
}
```

### How to configure

```js
const stylelintConfig = {
  rules: {
    'polaris/at-rule-disallowed-list': {
      // Using a RegExp ensures we disallow `@mixin id` and `@mixin id()`
      // https://regex101.com/r/PJYwuP/1
      mixin: [/^disallowed-mixin($|\()/],
      include: [/^disallowed-mixin($|\()/],
    },
  },
};
```

### How to run

All files:

```
yarn stylelint **/*.scss
```

A specific file:

```
yarn stylelint src/example.scss
```

```scss
// src/example.scss
@mixin disallowed-mixin() {
  color: red;
}

.example {
  @include disallowed-mixin;
}
```

Example output:

```
src/example.scss
  1:8  ✖  Invalid @mixin rule [disallowed-mixin]. Disallowed pattern [^disallowed-mixin]   (stylelint-polaris/at-rule-disallowed-list)
  6:12 ✖  Invalid @include rule [disallowed-mixin]. Disallowed pattern [^disallowed-mixin] (stylelint-polaris/at-rule-disallowed-list)
```
