---
title: Migrations
description: Polaris provides Codemod migrations to help upgrade your codebase when a feature is deprecated.
keywords:
  - codemod
  - migration
  - migrator
  - upgrade
  - updated
  - version
  - components
  - transform
---

Polaris provides Codemod migrations to help upgrade your codebase.

Codemods are transformations that run on your codebase programmatically. This allows for a large amount of changes to be applied without having to manually go through every file.

## Usage

`npx @shopify/polaris-migrator <migration> <path>`

- `migration` - name of migration, see available migrations below.
- `path` - files or directory to perform migration (supports globs)
- `--dry` Do a dry-run, no code will be edited
- `--print` Prints the changed output for comparison
- `--force` Ignores the safety check for a clean git status

## Polaris v10

### `replace-text-component`

Replaces legacy text components `DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, `VisuallyHidden` with the new `Text` component. This migration will include the proper styling props to match the replaced component.

For example:

```jsx
import {DisplayText, TextStyle} from '@shopify/react';

export default function App() {
  return (
    <>
      <DisplayText size="medium">
        Get started with finances on Shopify
      </DisplayText>
      <p>
        <TextStyle variation="subdued">
          Start getting the most from your store’s finances by completing these
          tasks.
        </TextStyle>
      </p>
    </>
  );
}
```

Transforms to:

```jsx
import {Text} from '@shopify/react';

export default function App() {
  return (
    <>
      <Text variation="heading2xl" as="p">
        Get started with finances on Shopify
      </Text>
      <p>
        <Text variant="bodyMd" as="span" color="subdued">
          Start getting the most from your store’s finances by completing these
          tasks.
        </Text>
      </p>
    </>
  );
}
```
