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

You can also install the script and test the package globally on your local machine.

```sh
cd polaris-migrator
npm i -g
```

Once that is done, the package can now run using `polaris-migrator`.

```sh
# Usage
polaris-migrator <migration> <path>

# Example
polaris-migrator template-babel "./src/**/template-babel.input.ts" --dry --print --force
```

## Writing a migration

Create a new migration by copying one of the template examples (ex: `template-babel` or `template-sass`). Make the desired migration adjustments to the copied template and update the tests to validate your migration.
