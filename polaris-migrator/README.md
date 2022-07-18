# [Polaris Migrator](https://polaris.shopify.com/docs/advanced-features)

[![npm version](https://img.shields.io/npm/v/@shopify/polaris-migrator.svg?style=flat)](https://www.npmjs.com/package/@shopify/polaris-migrator)

Codemod transformations to help upgrade your Polaris codebase.

## Usage

```sh
npx @shopify/polaris-migrator <transform> <path>
```

- `transform` - name of transform, see available transforms below.
- `path` - files or directory to transform
- `--dry` Do a dry-run, no code will be edited
- `--print` Prints the changed output for comparison

## Documentation

Visit [polaris.shopify.com/docs/advanced-features/migrations](https://polaris.shopify.com/docs/advanced-features/migrations) to view available migrations.

## Development

Start the `dev` npm script to run the build process in watch mode.

```sh
yarn workspace @shopify/polaris-migrator dev
```

Then, use the `start` script to execute the migrator in a separate terminal.

```sh
# Run the CLI script
yarn workspace @shopify/polaris-migrator start template-babel "**/template-babel.input.ts"
```

## Writing a migration

Create a new migration by copying one of the template examples (ex: `template-babel` or `template-sass`). Make the desired migration adjustments to the copied template and update the tests to validate your migration.
