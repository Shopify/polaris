# Migrating from v? to v? (Breakpoints)

Polaris v?.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v?.0.0)) features the removal of breakpoint scss functions and mixins in favor of new breakpoint tokens.

## Table of Contents

- [Sass functions and mixins](#sass-functions-and-mixins)
- [Replacing function and mixin instances with suggested values](#replacing-function-and-mixin-instances-with-suggested-values)
  - [`page-content-breakpoint-before()`](#page-content-breakpoint-before)
- [Adding the functions and mixins to your repo](#adding-the-functions-and-mixins-to-your-repo)
- [Sass global variables](#sass-global-variables)

## Sass functions and mixins

The following Sass functions and mixins have been removed. If you wish to continue using them you will need to either add them directly to your repo or replace any instances with a value equivalent.

### Replacing function and mixin instances with suggested values

#### `page-content-breakpoint-before()`

Use `console.log()` to get the function output and hard code the value you need.

Otherwise, you can copy the function definition and use it locally.

| Deprecated Function                | Source          |
| ---------------------------------- | --------------- |
| `page-content-breakpoint-before()` | [definition](#) |

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

| Deprecated Function          | Replacement Value        |
| ---------------------------- | ------------------------ |
| `border()`<br>`border(base)` | `--p-border-base`        |
| `border(dark)`               | `--p-border-dark`        |
| `border(transparent)`        | `--p-border-transparent` |
| `border(divider)`            | `--p-border-divider`     |

### Adding the functions and mixins to your repo

Any functions or mixins that were being consumed from `???` have been removed. If you wish to continue using them you can add them directly to your repo. All of the removed functions and mixins can found in the following file:

[File Name](#)

## Sass global variables

The following Sass global variables have been removed because the functions using them have been removed. If you wish to continue using them you can add them directly to your repo.

| Deprecated Variable                  | Value                                                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `$frame-with-nav-max-width`          | `$layout-width-nav-base + $page-max-width)`                                                              |
| `$stacked-content`                   | `breakpoint($layout-width-primary-min + $layout-width-secondary-min + $layout-width-inner-spacing-base)` |
| `$not-condensed-content`             | `breakpoint($layout-width-page-content-not-condensed)`                                                   |
| `$partially-condensed-content`       | `breakpoint($layout-width-page-content-partially-condensed`                                              |
| `$not-condensed-outer-spacing`       | `breakpoint(2 * $layout-width-outer-spacing-max)`                                                        |
| `$partially-condensed-outer-spacing` | `breakpoint(2 *$layout-width-outer-spacing-min)`                                                         |
| `$not-condensed-min-page`            | `$not-condensed-content + $not-condensed-outer-spacing`                                                  |
| `$partially-condensed-min-page`      | `$partially-condensed-content + $partially-condensed-outer-spacing`                                      |
| `$nav-size`                          | `breakpoint($layout-width-nav-base)`                                                                     |
| `$nav-min-window`                    | `breakpoint($layout-width-page-with-nav-base)`                                                           |
