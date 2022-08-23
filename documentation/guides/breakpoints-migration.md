## New breakpoints

As part of our project to reduce the total number of unique breakpoints in Polaris and Shopify’s admin we've created the follow set of mobile first breakpoint tokens:

- `xs`: 0px
- `sm`: 490px
- `md`: 768px
- `lg`: 1040px
- `xl`: 1440px

A transform takes these values and generates Sass variables (which can be used in media conditions) for each breakpoint in `up`, `down`, and `only` directions.

Example of generated output for `breakpoints-md`:

- `@media #{$p-breakpoints-md-up} {/*...*/}`
- `@media #{$p-breakpoints-md-down} {/*...*/}`
- `@media #{$p-breakpoints-md-only} {/*...*/}`

To use these Sass variables you will need to import the Polaris’ scss file into your project from the package in `node_modules`:

```scss
@import 'path/to/node_modules/@shopify/polaris-tokens/dist/scss/media-queries';
```

### Media queries variables

We've created a collection of Sass variables for applying responsive styles at each breakpoint alias. A majority of the migration will involve replacing legacy media-queries or mixins with the following values:

```scss
$p-breakpoints-xs-up: '(min-width: 0em)';
$p-breakpoints-xs-down: '(max-width: -0.003125em)';
$p-breakpoints-xs-only: '(min-width: 0em) and (max-width: 30.621875em)';

$p-breakpoints-sm-up: '(min-width: 30.625em)';
$p-breakpoints-sm-down: '(max-width: 30.621875em)';
$p-breakpoints-sm-only: '(min-width: 30.625em) and (max-width: 47.996875em)';

$p-breakpoints-md-up: '(min-width: 48em)';
$p-breakpoints-md-down: '(max-width: 47.996875em)';
$p-breakpoints-md-only: '(min-width: 48em) and (max-width: 64.996875em)';

$p-breakpoints-lg-up: '(min-width: 65em)';
$p-breakpoints-lg-down: '(max-width: 64.996875em)';
$p-breakpoints-lg-only: '(min-width: 65em) and (max-width: 89.996875em)';

$p-breakpoints-xl-up: '(min-width: 90em)';
$p-breakpoints-xl-down: '(max-width: 89.996875em)';
$p-breakpoints-xl-only: '(min-width: 90em)';
```

## Sass mixins

The following Sass mixins have been removed. You will need to replace any instances with the closest media query variable (listed above) or hard code the one off media query value you need.

| Before                                                 | After                              |
| ------------------------------------------------------ | ---------------------------------- |
| `@include page-content-when-partially-condensed()`     | `@media #{$p-breakpoints-md-down}` |
| `@include page-content-when-not-partially-condensed()` | `@media #{$p-breakpoints-md-up}`   |
| `@include page-content-when-fully-condensed()`         | `@media #{$p-breakpoints-sm-down}` |
| `@include page-content-when-not-fully-condensed()`     | `@media #{$p-breakpoints-sm-up}`   |
| `@include page-content-when-layout-stacked()`          | `@media #{$p-breakpoints-md-down}` |
| `@include page-content-when-layout-not-stacked()`      | `@media #{$p-breakpoints-md-up}`   |
| `@include page-before-resource-list-small()`           | `@media #{$p-breakpoints-sm-down}` |
| `@include page-after-resource-list-small()`            | `@media #{$p-breakpoints-sm-up}`   |
| `@include page-when-not-max-width()`                   | `@media #{$p-breakpoints-lg-down}` |
| `@include when-typography-condensed()`                 | `@media #{$p-breakpoints-md-down}` |
| `@include when-typography-not-condensed()`             | `@media #{$p-breakpoints-md-up}`   |
| `@include frame-when-nav-hidden()`                     | `@media #{$p-breakpoints-md-down}` |
| `@include frame-when-nav-displayed()`                  | `@media #{$p-breakpoints-md-up}`   |
| `@include frame-with-nav-when-not-max-width()`         | `@media #{$p-breakpoints-xl-down}` |
| `@include after-topbar-sheet()`                        | `@media #{$p-breakpoints-sm-up}`   |

### Dynamic mixins

For dynamic mixins, the media query variable will depend on the value being passed as an argument to the mixin. On the table below we use `490px` which is the same value as our `sm` breakpoint:

| Before                                           | After                              |
| ------------------------------------------------ | ---------------------------------- |
| `@include breakpoint-after(490px)`               | `@media #{$p-breakpoints-sm-up}`   |
| `@include breakpoint-before(490px)`              | `@media #{$p-breakpoints-sm-down}` |
| `@include page-content-breakpoint-after(490px)`  | `@media #{$p-breakpoints-sm-up}`   |
| `@include page-content-breakpoint-before(490px)` | `@media #{$p-breakpoints-sm-down}` |

You can also use our [migration script](https://stackblitz.com/edit/node-cgrsxx?file=README.md) that will recommend the best matching breakpoint token for your case.

## Sass global variables

The following Sass global variables have been removed because the functions using them have been removed. If you wish to continue using them you can add them directly to your repo.

| Deprecated Variable                  | Value (assuming 1em = 16px) |
| ------------------------------------ | --------------------------- |
| `$frame-with-nav-max-width`          | `77.375rem`                 |
| `$nav-min-window`                    | `48.0625em`                 |
| `$nav-size`                          | `15em`                      |
| `$not-condensed-content`             | `46.5em`                    |
| `$not-condensed-min-page`            | `46.5em`                    |
| `$not-condensed-outer-spacing`       | `4em`                       |
| `$page-max-width`                    | `62.375rem`                 |
| `$partially-condensed-content`       | `30.625em`                  |
| `$partially-condensed-min-page`      | `30.625em`                  |
| `$partially-condensed-outer-spacing` | `2.5em`                     |
| `$stacked-content`                   | `50em`                      |
| `$typography-condensed`              | `40em`                      |
