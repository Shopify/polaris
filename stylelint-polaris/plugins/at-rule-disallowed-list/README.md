## At rule disallowed list plugin

The purpose of this plugin is to disallow usages of the defined at-rules.

## How to use

### Options:

```ts
interface PrimaryOptions {
  /**
   * A map of at-rule names and disallowed at-rule identifiers represented as a list
   * of regular expressions or string literals.
   */
  [atRuleName: string]: (string | RegExp)[];
}
```

### How to configure:

```js
const stylelintConfig = {
  rules: {
    'stylelint-polaris/at-rule-disallowed-list': {
      // Using a RegExp ensures we disallow `@mixin id` and `@mixin id()`
      mixin: [/^disallowed-mixin/],
      include: [/^disallowed-mixin/],
    },
  },
};
```

### Run all linters

```
yarn lint
```

OR

```
yarn stylelint <file-glob>
```

e.x.

### Lint all files

```
yarn stylelint **/*.scss
```

### Lint the TextContainer.scss file

```
yarn stylelint src/components/TextContainer/TextContainer.scss
```

e.x. output

```
src/components/TextContainer/TextContainer.scss
  4:3  ✖  Invalid @mixin rule [disallowed-mixin]. Disallowed pattern [^disallowed-mixin]   (stylelint-polaris/at-rule-disallowed-list)
  6:5  ✖  Invalid @include rule [disallowed-mixin]. Disallowed pattern [^disallowed-mixin] (stylelint-polaris/at-rule-disallowed-list)
```
