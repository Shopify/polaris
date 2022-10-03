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
+ <Text variant="heading2xl" as="p" />
+ <Text variant="headingLg" as="h2" />
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

### v9

For projects that use the [`@use` rule](https://sass-lang.com/documentation/at-rules/use), all Sass related migrations (ex: `replace-sass-spacing`) accept a `namespace` flag to target a specific `<namespace>.<variable|function|mixin>`.

```sh
npx @shopify/polaris-migrator <sass-migration> <path> --namespace="legacy-polaris-v8"
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

## Creating a migration

### Setup

Run `yarn new-migration` to generate a new migration from a template.

```sh
❯ yarn new-migration
$ yarn workspace @shopify/polaris-migrator generate
$ plop
? [PLOP] Please choose a generator. (Use arrow keys)
❯ sass-migration
  typescript-migration
```

We will use the `sass-migration` and call our migration `replace-sass-function` for this example. Provide the name of your migration:

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

### Writing migration function

A migration is simply a javascript function which serves as the entry-point for your codemod. The `replace-sass-function.ts` file defines a "migration" function. This function is named the same as the provided migration name, `replace-sass-function`, and is the default export of the file.

Some example code has been provided for each template. You can make any migration code adjustments in the migration function. For Sass migrations, a [PostCSS plugin](https://github.com/postcss/postcss/blob/main/docs/writing-a-plugin.md) is used to parse and transform the source code provided by the [jscodeshift](https://github.com/facebook/jscodeshift).

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

This example migration will replace the Sass function `hello()` with `world()`.

### Testing

The template will also generate starting test files you can use to test your migration. In your migrations `tests` folder, you can see 3 files:

- `replace-sass-function.test.ts` – Runs the fixtures and sets up additional migration options
- `replace-sass-function.input.scss` – The starting source input
- `replace-sass-function.output.scss` – The expected output after migration

The main test file will load the input/output fixtures to test your migration against. You can configure additional fixtures and test migration options (see the `replace-sass-spacing.test.ts` as an example).

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
polaris-migrator: This is a complex expression that we can't automatically convert. Please check this manually.
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
