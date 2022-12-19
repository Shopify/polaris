# Migrating typography

Polaris v10.11.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/@shopify/polaris@10.11.0)) features the deprecation of six typography components in favor of a single new `Text` component.

## Table of Contents

- [Text](#text)
- [Mapping deprecated typography components to Text](#mapping-deprecated-typography-components-to-text)
  - [DisplayText](#displaytext)
    - [Small](#small)
    - [Medium](#medium)
    - [Large](#large)
    - [Exra large](#extra-large)
  - [Heading](#heading)
  - [Subheading](#subheading)
  - [Caption](#caption)
  - [TextStyle](#textstyle)
    - [Strong](#strong)
    - [Subdued](#subdued)
    - [Positive](#positive)
    - [Negative](#negative)
    - [Warning](#warning)
    - [Code](#code)
  - [VisuallyHidden](#visuallyhidden)
- [Migrating to the Text component](#migrating-to-the-text-component)
  - [Migrating another codebase with a snapshot](#migrating-another-codebase-with-a-snapshot)
  - [Linting and formatting migrations](#linting-and-formatting-migrations)
  - [Checking migrations](#checking-migrations)

## Text

The new Text component consolidates the functionality provided by six existing typography components (`DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden`) into one single component. Having a single text component helps to simplify code and reduce the amount of nested components to achieve a combination of styles. The design opinions for the Text component can be found in the style guide [here](https://polaris.shopify.com/design/typography). Details about the props and available values can be found on the component page [here](https://polaris.shopify.com/components/text).

## Mapping deprecated typography components to Text

### DisplayText

#### Small

```diff
- <DisplayText size="small">Sales this year</DisplayText>
+ <Text variant="headingLg" as="p">Sales this year</Text>
```

#### Medium

`DisplayText` has a default value of `medium` for the `size` prop.

```diff
- <DisplayText size="medium">Sales this year</DisplayText>
- <DisplayText>Sales this year</DisplayText>
+ <Text variant="headingXl" as="p">Sales this year</Text>
```

#### Large

```diff
- <DisplayText size="large">Sales this year</DisplayText>
+ <Text variant="heading2xl" as="p">Sales this year</Text>
```

#### Extra large

```diff
- <DisplayText size="extraLarge">Sales this year</DisplayText>
+ <Text variant="heading4xl" as="p">Sales this year</Text>
```

### Heading

```diff
- <Heading>Online store dashboard</Heading>
+ <Text variant="headingMd" as="h2">Online store dashboard</Text>
```

### Subheading

```diff
- <Subheading>Accounts</Subheading>
+ <Text variant="headingXs" as="h3">Accounts</Text>
```

### Caption

```diff
- <Caption>Received April 21, 2017</Caption>
+ <Text variant="bodySm" as="p">Received April 21, 2017</Text>
```

### TextStyle

#### Strong

```diff
- <TextStyle variation="strong">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" fontWeight="semibold">No supplier listed</Text>
```

#### Subdued

```diff
- <TextStyle variation="subdued">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="subdued">No supplier listed</Text>
```

#### Positive

```diff
- <TextStyle variation="positive">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="success">No supplier listed</Text>
```

#### Negative

```diff
- <TextStyle variation="negative">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="critical">No supplier listed</Text>
```

#### Warning

```diff
- <TextStyle variation="warning">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="warning">No supplier listed</Text>
```

#### Code

```diff
- <TextStyle variation="code">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span"><InlineCode>No supplier listed</InlineCode></Text>
```

### VisuallyHidden

```diff
- <VisuallyHidden>
-   <Heading>Title and description</Heading>
- </VisuallyHidden>
+ <Text variant="headingMd" as="h2" visuallyHidden >Title and description</Text>
```

## Migrating to the Text component

To run the codemod, run the following command:

```sh
npx @shopify/polaris-migrator react-replace-text-components <path>
```

To target specific file types, such as `.ts` and `.tsx` files, include `.{ts,tsx}` at the end of the path before running the command.

### Migrating another codebase with a snapshot

The team has created a snapshot for running migrations in another codebase: `polaris-migrator@0.0.0-snapshot-release-20221129183721`.

Here is an example of running this command targeting `.ts` and `.tsx` files in another codebase:

```sh
npx @shopify/polaris-migrator@0.0.0-snapshot-release-20221129183721 react-replace-text-components "./app/**/*.{ts,tsx}"
```

### Linting and formatting migrations

The migrator does not include a default formatter. It is recommended to run your own linter and formatter after running migrations. For example, if you are using [ESLint](https://eslint.org/) and/or [Prettier](https://prettier.io/):

```sh
npx eslint --fix .
npx prettier --write .
```

### Checking migrations

Running a migration can potentially modify thousands of files. For more complex migrations, a comment may be added suggesting the change is manually checked. You can quickly perform a manual search for this comment in your text editor:

```
polaris-migrator: Unable to migrate the following expression. Please upgrade manually.
```

After running the codemod, you will need to go through the changes and address any issues or comments that were inserted. These may include things like updating tests or differences in the way the Text component handles styling. It might be helpful to commit the changes that do not need a manual check from those that do. You can do this a few different ways, but we suggest staging all your changes, then unstaging those that include the manual check comment:

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
