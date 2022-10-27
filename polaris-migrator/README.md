# [Polaris Migrator](https://polaris.shopify.com/docs/advanced-features)

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-migrator.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-migrator)

Codemod transformations to help upgrade your Polaris codebase.

## Usage

```sh
npx @shopify/polaris-migrator <migration> <path>
```

- `migration` - name of migration, see available migrations on the docs site below.
- `path` - files or directory to perform migration
- `--dry` Do a dry-run, no code will be edited
- `--print` Prints the changed output for comparison

## Migrations

### v10

#### `replace-text-component`

Replace legacy text components `DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden` with the new single `Text` component.

```diff
- <DisplayText size="medium">Display text</DisplayText>
- <Heading>Heading</Heading>
+ <Text variant="heading2xl" as="p">Display text</Text>
+ <Text variant="headingLg" as="h2">Heading</Text>
```

```sh
npx @shopify/polaris-migrator replace-text-component <path>
```

#### `rename-component-prop`

A generic codemod to rename any component prop.

```diff
- <MyComponent prop="value" />
- <MyComponent prop />
+ <MyComponent newProp="value" />
+ <MyComponent newProp />
```

```sh
npx @shopify/polaris-migrator rename-component-prop <path> --component=MyComponent --from=prop --to=newProp
```

### `replace-spacing-lengths`

Replace lengths and functions (`px`, `rem` and `rem()`) in spacing declarations (`padding`, `margin`, and `gap`) with the corresponding Polaris spacing token.

```diff
- padding: 16px;
+ padding: var(--p-space-4);

- margin: 1rem;
+ margin: var(--p-space-4);

- gap: rem(16px);
+ gap: var(--p-space-4);
```

```sh
npx @shopify/polaris-migrator replace-spacing-lengths <path>
```

### v9

For projects that use the [`@use` rule](https://sass-lang.com/documentation/at-rules/use), all Sass related migrations (ex: `replace-sass-spacing`) accept a `namespace` flag to target a specific `<namespace>.<variable|function|mixin>`.

```sh
npx @shopify/polaris-migrator <sass-migration> <path> --namespace="legacy-polaris-v8"
```

### `replace-sass-color`

Replace the legacy Sass `color()` function with the supported CSS custom property token equivalent (ex: `var(--p-surface)`). This will only replace a limited subset of mapped values. See the [color-maps.ts](https://github.com/Shopify/polaris/blob/main/polaris-migrator/src/migrations/replace-sass-color/color-maps.ts) for a full list of color mappings based on the CSS property.

```diff
- color: color('ink');
- background: color('white');
+ color: var(--p-text);
+ background: var(--p-surface);
```

```sh
npx @shopify/polaris-migrator replace-sass-color <path>
```

### `replace-sass-spacing`

Replace the legacy Sass `spacing()` function with the supported CSS custom property token equivalent (ex: `var(--p-space-4)`).

```diff
- padding: spacing();
- margin: spacing(loose) spacing(tight);
+ padding: var(--p-space-4);
+ margin: var(--p-space-5) var(--p-space-2);
```

```sh
npx @shopify/polaris-migrator replace-sass-spacing <path>
```

### `replace-static-breakpoint-mixins`

Replace legacy static breakpoint mixins with the new Polaris [media query variables](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v9-to-v10.md#media-query-variables).

```diff
- @include page-content-when-layout-not-stacked {}
+ @media #{$p-breakpoints-md-up} {}
```

```sh
npx @shopify/polaris-migrator replace-static-breakpoint-mixins <path>
```

### `replace-static-mixins-with-declarations`

Replace legacy static mixins with their corresponding declarations and CSS custom properties.

```diff
- @include text-emphasis-normal;
+ color: var(--p-text);
+ font-weight: var(--p-font-weight-regular);
```

```sh
npx @shopify/polaris-migrator replace-static-mixins-with-declarations <path>
```

### `replace-typography-declarations`

Replace legacy Typography functions and hardcoded lengths with Polaris custom properties for `font-family`, `font-size`, `font-weight`, and `line-height` declarations.

```diff
- font-family: font-family(monospace);
+ font-family: var(--p-font-family-mono);

- font-size: font-size(input, base);
+ font-size: var(--p-font-size-200);

- font-weight: 400;
+ font-weight: var(--p-font-weight-regular);

- line-height: line-height(caption, base);
+ font-family: var(--p-font-line-height-2);
```

```sh
npx @shopify/polaris-migrator replace-typography-declarations <path>
```

### `replace-border-declarations`

Replace lengths (`px`, `rem`) and legacy Sass functions (`rem()`,`border()`, `border-width()`, `border-radius()`) in border declarations (`border`, `border-width`, and `border-radius`) with the corresponding Polaris [shape](https://polaris.shopify.com/tokens/shape) token.

```diff
- border: 1px solid transparent;
+ border: var(--p-border-width-1) solid transparent;

- border: border();
+ border: var(--p-border-base);

- border-width: 0.0625rem;
+ border-width: var(--p-border-width-1);

- border-width: border-width(thick);
+ border-width: var(--p-border-width-2);

- border-radius: 4px;
+ border-radius: var(--p-border-radius-1);

- border-radius: border-radius(large);
+ border-radius: var(--p-border-radius-large);
```

```sh
npx @shopify/polaris-migrator replace-border-declarations <path>
```

### `replace-sass-z-index`

Replace the legacy Sass `z-index()` function with the supported CSS custom property token equivalent (ex: `var(--p-z-1)`).

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
npx @shopify/polaris-migrator replace-sass-spacing <path>
```

## Creating Migrations

Sometimes referred to as "codemods", migrations are JavaScript functions which modify some code from one form to another (eg; to move between breaking versions of `@shopify/polaris`). ASTs (Abstract Syntax Trees) are used to "walk" through the code in discreet, strongly typed steps, called "nodes". All changes made to nodes (and thus the AST) are then written out as the new/"migrated" version of the code.

`polaris-migrator` supports two types of migrations:

- SASS Migrations
- Typescript Migrations

### Creating a SASS migration

Run `yarn new-migration` to generate a new migration from the `sass-migration` template:

```sh
❯ yarn new-migration
$ yarn workspace @shopify/polaris-migrator generate
$ plop
? [PLOP] Please choose a generator. (Use arrow keys)
❯ sass-migration
  typescript-migration
```

Next, provide the name of your migration. For example; `replace-sass-function`:

```sh
? [PLOP] Please choose a generator. sass-migration
? Name of the migration (e.g. replace-sass-layout) replace-sass-function
```

The generator will create the following files in the `migrations` folder:

```
migrations
└── replace-sass-function
    ├── replace-sass-function.ts
    └── tests
        ├── replace-sass-function.input.scss
        ├── replace-sass-function.output.scss
        └── replace-sass-function.test.ts
```

#### The SASS migration function

Each migrator has a default export adhering to the [PostCSS Plugin API](https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md) with one main difference: events are only executed once.

Continuing the example, here is what the migration may look like if our goal is to replace the Sass function `hello()` with `world()`.

```ts
// polaris-migrator/src/migrations/replace-sass-function/replace-sass-function.ts

import type {FileInfo} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

const plugin = (): Plugin => ({
  postcssPlugin: 'replace-sass-function',
  Declaration(decl) {
    // const prop = decl.prop;
    const parsedValue = valueParser(decl.value);

    parsedValue.walk((node) => {
      if (!(node.type === 'function' && node.value === 'hello')) return;

      node.value = 'world';
    });

    decl.value = parsedValue.toString();
  },
});

export default function replaceSassFunction(fileInfo: FileInfo) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
```

A more complete example can be seen in [`replace-spacing-lengths.ts`](https://github.com/Shopify/polaris/blob/main/polaris-migrator/src/migrations/replace-spacing-lengths/replace-spacing-lengths.ts).

#### Testing

The template will also generate starting test files you can use to test your migration. In your migrations `tests` folder, you can see 3 files:

- `replace-sass-function.test.ts` – Runs the fixtures and sets up additional migration options
- `replace-sass-function.input.scss` – The starting source input
- `replace-sass-function.output.scss` – The expected output after migration

The main test file will load the input/output fixtures to test your migration against. You can configure additional fixtures and test migration options (see the `replace-sass-spacing.test.ts` as an example).

## Running Migrations

Run tests locally from workspace root by filtering to the migrations package:

```sh
npx turbo run test --filter=polaris-migrator -- replace-sass-function
```

### Testing in another codebase

Once you are confident the migration is ready, create a new pull request including your migration and a new [changeset](https://github.com/Shopify/polaris/blob/main/.github/CONTRIBUTING.md#adding-a-changeset).

In your PR, you can add a comment with the text `/snapit` to create a new [snapshot release](https://github.com/Shopify/polaris/blob/main/documentation/Releasing.md#snapshot-release). Once created, this snapshot can be used in a separate codebase:

```sh
# example snapshot release
npx @shopify/polaris-migrator@0.0.0-snapshot-release-20220919213536 replace-sass-function "./app/**/*.scss"
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
# Stage all modified files
git add .

# Unstage those that contain the manual check comment prefixed with "polaris-migrator:"
git reset $(grep -r -l "polaris-migrator:")
```

### Resources

- [The jscodeshift API](https://github.com/facebook/jscodeshift#the-jscodeshift-api)
- [Writing a PostCSS plugin](https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md)
- [CodeshiftCommunity Recipes](https://www.codeshiftcommunity.com/docs/import-manipulation)
- Common utilities:
  - [`jsx.ts`](https://github.com/Shopify/polaris/blob/main/polaris-migrator/src/utilities/jsx.ts)
  - [`imports.ts`](https://github.com/Shopify/polaris/blob/main/polaris-migrator/src/utilities/imports.ts)
    0
