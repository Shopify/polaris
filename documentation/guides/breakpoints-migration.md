## New breakpoints

TODO: write about the 5 new breakpoints

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

## Sass functions and mixins

The following Sass functions and mixins have been removed. You will need to replace any instances with the closest media query variable (listed above) or hard code the one off media query value you need.

### Functions

These functions were removed because the mixins using them were also removed ([see the Mixins section](#mixins)). In case you need to use those mixins you will find the fucntions necessary to make them work them here.

#### `breakpoint()`

<details>
<summary>Deprecated Function Definition</summary>

```scss
$default-browser-font-size: 16px;
$base-font-size: 16px;

@function em($value) {
  $unit: unit($value);

  @if $value == 0 {
    @return 0;
  } @else if $unit == 'em' {
    @return $value;
  } @else if $unit == 'rem' {
    @return $value / 1rem * 1em * ($base-font-size / $default-browser-font-size);
  } @else if $unit == 'px' {
    @return $value / $default-browser-font-size * 1em;
  } @else {
    @error 'Value must be in px, rem, or em.';
  }
}

@function breakpoint($value, $adjustment: 0) {
  $adjusted-value: em($adjustment);

  // Reduces chances to have a style void
  // between two media queries
  // See https://github.com/sass-mq/sass-mq/issues/6
  @if $adjustment == -1px {
    $adjusted-value: -0.01em;
  } @else if $adjustment == 1px {
    $adjusted-value: 0.01em;
  }

  @return em($value) + $adjusted-value;
}
```

</details>

### Mixins

Use `console.log()` to get the function output and hard code the value you need.
If the end value of is close to one of [Polaris’ tokens](https://polaris.shopify.com/tokens/breakpoints), we recommend replacing the mixin with the proper token (see the following examples).
Otherwise, if you really need to keep the old mixin, you can copy its definition and use it locally.

#### `breakpoint-after()`

_Before_

```scss
@include breakpoint-after(490) {
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
// check the Functions section for the definition of the `breakpoint()` function used here

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
// check the Functions section for the definition of the `breakpoint()` function used here

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
@include page-content-breakpoint-after(490) {
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
// check the Functions section for the definition of the Sass functions used here

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
@include page-content-breakpoint-before(490) {
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
// check the Functions section for the definition of the Sass functions used here

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
// Check the Variables section for the value of $not-condensed-content

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
// Check the Variables section for the value of $not-condensed-content

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
// Check the Variables section for the value of $partially-condensed-content

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
// Check the Variables section for the value of $partially-condensed-content

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
// Check the Variables section for the value of $stacked-content

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
// Check the Variables section for the value of $stacked-content

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
// Check the Variables section for the value of $page-max-width

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
// Check the Variables section for the value of $typography-condensed

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
// Check the Variables section for the value of $typography-condensed

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
// Check the Variables section for the value of $frame-with-nav-max-width

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

### Adding the functions and mixins to your repo

Any functions or mixins that were being consumed from `???` have been removed. If you wish to continue using them you can add them directly to your repo. All of the removed functions and mixins can found in the following file:

[File Name](#)

## Sass global variables

The following Sass global variables have been removed because the functions using them have been removed. If you wish to continue using them you can add them directly to your repo.

| Deprecated Variable                  | Value                                                                                         | Default Value |
| ------------------------------------ | --------------------------------------------------------------------------------------------- | ------------- |
| `$frame-with-nav-max-width`          | `layout-width(nav) + $page-max-width`                                                         | `77.375rem`   |
| `$nav-min-window`                    | `breakpoint($layout-width-page-with-nav-base)`                                                |
| `$nav-size`                          | `breakpoint($layout-width-nav-base)`                                                          |
| `$not-condensed-content`             | `em(layout-width(page-content, not-condensed))`                                               | `42.5em`      |
| `$not-condensed-min-page`            | `$not-condensed-content + $not-condensed-outer-spacing`                                       |
| `$not-condensed-outer-spacing`       | `breakpoint(2 * $layout-width-outer-spacing-max)`                                             |
| `$partially-condensed-content`       | `em(layout-width(page-content, partially-condensed))`                                         | `28.125em`    |
| `$partially-condensed-min-page`      | `$partially-condensed-content + $partially-condensed-outer-spacing`                           |
| `$partially-condensed-outer-spacing` | `breakpoint(2 *$layout-width-outer-spacing-min)`                                              |
| `$page-max-width`                    | `layout-width(primary, max) + layout-width(secondary, max) +layout-width(inner-spacing)`      | `62.375rem`   |
| `$stacked-content`                   | `em(layout-width(primary, min) + layout-width(secondary, min) + layout-width(inner-spacing))` | `46em`        |
| `$typography-condensed`              | `em(640px)`                                                                                   | `40em`        |
