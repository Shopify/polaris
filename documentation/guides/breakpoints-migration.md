## Sass functions and mixins

The following Sass functions and mixins have been removed. If you wish to continue using them you will need to either add them directly to your repo or replace any instances with a value equivalent.

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
  @include breakpoint-after(resource-list(breakpoint-small)) {
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
  @include breakpoint-before(resource-list(breakpoint-small)) {
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
@mixin when-typography-not-condensed {
  @include breakpoint-after($typography-condensed) {
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

| Deprecated Variable                  | Value                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `$frame-with-nav-max-width`          | `$layout-width-nav-base + $page-max-width`                                                               |
| `$nav-min-window`                    | `breakpoint($layout-width-page-with-nav-base)`                                                           |
| `$nav-size`                          | `breakpoint($layout-width-nav-base)`                                                                     |
| `$not-condensed-content`             | `breakpoint($layout-width-page-content-not-condensed)`                                                   |
| `$not-condensed-min-page`            | `$not-condensed-content + $not-condensed-outer-spacing`                                                  |
| `$not-condensed-outer-spacing`       | `breakpoint(2 * $layout-width-outer-spacing-max)`                                                        |
| `$partially-condensed-content`       | `breakpoint($layout-width-page-content-partially-condensed`                                              |
| `$partially-condensed-min-page`      | `$partially-condensed-content + $partially-condensed-outer-spacing`                                      |
| `$partially-condensed-outer-spacing` | `breakpoint(2 *$layout-width-outer-spacing-min)`                                                         |
| `$stacked-content`                   | `breakpoint($layout-width-primary-min + $layout-width-secondary-min + $layout-width-inner-spacing-base)` |
