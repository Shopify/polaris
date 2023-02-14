## Media query allowed list plugin

The purpose of this plugin is to ensure we're following our established conventions for Polaris breakpoints, and only using breakpoints aliases generated from Polaris tokens.

### Enforced Rules

- Media queries must be defined using Polaris `breakpoints` aliases e.g. `@media #{$p-breakpoints-sm-up} {}`
  and/or supported media types e.g. `print`, `screen`, `forced-colors`, etc.

- Media queries must not contain `min-`, `max-`, `width` or `height` conditions.

## How to use

### Options

```ts
interface PrimaryOptions {
  /**
   * A list of RegExps or string literals to match against media types.
   */
  allowedMediaTypes: (string | RegExp)[];
  /**
   * A list of RegExps or string literals to match against media feature names.
   *
   * Note: This is passed directly to the built-in `media-feature-name-allowed-list` rule.
   * https://stylelint.io/user-guide/rules/list/media-feature-name-value-allowed-list
   */
  allowedMediaFeatureNames: (string | RegExp)[];
  /**
   * A list of RegExps or string literals to match against SCSS interpolation expressions in media queries.
   */
  allowedScssInterpolations: (string | RegExp)[];
}
```

### How to configure

```js
const stylelintConfig = {
  rules: {
    'polaris/media-query-allowed-list': {
      allowedMediaTypes: ['print'],
      allowedMediaFeatureNames: ['forced-colors', 'reduced-motion'],
      allowedScssInterpolations: [
        '$p-breakpoints-sm-up',
        '$p-breakpoints-md-up',
      ],
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
yarn stylelint src/components/typography/textContainer/TextContainer.scss
```

e.x. output

```
src/components/typography/textContainer/TextContainer.scss
  4:3  ✖  Invalid media query [(min-width: 0px)].              polaris/media-query-allowed-list
  6:5  ✖  Invalid media query [print and (min-width: 0px)].    polaris/media-query-allowed-list
```
