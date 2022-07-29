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

#### `breakpoint-after()`

_Before_

```scss
@include breakpoint-after(490px) {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin breakpoint-after($breakpoint, $inclusive: true) {
  @media (min-width: #{breakpoint($breakpoint, if($inclusive, 0, 1px))}) {
    @content;
  }
}
```

</details>

#### `breakpoint-before()`

_Before_

```scss
@include breakpoint-before(490) {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin breakpoint-before($breakpoint, $inclusive: true) {
  @media (max-width: #{breakpoint($breakpoint, if($inclusive, 0, -1px))}) {
    @content;
  }
}
```

</details>

#### `page-content-breakpoint-after()`

_Before_

```scss
@include page-content-breakpoint-after(490px) {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin page-content-breakpoint-after($size) {
  $size: breakpoint($size);
  @if $size < $partially-condensed-content {
    // prettier-ignore
    [data-has-navigation] #{if(&, "&", "*")} {
      @media (max-width: #{$nav-min-window}) and (min-width: #{$size}),
        (min-width: #{$nav-size + $size}) {
          @content;
      }
    }
    @media (min-width: #{$size}) {
      @content;
    }
  } @else if $size < $not-condensed-content {
    // prettier-ignore
    [data-has-navigation] #{if(&, "&", "*")} {
      @media (max-width: #{$nav-min-window}) and (min-width: #{$size + $partially-condensed-outer-spacing}),
        (min-width: #{$nav-size + $size + $partially-condensed-outer-spacing}) {
          @content;
      }
    }
    @media (min-width: #{$size + $partially-condensed-outer-spacing}) {
      @content;
    }
  } @else {
    // prettier-ignore
    [data-has-navigation] #{if(&, "&", "*")} {
      @media (max-width: #{$nav-min-window}) and (min-width: #{$size + $not-condensed-outer-spacing}),
        (min-width: #{$nav-size + $size + $not-condensed-outer-spacing}) {
          @content;
      }
    }
    @media (min-width: #{$size + $not-condensed-outer-spacing}) {
      @content;
    }
  }
}
```

</details>

#### `page-content-breakpoint-before()`

_Before_

```scss
@include page-content-breakpoint-before(490px) {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin page-content-breakpoint-before($size) {
  $size: breakpoint($size);
  @if $size < $partially-condensed-content {
    // prettier-ignore
    [data-has-navigation] #{if(&, "&", "*")} {
      @media (max-width: #{min($nav-min-window, $size)}),
        (min-width: #{$nav-min-window}) and (max-width: #{$nav-size + $size}) {
          @content;
      }
    }
    @media (max-width: #{$size}) {
      @content;
    }
  } @else if $size < $not-condensed-content {
    // prettier-ignore
    [data-has-navigation] #{if(&, "&", "*")} {
      @media (max-width: #{min($nav-min-window, $size + $partially-condensed-outer-spacing)}),
        (min-width: #{$nav-min-window}) and (max-width: #{$nav-size + $size + $not-condensed-outer-spacing}) {
          @content;
      }
    }
    @media (max-width: #{$size + $partially-condensed-outer-spacing}) {
      @content;
    }
  } @else {
    // prettier-ignore
    [data-has-navigation] #{if(&, "&", "*")} {
      @media (max-width: #{min($nav-min-window, $size + $partially-condensed-outer-spacing)}),
        (min-width: #{$nav-min-window}) and (max-width: #{$nav-size + $size + $not-condensed-outer-spacing}) {
          @content;
      }
    }
    @media (max-width: #{$size + $not-condensed-outer-spacing}) {
      @content;
    }
  }
}
```

</details>

#### `page-content-when-partially-condensed()`

_Before_

```scss
@include page-content-when-partially-condensed() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-md-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$not-condensed-content: 46.5em;

@mixin page-content-when-partially-condensed() {
  @include page-content-breakpoint-before($not-condensed-content) {
    @content;
  }
}
```

</details>

#### `page-content-when-not-partially-condensed()`

_Before_

```scss
@include page-content-when-not-partially-condensed() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-md-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$not-condensed-content: 46.5em;

@mixin page-content-when-not-partially-condensed() {
  @include page-content-breakpoint-after($not-condensed-content) {
    @content;
  }
}
```

</details>

#### `page-content-when-fully-condensed()`

_Before_

```scss
@include page-content-when-fully-condensed() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$partially-condensed-content: 30.625em;

@mixin page-content-when-fully-condensed() {
  @include page-content-breakpoint-before($partially-condensed-content) {
    @content;
  }
}
```

</details>

#### `page-content-when-not-fully-condensed()`

_Before_

```scss
@include page-content-when-not-fully-condensed() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$partially-condensed-content: 30.625em;

@mixin page-content-when-not-fully-condensed() {
  @include page-content-breakpoint-after($partially-condensed-content) {
    @content;
  }
}
```

</details>

#### `page-content-when-layout-stacked()`

_Before_

```scss
@include page-content-when-layout-stacked() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-md-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$stacked-content: 50em;

@mixin page-content-when-layout-stacked() {
  @include page-content-breakpoint-before($stacked-content) {
    @content;
  }
}
```

</details>

#### `page-content-when-layout-not-stacked()`

_Before_

```scss
@include page-content-when-layout-not-stacked() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-md-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$stacked-content: 50em;

@mixin page-content-when-layout-not-stacked() {
  @include page-content-breakpoint-after($stacked-content) {
    @content;
  }
}
```

</details>

#### `page-after-resource-list-small()`

_Before_

```scss
@include page-after-resource-list-small() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin page-after-resource-list-small() {
  @include breakpoint-after(458px) {
    @content;
  }
}
```

</details>

#### `page-before-resource-list-small()`

_Before_

```scss
@include page-before-resource-list-small() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin page-before-resource-list-small() {
  @include breakpoint-before(458px) {
    @content;
  }
}
```

</details>

#### `page-when-not-max-width()`

_Before_

```scss
@include page-when-not-max-width() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-lg-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$page-max-width: 62.375rem;

@mixin page-when-not-max-width() {
  @include breakpoint-before($page-max-width) {
    @content;
  }
}
```

</details>

#### `when-typography-condensed()`

_Before_

```scss
@include when-typography-condensed() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-md-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$typography-condensed: 40em;

@mixin when-typography-condensed {
  @include breakpoint-before($typography-condensed) {
    @content;
  }
}
```

</details>

#### `when-typography-not-condensed()`

_Before_

```scss
@include when-typography-not-condensed() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-md-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$typography-condensed: 40em;

@mixin when-typography-not-condensed {
  @include breakpoint-after($typography-condensed) {
    @content;
  }
}
```

</details>

#### `frame-when-nav-displayed()`

_Before_

```scss
@include frame-when-nav-displayed() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-md-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin frame-when-nav-displayed() {
  @include breakpoint-after(48.0625rem) {
    @content;
  }
}
```

</details>

#### `frame-when-nav-hidden()`

_Before_

```scss
@include frame-when-nav-hidden() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-md-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin frame-when-nav-hidden() {
  @include breakpoint-before(48.0625rem, false) {
    @content;
  }
}
```

</details>

#### `frame-with-nav-when-not-max-width()`

_Before_

```scss
@include frame-with-nav-when-not-max-width() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-xl-down} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
$frame-with-nav-max-width: 77.375rem;

@mixin frame-with-nav-when-not-max-width() {
  @include breakpoint-before($frame-with-nav-max-width) {
    @content;
  }
}
```

</details>

#### `after-topbar-sheet()`

_Before_

```scss
@include after-topbar-sheet() {
  padding: 1em;
}
```

_After_

```scss
@media #{$p-breakpoints-sm-up} {
  padding: 1em;
}
```

<details>
<summary>Deprecated Mixin Definition</summary>

```scss
@mixin after-topbar-sheet {
  @include breakpoint-after(450px) {
    @content;
  }
}
```

</details>

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
