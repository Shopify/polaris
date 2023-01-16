### Conventions

#### conventions/custom-property-allowed-list

Allows definition of custom properties not prefixed with `--p-`, `--pc-`, or `--polaris-version-`.

```diff
root: {
// Do
+ --osui_animation-name-drag-handle-pulse: osui_drag-handle-pulse;
// Don't
- --p-animation-name-drag-handle-pulse: osui_drag-handle-pulse;
};
```

Flags declaration property values using `--p-*` that are not valid Polaris tokens.

```diff
// Do
+ font-size: var(--p-font-size-200);
// Don't
- font-size: var(--p-fontsize-200);
```

Flags declaration property values using private `--pc-*` tokens.

```diff
// Do
+ background: var(--p-action-secondary-depressed);
// Don't
- background: var(--pc-button-color-depressed);
```

### Colors

#### colors/color-named

```diff
// Do
+ color: var(--p-text);
+ fill: var(--p-icon)
// Don't
- color: black;
- fill: dimgray;
```

#### colors/color-no-hex

```diff
// Do
+ color: var(--p-text);
+ fill: var(--p-icon)
// Don't
- color: #202223;
- fill: #5c5f62;
```

#### colors/declaration-property-value-disallowed-list

```diff
// Do
+ background: var(--p-hint-from-direct-light);
// Don't
- background: black;
- opacity: 0.15;
```

#### colors/function-disallowed-list

```diff
// Do
+ color: var(--p-text-disabled);
+ background: var(--p-action-secondary-hovered-dark);
// Don't
- color: rgb(140, 145, 150);
- background: color('hover');
```

#### colors/at-rule-disallowed-list

```diff
// Do
+ fill: var(--p-icon-subdued);
// Don't
- fill: recolor-icon(--p-text-subdued);
```

#### colors/global-disallowed-list

Disallows use of legacy custom properties.

```diff
// Do
+ border: transparent;
// Don't
- border: var(--p-override-transparent);
```

Disallows use of legacy mixin map data.

```diff
// Don't
- @type map $filter-palette-data: $polaris-color-filters;
```

### Motion

#### motion/function-disallowed-list

```diff
// Do
+ transition-duration: var(--p-duration-200);
// Don't
- transition-duration: 200ms;
```

#### motion/declaration-property-unit-disallowed-list

```diff
// Do
+ transition-duration: var(--p-duration-200);
// Don't
- transition-duration: 200ms;
```

#### motion/at-rule-disallowed-list

```diff
// Do
+ animation: var(--p-keyframes-spin) var(--p-duration-500) linear infinite;
// Don't
- @keyframes spin {
-  from {
-    transform: rotate(0deg);
-  }

-  to {
-    transform: rotate(360deg);
-  }
-}
```

#### motion/global-disallowed-list

```diff
// Do
+ transition: var(--p-duration-100) var(--p-ease);
// Don't
- transition: var(--p-duration-1-0-0) var(--p-ease);
```

### Typography

#### typography/declaration-property-value-disallowed-list

```diff
// Do
+ <Text fontWeight='bold' />
// Do
+ font-weight: var(--p-font-weight-bold);
// Don't
- font-weight: 700;
```

#### typography/declaration-property-unit-disallowed-list

```diff
// Do
+ font-size: var(--p-font-size-75);
+ line-height: var(--p-font-line-height-3);
// Don't
- font-size: 12px;
- line-height: 1.5rem
```

#### typography/function-disallowed-list

```diff
// Do
+ <Text variant="headingXs" as="p" />
// Do
+ font-size: var(--p-font-size-75);
// Don't
- font-size: font-size('caption');
```

#### typography/at-rule-disallowed-list

```diff
// Do
+ <Text breakWord truncate />
// Don't
- @include text-breakword;
- @include truncate;
```

#### typography/global-disallowed-list

```diff
// Do
+ font-size: var(--p-font-size-200);
// Don't
- font-size: $base-font-size;
```

### Shape

#### shape/declaration-property-unit-disallowed-list

```diff
// Do
+ border-width: var(--p-border-width-2);
+ border-radius: var(--p-border-radius-2);
// Don't
- border-width: 2px;
- border-radius: 0.5rem;
```

#### shape/function-disallowed-list

```diff
// Do
+ border-radius: var(--p-border-radius-base);
// Don't
- border-radius: border-radius();
```

#### shape/at-rule-disallowed-list

```diff
// Do
+ outline: var(--p-border-width-1) solid transparent;
// Don't
- @include high-contrast-outline()
```

NOTE: The `focus-ring` at rule does not currently have an equivalent token or component. If you need to use it, feel free to add a stylelint ignore comment until a solution from Polaris is ready.

```diff
// Do
+ &:focus {
  + outline: var(--p-border-width-2) solid var(--p-focused);
  + outline-offset: var(--p-space-05);
+ }
// Don't
- @include focus-ring
```

#### shape/global-disallowed-list

```diff
// Do
+ border-radius: var(--p-border-radius-2);
// Don't
- border-radius: var(--p-border-radius-wide);
```

### Spacing

#### spacing/declaration-property-unit-disallowed-list

```diff
// Do
+ gap: var(--p-space-05);
+ margin: var(--p-space-3) 0;
// Don't
- gap: 2px;
- margin: 12px  0;
```

#### spacing/function-disallowed-list

```diff
// Do
+ padding: var(--p-space-1);
// Don't
- padding: rem(4px);
```

#### spacing/global-disallowed-list

```diff
// Do
+ margin-bottom: var(--p-space-1);
// Don't
- margin-bottom: var(--p-text-field-spinner-offset);
```

### Depth

#### depth/declaration-property-unit-disallowed-list

```diff
// Do
+ box-shadow: var(--p-shadow-card);
// Don't
- box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
```

#### depth/function-disallowed-list

```diff
// Do
+ box-shadow: var(--p-shadow-base);
// Don't
- filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
```

#### depth/global-disallowed-list

```diff
// Do
+ box-shadow: var(--p-shadow-card);
// Don't
- box-shadow: var(--p-card-shadow);
```

#### depth/property-disallowed-list

Instead of using properties like `text-shadow`, make sure the text has proper contrast with the background so that it is readable without a shadow.

```diff
// Don't
- text-shadow: 2px 2px #ff0000;
```

### Media queries

#### media-queries/function-disallowed-list

```diff
// Do
+ @media (min-width: var(--p-breakpoints-md)) {}
// Don't
- @include breakpoint-after(layout-width(page-with-nav)) {}
```

#### media-queries/media-queries-allowed-list

```diff
// Do
+ @include @media #{$p-breakpoints-sm-up} {}
// Don't
- @include @media #{$my-var} {}
```

#### media-queries/at-rule-disallowed-list

```diff
// Do
+ @media (max-width: var(--p-breakpoints-md)) {}
// Don't
- @include breakpoint-before(layout-width(page-with-nav)) {}
```

### Z-Index

#### z-index/declaration-property-value-allowed-list

```diff
// Do
+ z-index: var(--p-z-1);
// Don't
- z-index: 1;
```

#### z-index/function-disallowed-list

```diff
// Do
+ z-index: var(--p-z-1);
// Don't
- z-index: z-index(content);
```

#### z-index/global-disallowed-list

```diff
// Do
+ z-index: var(--p-z-1);
// Don't
- z-index(toast, $fixed-element-stacking-order);
```

### Layout

#### layout/declaration-property-value-disallowed-list

```diff
// Do
+ <Stack />
// Don't
- width: 100%;
```

#### layout/function-disallowed-list

Use hard coded pixel or rem values for `width` and `height` instead of legacy mixins/variables or spacing tokens.

```diff
// Do
+ height: 56px;
// Don't
- height: top-bar-height();
```

#### layout/at-rule-disallowed-list

```diff
// Do
+ @media print {
+   display: none;
+ }
// Don't
- @include print-hidden;
```

#### layout/property-disallowed-list

```diff
// Do
+ <Columns />
// Don't
- display: grid;
```

#### layout/global-disallowed-list

```diff
// Do
+ <Checkbox />
// Don't
- height: var(--p-choice-size);
```

### Legacy

#### legacy/at-rule-disallowed-list

```diff
// Do
+ <UnstyledButton />
// Don't
- @include unstyled-button;
```

#### legacy/function-disallowed-list

```diff
// Don't
- @include available-names
```

#### legacy/global-disallowed-list

Use [Polaris tokens](https://polaris.shopify.com/tokens) when possible. Otherwise use hard coded pixel or rem values instead of legacy mixins/variables.

```diff
// Do
+ left: calc(-1 * var(--p-space-1));
// Don't
- left: -1 * $timeline-border-width;
```
