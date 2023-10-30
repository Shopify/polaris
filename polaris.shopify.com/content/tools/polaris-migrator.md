---
title: Polaris Migrator
navTitle: Migrator
description: Codemod transformations to help upgrade your Polaris codebase.
icon: ReplaceMajor
order: 3
---

# {frontmatter.title}

<Lede>{frontmatter.description}</Lede>

[<img src="https://img.shields.io/npm/v/@shopify/polaris-migrator.svg?labelColor=f9f9f9&color=dcf5f0" alt="npm version" style={{width: "95px"}} />](https://www.npmjs.com/package/@shopify/polaris-migrator)

<picture>
  <source
    srcSet="/images/tools/polaris-migrator/polaris-migrator-demo.png"
    media="(prefers-reduced-motion: reduce)"
  ></source>
  <img
    style={{maxWidth: '100%'}}
    srcSet="/images/tools/polaris-migrator/polaris-migrator-demo.gif"
    alt="Demo of Polaris migrator"
  />
</picture>

## Usage

```sh
npx @shopify/polaris-migrator <migration> <path>
```

- `migration` - name of migration, see available migrations on the docs site below.
- `path` - files or directory to perform migration
- `--dry` Do a dry-run, no code will be edited
- `--print` Prints the changed output for comparison

## Migrations

### v12

If you are upgrading Polaris from v11 to v12 please follow our [migration guide](/version-guides/migrating-from-v11-to-v12).

#### `v12-react-avatar-component`

Replace deprecated `Avatar` component `size` prop values with corresponding replacement values.

```diff
- <Avatar size="extraSmall" />
- <Avatar size="small" />
- <Avatar size="medium" />
- <Avatar size="large" />
- <Avatar size="xl-experimental" />
- <Avatar size="2xl-experimental" />
+ <Avatar size="xs" />
+ <Avatar size="sm" />
+ <Avatar size="md" />
+ <Avatar size="lg" />
+ <Avatar size="xl" />
+ <Avatar size="xl" />
```

<br />

```sh
npx @shopify/polaris-migrator v12-react-avatar-component <path>
```

<br />

#### `v12-react-update-button-component`

Consolidate `Button` boolean props to `variant` and `tone`. The `Button` component has been updated to replace deprecated `connectedDisclosure`, `outline`, `destructive`, `primary`, `primarySuccess`, `plain`, and `monochrome` props with a new `variant` prop that supports multiple variation options.

```diff
- <Button plain />
+ <Button variant="plain" />
- <Button primary />
+ <Button variant="primary" />
- <Button primary plain />
+ <Button variant="tertiary" />
- <Button monochrome plain />
+ <Button variant="monochromePlain" />
- <Button destructive />
+ <Button variant="primary" tone="critical" />
- <Button primarySuccess />
+ <Button variant="primary" tone="success" />
- <Button destructive plain />
+ <Button variant="plain" tone="critical" />
- <Button destructive />
+ <Button variant="primary" tone="critical" />
- <Button primarySuccess />
+ <Button variant="primary" tone="success" />
- <Button destructive outline />
+ <Button tone="critical" />
- <Button destructive plain />
+ <Button variant="plain" tone="critical" />
- <Button monochrome />
+ <Button />
- <Button outline />
+ <Button />
```

<br />

```sh
npx @shopify/polaris-migrator v12-react-update-button-component <path>
```

<br />

#### `v12-styles-replace-custom-property-border`

Replace deprecated border CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- border-radius: var(--p-border-radius-1);
+ border-radius: var(--p-border-radius-100);
```

```diff
- border-width: var(--p-border-width-1);
+ border-width: var(--p-border-width-025);
```

<br />

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-border <path>
```

<br />

#### `v12-styles-replace-custom-property-color`

Replace deprecated color CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- color: var(--p-color-bg);
+ color: var(--p-color-bg-surface);
```

<br />

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-color <path>
```

#### `v12-styles-replace-custom-property-font`

Replace deprecated font CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- font-size: var(--p-font-size-75);
+ font-size: var(--p-font-size-300);
```

```diff
- line-height: var(--p-font-line-height-1);
+ line-height: var(--p-font-line-height-400);
```

<br />

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-font <path>
```

#### `v12-styles-replace-custom-property-shadow`

Replace deprecated shadow CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- box-shadow: var(--p-shadow-xs);
+ box-shadow: var(--p-shadow-100);
```

<br />

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-shadow <path>
```

#### `v12-styles-replace-custom-property-space`

Replace deprecated space CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- padding: var(--p-space-1);
+ padding: var(--p-space-100);
```

<br />

```sh
npx @shopify/polaris-migrator v12-styles-replace-custom-property-space <path>
```

### v11

#### `v11-react-update-page-breadcrumbs`

Replace legacy Page component `breadcrumbs` props with the new `backAction` prop which accepts a [`LinkAction` object](https://github.com/Shopify/polaris/blob/main/polaris-react/src/types.ts#L113-L122).

```diff
- <Page breadcrumbs={[{url: '/testing', content: 'Home'}]}>
+ <Page backAction={{url: '/testing', content: 'Home'}}>
```

<br />

```sh
npx @shopify/polaris-migrator v11-react-update-page-breadcrumbs <path>
```

<br />

#### `v11-styles-replace-custom-property-border`

Replace deprecated border CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- border-radius: var(--p-border-radius-base);
+ border-radius: var(--p-border-radius-1);
```

<br />

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-border <path>
```

<br />

#### `v11-styles-replace-custom-property-color`

Replace deprecated color CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- color: var(--p-text);;
+ color: var(--p-color-text);
```

<br />

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-color <path>
```

<br />

#### `v11-styles-replace-custom-property-depth`

Replace deprecated depth CSS custom properties with corresponding replacement static values.

```diff
- box-shadow: var(--p-shadow-transparent);
+ box-shadow: 0 0 0 0 transparent;
```

<br />

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-depth <path>
```

<br />

#### `v11-styles-replace-custom-property-legacy`

Replace deprecated legacy CSS custom properties with corresponding replacement values (either a different Polaris custom property or a static value).

```diff
- z-index: var(--p-override-loading-z-index);
+ z-index: var(--p-z-index-6);

- width: var(--p-choice-size);
+ width: 20px;
```

<br />

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-legacy <path>
```

<br />

#### `v11-styles-replace-custom-property-motion`

Replace deprecated motion CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- transition-timing-function: var(--p-linear);
+ transition-timing-function: var(--p-motion-linear);
```

<br />

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-motion <path>
```

<br />

#### `v11-styles-replace-custom-property-zindex`

Replace deprecated z-index CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- z-index: var(--p-z-1);
+ z-index: var(--p-z-index-1);
```

<br />

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-zindex <path>
```

<br />

### v10

#### `v10-react-replace-text-components`

Replace legacy text components `DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden` with the new single `Text` component.

```diff
- <DisplayText size="medium">Display text</DisplayText>
- <Heading>Heading</Heading>
+ <Text variant="headingXl" as="p">Display text</Text>
+ <Text variant="headingMd" as="h2">Heading</Text>
```

<br />

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components <path>
```

<br />

### v9

For projects that use the [`@use` rule](https://sass-lang.com/documentation/at-rules/use), all Sass related migrations (ex: `replace-sass-spacing`) accept a `namespace` flag to target a specific `<namespace>.<variable|function|mixin>`.

```sh
npx @shopify/polaris-migrator v9-<scss-migration> <path> --namespace="legacy-polaris-v8"
```

<br />

#### `v9-scss-replace-breakpoints`

Replace legacy static breakpoint mixins with the new Polaris [media query variables](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v9-to-v10.md#media-query-variables).

```diff
- @include page-content-when-layout-not-stacked {}
+ @media #{$p-breakpoints-md-up} {}
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-breakpoints <path>
```

<br />

#### `v9-scss-replace-border`

Replace usage of the legacy SCSS `border()` function in `border` declarations with corresponding Polaris [shape](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v8-to-v9.md#border) token.

```diff
- border: border();
+ border: var(--p-border-base);

- border: border(divider);
+ border: var(--p-border-divider);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-border <path>
```

<br />

#### `v9-scss-replace-border-radius`

Replace usage of the legacy SCSS `border-radius()`) function in `border-radius` declarations with corresponding Polaris [shape](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v8-to-v9.md#border-radius) tokens.

```diff
- border-radius: border-radius();
+ border-radius: var(--p-border-radius-1);

- border-radius: border-radius(large);
+ border-radius: var(--p-border-radius-large);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-border-radius <path>
```

<br />

#### `v9-scss-replace-border-width`

Replace usage of the legacy SCSS `border-width()`) function in `border` and `border-width` declarations with corresponding Polaris [shape](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v8-to-v9.md#border-width) tokens.

```diff
- border-width: border-width();
+ border-width: var(--p-border-width-1);

- border-width: border-width(thick);
+ border-width: var(--p-border-width-2);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-border-width <path>
```

<br />

#### `v9-scss-replace-color`

Replace the legacy SCSS `color()` function with the supported CSS custom property token equivalent (ex: `var(--p-surface)`). This will only replace a limited subset of mapped values. See the [color-maps.ts](https://github.com/Shopify/polaris/blob/main/polaris-migrator/src/migrations/replace-sass-color/color-maps.ts) for a full list of color mappings based on the CSS property.

```diff
- color: color('ink');
- background: color('white');
+ color: var(--p-text);
+ background: var(--p-surface);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-color <path>
```

<br />

#### `v9-scss-replace-duration`

Replace the legacy SCSS `duration()` function with the corresponding Polaris [motion](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v8-to-v9.md#duration) token.

```diff
- transition-duration: legacy-polaris-v8.duration('slow');
+ transition-duration: var(--p-duration-300);

- transition: opacity legacy-polaris-v8.duration('slow') linear;
+ transition: opacity var(--p-duration-300) linear;
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-duration <path>
```

<br />

#### `v9-scss-replace-easing`

Replace the legacy SCSS `easing()` function with the corresponding Polaris [motion](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v8-to-v9.md#easing) token.

```diff
- transition-timing-function: legacy-polaris-v8.easing('in');
+ transition-timing-function: var(--p-ease-in);

- transition: opacity 300ms legacy-polaris-v8.easing('in');
+ transition: opacity 300ms var(--p-ease-in);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-easing <path>
```

<br />

#### `v9-scss-replace-font-family`

Replace legacy SCSS `font-family()` function with the corresponding Polaris [font](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v8-to-v9.md#font-family) token.

```diff
- font-family: font-family(monospace);
+ font-family: var(--p-font-family-mono);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-font-family <path>
```

<br />

#### `v9-scss-replace-font-size`

Replace legacy SCSS `font-size()` function with the corresponding Polaris [font](https://github.com/Shopify/polaris/blob/472e2f65ba4cbee05b458c135acc02b204a3d480/src/tokens/token-groups/font-size.json) token.

```diff
- font-size: font-size(input, base);
+ font-size: var(--p-font-size-200);;
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-font-size <path>
```

<br />

#### `v9-scss-replace-line-height`

Replace legacy SCSS `line-height()` function with the corresponding Polaris [font](https://github.com/Shopify/polaris/blob/175aa5200c686477174f80916529e3043a720af4/src/tokens/token-groups/line-height.json) token.

```diff
- line-height: line-height(caption, base);
+ font-family: var(--p-font-line-height-2);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-line-height <path>
```

<br />

#### `v9-scss-replace-spacing`

Replace the legacy SCSS `spacing()` function with the supported CSS custom property token equivalent (ex: `var(--p-space-4)`).

```diff
- padding: spacing();
- margin: spacing(loose) spacing(tight);
+ padding: var(--p-space-4);
+ margin: var(--p-space-5) var(--p-space-2);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-spacing <path>
```

<br />

#### `v9-scss-replace-text-emphasis`

Replace legacy static mixins with their corresponding declarations and CSS custom properties.

```diff
- @include text-emphasis-normal;
+ color: var(--p-text);
+ font-weight: var(--p-font-weight-regular);
```

<br />

```sh
npx @shopify/polaris-migrator v9-scss-replace-text-emphasis <path>
```

<br />

#### `v9-scss-replace-z-index`

Replace the legacy SCSS `z-index()` function with the supported CSS custom property token equivalent (ex: `var(--p-z-1)`).

Any invocations of `z-index()` that correspond to a z-index design-token i.e. `--p-z-1` will be replaced with a css variable declaration.
This includes invocations to the `$fixed-element-stacking-order` sass map i.e. `z-index(modal, $fixed-element-stacking-order)`.

```diff
- .decl-1 {
-   z-index: z-index(content);
- }
- .decl-2 {
-   z-index: z-index(modal, $fixed-element-stacking-order)
- }
+ decl-1 {
+   z-index: var(--p-z-1);
+ }
+ .decl-2 {
+   z-index: var(--p-z-11)
+ }
```

Invocations of `z-index` within an arithmetic expression will be appended with a comment for review and manual migration.
Generally in these instances you'll want to wrap the suggested code change in a `calc` however this may defer on a case by case basis in your codebase.

```diff
.decl-3 {
+  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
+  /* z-index: var(--p-z-1) + 1 */
  z-index: z-index(content) + 1
}
```

Invocations of `z-index` with a custom sass map property, will also be appended with a comment for review and manual migration.

```diff
.decl-3 {
+  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
+  /* z-index: map.get($custom-sass-map, modal) */
  z-index: z-index(modal, $custom-sass-map)
}
```

In these cases you may also want to run `npx sass-migrator module <path> --migrate-deps --load-path <load-path>` to ensure that
`map.get` is in scope\*\*.

Be aware that this may also create additional code changes in your codebase, we recommend running this only if there are large number of instances of migrations from `z-index` to `map.get`. Otherwise it may be easier to add `use 'sass:map'` to the top of your `.scss` file manually.

```sh
npx @shopify/polaris-migrator v9-scss-replace-z-index <path>
```

<br />

#### `v9-styles-tokenize-font`

Replace legacy static font values with Polaris custom properties for `font-size`, `font-weight`, and `line-height` declarations.

```diff
- font-size: 16px;
+ font-size: var(--p-font-size-200);

- font-weight: 400;
+ font-weight: var(--p-font-weight-regular);

- line-height: 20px;
+ font-family: var(--p-font-line-height-2);
```

<br />

```sh
npx @shopify/polaris-migrator v9-styles-tokenize-font <path>
```

<br />

#### `v9-styles-tokenize-motion`

Replace timings (`ms`, `s`) in transition declarations (`transition`, `transition-duration`, `transition-delay`, and `transition-timing-function`) and animation declarations (`animation`, `animation-duration`, `animation-delay`, and `animation-timing-function`) with the corresponding Polaris [motion](https://github.com/Shopify/polaris/blob/e11f52f04bea123219d7b5c96cda181de6471bb8/src/tokens/token-groups/motion.json) token.

```diff
- transition-duration: 100ms;
+ transition-duration: var(--p-duration-100);

- transition-timing-function: linear;
+ transition-timing-function: var(--p-linear);

- transition: opacity 100ms linear;
+ transition: opacity var(--p-duration-100) linear;

- transition: opacity 100ms linear, left 100ms linear;
+ transition: opacity var(--p-duration-100) linear, left var(--p-duration-100) linear;

- animation-duration: 100ms;
+ animation-duration: var(--p-duration-100);

- animation-timing-function: linear;
+ animation-timing-function: var(--p-linear);

- animation: 100ms linear fadeIn;
+ animation: var(--p-duration-100) linear fadeIn;

- animation: 100ms linear slideIn, 100ms linear slideIn;
+ animation: var(--p-duration-100) linear slideIn, var(--p-duration-100) linear slideIn;
```

<br />

```sh
npx @shopify/polaris-migrator v9-styles-tokenize-motion <path>
```

<br />

#### `v9-styles-tokenize-shape`

Replace usage of the legacy SCSS `rem()` function and hard-coded lengths (`px`, `rem`) in `border`, `border-width`, and `border-radius` declarations with corresponding Polaris [shape](https://github.com/Shopify/polaris/blob/e11f52f04bea123219d7b5c96cda181de6471bb8/src/tokens/token-groups/shape.json) token.

```diff
- border: 1px solid transparent;
+ border: var(--p-border-width-1) solid transparent;

- border-width: 0.0625rem;
+ border-width: var(--p-border-width-1);

- border-radius: 4px;
+ border-radius: var(--p-border-radius-1);
```

<br />

```sh
npx @shopify/polaris-migrator v9-replace-border-declarations <path>
```

<br />

#### `v9-styles-tokenize-space`

Replace lengths and functions (`px`, `rem` and `rem()`) in spacing declarations (`padding`, `margin`, and `gap`) with the corresponding Polaris spacing token.

```diff
- padding: 16px;
+ padding: var(--p-space-4);

- margin: 1rem;
+ margin: var(--p-space-4);

- gap: rem(16px);
+ gap: var(--p-space-4);
```

<br />

```sh
npx @shopify/polaris-migrator v9-styles-tokenize-space <path>
```

<br />

#### `v9-styles-replace-custom-property-border`

Replace deprecated border CSS custom properties with corresponding replacement values (either a different Polaris custom property or a static value).

```diff
- border-radius: var(--p-border-radius-base);
+ border-radius: var(--p-border-radius-1);

- border-radius: var(--p-text-field-focus-ring-border-radius);
+ border-radius: 7px;
```

<br />

```sh
npx @shopify/polaris-migrator v9-styles-replace-custom-property-border <path>
```

<br />

#### `v9-styles-replace-custom-property-depth`

Replace deprecated depth CSS custom properties with corresponding replacement values (either a different Polaris custom property or a static value).

```diff
- box-shadow: var(--p-button-drop-shadow);
+ box-shadow: var(--p-shadow-button);

- box-shadow: 1px 1px var(--p-shadow-from-ambient-light);
+ box-shadow: 1px 1px rgba(23, 24, 24, 0.05);
```

<br />

```sh
npx @shopify/polaris-migrator v9-styles-replace-custom-property-depth <path>
```

<br />

#### `v9-styles-replace-custom-property-font`

Replace deprecated font CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- font-weight: var(--p-badge-font-weight);
+ font-weight: var(--p-font-weight-regular);
```

<br />

```sh
npx @shopify/polaris-migrator v9-styles-replace-custom-property-font <path>
```

<br />

#### `v9-styles-replace-custom-property-motion`

Replace deprecated motion CSS custom properties with corresponding Polaris custom property replacement values.

```diff
- transition: transform var(--p-duration-1-0-0) var(--p-ease);
+ transition: transform var(--p-duration-100) var(--p-ease);
```

<br />

```sh
npx @shopify/polaris-migrator v9-styles-replace-custom-property-motion <path>
```

<br />

#### `v9-styles-replace-custom-property-legacy`

Replace deprecated legacy CSS custom properties with corresponding replacement values (either a different Polaris custom property or a static value).

```diff
- width: var(--p-icon-size);
+ width: var(--p-icon-size-small);

- display: var(--p-override-none);
+ display: none;
```

<br />

```sh
npx @shopify/polaris-migrator v9-styles-replace-custom-property-legacy <path>
```

<br />

### Generic migrations

#### `styles-replace-custom-property`

A generic codemod to replace CSS custom properties with mapped values (either a different Polaris custom property or a static value).

```diff
- color: var(--p-text);
+ color: var(--p-color-text);

- animation-duration: var(--p-fast);
+ animation-duration: 100ms;
```

This migration can be run in two ways:

1. Using a combination of `--decl`, `--from`, and `--to` flags to replace a single custom property, or
2. Using a `--maps` flag which points to a file defining replacements for multiple custom properties

**Option 1:**

```sh
npx @shopify/polaris-migrator styles-replace-custom-property \
  --decl="<name>" --from="<prop>" --to="<prop>" <path>
```

**Option 2:**

```sh
npx @shopify/polaris-migrator styles-replace-custom-property \
  --maps="<replacement-maps>" <path>
```

Example `replacement-maps.js` (with option 2):

```js
export default {
  color: {
    '--p-text': '--p-color-text',
  },
  '/^animation/': {
    '--p-fast': '100ms',
  },
};
```

<br />

#### `styles-insert-stylelint-disable`

Insert stylelint disable comments for [stylelint-polaris](../stylelint-polaris/) >= v5 so that
existing failures are not blocking a codebase from initializing the linter.

```diff
+ // stylelint-disable-next-line -- generated by polaris-migrator DO NOT COPY
padding: 1rem;
```

<br />

```sh
npx @shopify/polaris-migrator styles-insert-stylelint-disable <path>
```

<br />

#### `react-rename-component`

A generic codemod to rename any component and its prop type.

```diff
- <MyComponent prop />
+ <MyRenamedComponent prop />
- export interface MyComponentPropType {}
+ export interface MyRenamedComponentPropType {}
```

<br />

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="MyComponent" --renameTo="MyRenamedComponent" --renamePropsFrom="MyComponentPropType" --renamePropsTo="MyRenamedComponentPropType"
```

<br />

#### `react-rename-component-prop`

A generic codemod to rename any component prop.

```diff
- <MyComponent prop="value" />
- <MyComponent prop />
+ <MyComponent newProp="value" />
+ <MyComponent newProp />
```

<br />

```sh
npx @shopify/polaris-migrator react-rename-component-prop <path> --componentName="MyComponent" --from="prop" --to="newProp"
```

<br />

#### `scss-remove-unused-at-use`

A generic codemod to remove unused `@use` imports in SCSS files.

```diff
- @use 'global-styles/legacy';

// No usages of the `legacy` namespace. Can be safely removed.
.class {
  color: blue;
}
```

<br />

```sh
npx @shopify/polaris-migrator scss-remove-unused-at-use <path> --url='import/url'
```

<br />

## Creating Migrations

Sometimes referred to as "codemods", migrations are JavaScript functions which modify some code from one form to another (eg; to move between breaking versions of `@shopify/polaris`). ASTs (Abstract Syntax Trees) are used to "walk" through the code in discreet, strongly typed steps, called "nodes". All changes made to nodes (and thus the AST) are then written out as the new/"migrated" version of the code.

`polaris-migrator` supports two types of migrations:

- SCSS Migrations
- Typescript Migrations

### Creating a SCSS migration

Run `yarn new-migration` to generate a new migration from the `scss-migration` template:

```sh
❯ yarn new-migration
$ yarn workspace @shopify/polaris-migrator generate
$ plop
? [PLOP] Please choose a generator. (Use arrow keys)
❯ scss-migration
  typescript-migration
```

Next, provide the name of your migration. For example; `v9-scss-replace-function`:

```sh
? [PLOP] Please choose a generator. sass-migration
? Name of the migration (e.g. scss-replace-function) scss-replace-function
```

The generator will create the following files in the `migrations` folder:

```
migrations
└── v9-scss-replace-function
    ├── v9-scss-replace-function.ts
    └── tests
        ├── v9-scss-replace-function.input.scss
        ├── v9-scss-replace-function.output.scss
        └── v9-scss-replace-function.test.ts
```

#### The SCSS migration function

Each migrator has a default export adhering to the [Stylelint Rule API](https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md). A PostCSS AST is passed as the `root` and can be mutated inline, or emit warning/error reports.

Continuing the example, here is what the migration may look like if our goal is to replace the Sass function `hello()` with `world()`.

```ts
// polaris-migrator/src/migrations/replace-sass-function/replace-sass-function.ts
import {
  isSassFunction,
  StopWalkingFunctionNodes,
  createSassMigrator as v9ReplaceHelloWorld,
} from '../../utilities/sass';
import type {PolarisMigrator} from '../../utilities/sass';

const replaceHelloWorld: PolarisMigrator = (_, {methods}, context) => {
  return (root) => {
    methods.walkDecls(root, (decl) => {
      const parsedValue = valueParser(decl.value);
      parsedValue.walk((node) => {
        if (isSassFunction('hello', node)) {
          if (context.fix) {
            node.value = 'world';
          } else {
            methods.report({
              node: decl,
              severity: 'error',
              message:
                'Method hello() is no longer supported. Please migrate to world().',
            });
          }

          return StopWalkingFunctionNodes;
        }
      });
      if (context.fix) {
        decl.value = parsedValue.toString();
      }
    });
  };
};

export default v9ReplaceHelloWorld('replace-hello-world', replaceHelloWorld);
```

A more complete example can be seen in [`styles-tokenize-space.ts`](https://github.com/Shopify/polaris/blob/main/polaris-migrator/src/migrations/styles-tokenize-space/styles-tokenize-space.ts).

#### Testing

The template will also generate starting test files you can use to test your migration. In your migrations `tests` folder, you can see 3 files:

- `v9-scss-replace-function.test.ts` – Runs the fixtures and sets up additional migration options
- `v9-scss-replace-function.input.scss` – The starting source input
- `v9-scss-replace-function.output.scss` – The expected output after migration

The main test file will load the input/output fixtures to test your migration against. You can configure additional fixtures and test migration options (see the `replace-sass-spacing.test.ts` as an example).

## Running Migrations

Run tests locally from workspace root by filtering to the migrations package:

```sh
npx turbo run test --filter=polaris-migrator -- v9-scss-replace-function
```

### Testing in another codebase

Once you are confident the migration is ready, create a new pull request including your migration and a new [changeset](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#adding-a-changeset).

In your PR, you can add a comment with the text `/snapit` to create a new [snapshot release](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md#snapshot-release). Once created, this snapshot can be used in a separate codebase:

```sh
# example snapshot release
npx @shopify/polaris-migrator@0.0.0-snapshot-release-20220919213536 v9-scss-replace-function "./app/**/*.scss"
```

### Linting and formatting migrations

The migrator doesn't include a default formatter. It is recommended to run your own linter and formatter after running migrations. For example, if you are using [ESLint](https://eslint.org/) and/or [Prettier](https://prettier.io/):

```sh
npx eslint --fix .
npx prettier --write .
```

### Checking migrations

Running a migration can potentially modify thousands of files. For more complex migrations, a comment may be added suggesting the change is manually checked. You can quickly perform a manual search for this comment in your text editor:

```
polaris-migrator: Unable to migrate the following expression. Please upgrade manually.
```

After applying a migration, it might be helpful to commit the changes that do not need a manual check from those that do. You can do this a few different ways, but we suggest staging all your changes, then unstaging those that include the manual check comment:

```sh
# Stash files with "polaris-migrator:" comments
git stash push $(grep -r -l "polaris-migrator:" $(git ls-files -m))

# Stage all files without "polaris-migrator:" comments
git add .

# Bring back the change with "polaris-migrator:" comments
git stash pop

# (optional) if there a files that have both "polaris-migrator:" comments
# _and_ complete fixes, add the complete fixes now
git add -p

# Commit all the complete fixes:
git commit

# Now you're left with changes that have "polaris-migrator:" comments only
```

### Resources

- [The jscodeshift API](https://github.com/facebook/jscodeshift#the-jscodeshift-api)
- [Writing a PostCSS plugin](https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md)
- [CodeshiftCommunity Recipes](https://www.codeshiftcommunity.com/docs/import-manipulation)
- Common utilities:
  - [`jsx.ts`](https://github.com/Shopify/polaris/blob/main/polaris-migrator/src/utilities/jsx.ts)
  - [`imports.ts`](https://github.com/Shopify/polaris/blob/main/polaris-migrator/src/utilities/imports.ts)
    0
