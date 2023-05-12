# Migrating from v10 to v11

Polaris v11.0.0 ([full release notes](https://github.com/Shopify/polaris/releases/tag/v11.0.0)) features changes to supported versions for dependencies, removal of components, renamed components, and token changes.

## Table of Contents

- [Node support](#node-support)
- [React support](#react-support)
- [Webpack support](#webpack-support)
- [TypeScript](#typescript)
- [Components](#components)
  - [Removed `Collapsible` deprecated `preventMeasuringOnChildrenUpdate` prop](#removed-collapsible-deprecated-preventmeasuringonchildrenupdate-prop)
  - [Removed `Page` deprecated `breadcrumbs` prop](#removed-page-deprecated-breadcrumbs-prop)
  - [Removed `Breadcrumbs` deprecated `breadcrumbs` prop](#removed-breadcrumbs-deprecated-breadcrumbs-prop)
  - [Removed `KonamiCode`](#removed-konamicode)
  - [Removed `DisplayText`](#removed-displaytext)
  - [Removed `Heading`](#removed-heading)
  - [Removed `Subheading`](#removed-subheading)
  - [Removed `Caption`](#removed-caption)
  - [Removed `TextStyle`](#removed-textstyle)
  - [Removed `VisuallyHidden`](#removed-visuallyhidden)
  - [Migrated `Stack` to `LegacyStack`](#migrated-stack-to-legacystack)
  - [Migrated `Card` to `LegacyCard`](#migrated-card-to-legacycard)
  - [Migrated `Filters` to `LegacyFilters`](#migrated-filters-to-legacyfilters)
  - [Migrated `Tabs` to `LegacyTabs`](#migrated-tabs-to-legacytabs)
  - [Renamed `Inline`](#renamed-inline)
  - [Renamed `AlphaStack`](#renamed-alphastack)
  - [Renamed `AlphaCard`](#renamed-alphacard)
  - [Renamed `AlphaFilters`](#renamed-alphafilters)
  - [Renamed `AlphaTabs`](#renamed-alphatabs)
  - [Recommended component migration workflow](#recommended-component-migration-workflow)
- [Tokens](#tokens)
  - [Border](#border)
  - [Color](#color)
  - [Depth](#depth)
  - [Motion](#motion)
  - [Legacy](#legacy)
  - [Z-index](#z-index)
  - [Recommended token migration workflow](#recommended-token-migration-workflow)

## Node support

NodeJS version 14 is no longer supported. NodeJS 18 is recommended and 16 is the minimum supported version.

## React support

React version 16 and 17 is no longer supported. React 18 is the minimum supported version.

## Webpack support

Webpack version 4 is no longer supported. Webpack 5 is the minimum supported version.

## TypeScript

Built types in `@shopify/polaris` have moved from `build/ts/latest` to `build/ts`.

### Legacy TypeScript Support

Polaris no longer supports multiple versions of TypeScript with `downlevel-dts`. Polaris only builds one set of types based on the current version of TypeScript in the project.

## Components

The following components have either been renamed, migrated, or removed. Please review each component section to determine whether you can resolve these breaking changes with a migration or if they need to be updated manually.

### Removed `Collapsible` deprecated `preventMeasuringOnChildrenUpdate` prop

The deprecated `preventMeasuringOnChildrenUpdate` prop has been removed from the `Collapsible` component and is no longer supported.

### Removed `Page` deprecated `breadcrumbs` prop

The deprecated `breadcrumbs` prop has been removed from the `Page` component and is no longer supported. The new `backAction` prop serves the same functionality and accepts a [`LinkAction` object](https://github.com/Shopify/polaris/blob/main/polaris-react/src/types.ts#L113-L122).

#### Migration

To replace the `breadcrumbs` prop with `backAction`, you can run the [v11-react-update-page-breadcrumbs](https://polaris.shopify.com/tools/polaris-migrator#v11-react-update-page-breadcrumbs) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <Page breadcrumbs={[{url: '/testing', content: 'Home'}]}>
+ <Page backAction={{url: '/testing', content: 'Home'}}>
```

```sh
npx @shopify/polaris-migrator v11-react-update-page-breadcrumbs <path>
```

#### Post-migration validation

After migrating you can use the following RegExp to check for any additional instances of `<Page breadcrumbs="..." />` across all file types:

```
<Page[^>\w](?:[^>]|\n)*?breadcrumbs
```

### Removed `Breadcrumbs` deprecated `breadcrumbs` prop

The deprecated `breadcrumbs` prop has been removed from the `Breadcrumbs` component and is no longer supported. The new `backAction` prop serves the same functionality and accepts a [`LinkAction` object](https://github.com/Shopify/polaris/blob/main/polaris-react/src/types.ts#L119-L128).

#### Migration

To replace the `breadcrumbs` prop with `backAction`, you can run the generic [react-rename-component-prop](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <Breadcrumbs breadcrumbs={[{url: '/testing', content: 'Home'}]}>
+ <Breadcrumbs backAction={{url: '/testing', content: 'Home'}}>
```

```sh
npx @shopify/polaris-migrator react-rename-component-prop --componentName="Breadcrumbs" --from="breadcrumbs" --to="backAction" <path>
```

#### Post-migration validation

After migrating you can use the following RegExp to check for any additional instances of `<Breadcrumbs breadcrumbs="..." />` across all file types:

```
<Breadcrumbs[^>\w](?:[^>]|\n)*?breadcrumbs
```

### Removed `KonamiCode`

Low usage components are being removed from Polaris. We love fun but we also want to ensure we are shipping exactly what our users need. If you want to use this in your project, feel free to copy the [component sourcecode](https://github.com/Shopify/polaris/blob/%40shopify/polaris%4010.24.0/polaris-react/src/components/KonamiCode/KonamiCode.tsx).

### Removed `DisplayText`

The `DisplayText` component has been removed in favor of the `Text` component. The `Text` component simplifies designing with typography tokens and improves our foundation for flexibility and composability, all in one component.

#### Migration

To replace the six removed typography components (`DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden`), you can run the [v10-react-replace-text-component](https://polaris.shopify.com/tools/polaris-migrator#v10-react-replace-text-components) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components <path>
```

> **Note**: To migrate only the `DisplayText` component, the migration can be supplemented with the `--componentName='DisplayText'` flag.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components --componentName='DisplayText' <path>
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `DisplayText` across all file types:

```
<DisplayText
```

```
Polaris-DisplayText
```

#### Replacement maps

These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

##### Small

```diff
- <DisplayText size="small">Sales this year</DisplayText>
+ <Text as="p" variant="headingLg">Sales this year</Text>
```

##### Medium

```diff
- <DisplayText size="medium">Sales this year</DisplayText>
+ <Text as="p" variant="headingXl">Sales this year</Text>
```

##### Large

```diff
- <DisplayText size="large">Sales this year</DisplayText>
+ <Text as="p" variant="heading2xl">Sales this year</Text>
```

##### Extra large

```diff
- <DisplayText size="extraLarge">Sales this year</DisplayText>
+ <Text as="p" variant="heading4xl">Sales this year</Text>
```

### Removed `Heading`

The `Heading` component has been removed in favor of the `Text` component. The `Text` component simplifies designing with typography tokens and improves our foundation for flexibility and composability, all in one component.

#### Migration

To replace the six removed typography components (`DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden`), you can run the [v10-react-replace-text-components](https://polaris.shopify.com/tools/polaris-migrator#v10-react-replace-text-components) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components <path>
```

> **Note**: To migrate only the `Heading` component, the migration can be supplemented with the `--componentName='Heading'` flag.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components --componentName='Heading' <path>
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `Heading` across all file types:

```
<Heading
```

```
Polaris-Heading
```

#### Replacement maps

These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

```diff
- <Heading>Online store dashboard</Heading>
+ <Text as="h2" variant="headingMd">Online store dashboard</Text>
```

### Removed `Subheading`

The `Subheading` component has been removed in favor of the `Text` component. The `Text` component simplifies designing with typography tokens and improves our foundation for flexibility and composability, all in one component.

#### Migration

To replace the six removed typography components (`DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden`), you can run the [v10-react-replace-text-components](https://polaris.shopify.com/tools/polaris-migrator#v10-react-replace-text-components) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components <path>
```

> **Note**: To migrate only the `Subheading` component, the migration can be supplemented with the `--componentName='Subheading'` flag.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components --componentName='Subheading' <path>
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `Subheading` across all file types:

```
<Subheading
```

```
Polaris-Subheading
```

#### Replacement maps

These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

```diff
- <Subheading>Accounts</Subheading>
+ <Text as="h3" variant="headingXs">Accounts</Text>
```

### Removed `Caption`

The `Caption` component has been removed in favor of the `Text` component. The `Text` component simplifies designing with typography tokens and improves our foundation for flexibility and composability, all in one component.

#### Migration

To replace the six removed typography components (`DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden`), you can run the [v10-react-replace-text-components](https://polaris.shopify.com/tools/polaris-migrator#v10-react-replace-text-components) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components <path>
```

> **Note**: To migrate only the `Caption` component, the migration can be supplemented with the `--componentName='Caption'` flag.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components --componentName='Caption' <path>
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `Caption` across all file types:

```
<Caption
```

```
Polaris-Caption
```

#### Replacement maps

These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

```diff
- <Caption>Received April 21, 2017</Caption>
+ <Text as="p" variant="bodySm">Received April 21, 2017</Text>
```

### Removed `TextStyle`

The `TextStyle` component has been removed in favor of the `Text` component. The `Text` component simplifies designing with typography tokens and improves our foundation for flexibility and composability, all in one component.

#### Migration

To replace the six removed typography components (`DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden`), you can run the [v10-react-replace-text-components](https://polaris.shopify.com/tools/polaris-migrator#v10-react-replace-text-components) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components <path>
```

> **Note**: To migrate only the `TextStyle` component, the migration can be supplemented with the `--componentName='TextStyle'` flag.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components --componentName='TextStyle' <path>
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `TextStyle` across all file types:

```
<TextStyle
```

```
Polaris-TextStyle
```

#### Replacement maps

These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

##### Subdued

```diff
- <TextStyle variation="subdued">No supplier listed</TextStyle>
+ <Text as="span" color="subdued">No supplier listed</Text>
```

##### Strong

```diff
- <TextStyle variation="strong">No supplier listed</TextStyle>
+ <Text as="span" fontWeight="semibold">No supplier listed</Text>
```

##### Positive

```diff
- <TextStyle variation="positive">No supplier listed</TextStyle>
+ <Text as="span" color="success">No supplier listed</Text>
```

##### Negative

```diff
- <TextStyle variation="negative">No supplier listed</TextStyle>
+ <Text as="span" color="critical">No supplier listed</Text>
```

##### Warning

```diff
- <TextStyle variation="warning">No supplier listed</TextStyle>
+ <Text as="span" color="warning">No supplier listed</Text>
```

##### Code

```diff
- <TextStyle variation="code">No supplier listed</TextStyle>
+ <Text as="span"><InlineCode>No supplier listed</InlineCode></Text>
```

### Removed `VisuallyHidden`

The `VisuallyHidden` component has been removed in favor of the `Text` component. The `Text` component simplifies designing with typography tokens and improves our foundation for flexibility and composability, all in one component.

#### Migration

To replace the six removed typography components (`DisplayText`, `Heading`, `Subheading`, `Caption`, `TextStyle`, and `VisuallyHidden`), you can run the [v10-react-replace-text-components](https://polaris.shopify.com/tools/polaris-migrator#v10-react-replace-text-components) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components <path>
```

> **Note**: To migrate only the `VisuallyHidden` component, the migration can be supplemented with the `--componentName='VisuallyHidden'` flag.

```sh
npx @shopify/polaris-migrator v10-react-replace-text-components --componentName='VisuallyHidden' <path>
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `VisuallyHidden` across all file types:

```
<VisuallyHidden
```

```
Polaris-VisuallyHidden
```

#### Replacement maps

These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

```diff
- <VisuallyHidden>
-   <Heading>Title and description</Heading>
- </VisuallyHidden>
+ <Text as="h2" variant="headingMd" visuallyHidden>Title and description</Text>
```

### Migrated `Stack` to `LegacyStack`

The `Stack` component was built prior to layout components such as `Box`, `HorizontalStack`, and `VerticalStack`. The layout components define the structure and spacing of user interfaces in a fast and composable way for consistent layouts across pages of an application. These components can be used to quickly create flexible pages and features without worrying about the underlying structure or CSS code.

#### Migration

The `LegacyStack` component is a duplicate of the existing `Stack` component. To replace `Stack` with `LegacyStack`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <Stack prop />
+ <LegacyStack prop />
- export interface StackProps {}
+ export interface LegacyStackProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="Stack" --renameTo="LegacyStack" --renamePropsFrom="StackProps" --renamePropsTo="LegacyStackProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `Stack` across all file types:

```
<Stack
```

```
Polaris-Stack
```

### Migrated `Card` to `LegacyCard`

The `Card` component was built prior to layout components such as `Box`. The layout components define the structure and spacing of user interfaces in a fast and composable way for consistent layouts across pages of an application. These components can be used to quickly create flexible pages and features without worrying about the underlying structure or CSS code, so we have created a new `Card` component using the layout primitives.

#### Migration

The `LegacyCard` component is a duplicate of the existing `Card` component. To replace `Card` with `LegacyCard`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <Card prop />
+ <LegacyCard prop />
- export interface CardProps {}
+ export interface LegacyCardProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="Card" --renameTo="LegacyCard" --renamePropsFrom="CardProps" --renamePropsTo="LegacyCardProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `Card` across all file types:

```
<Card
```

```
Polaris-Card
```

### Migrated `Filters` to `LegacyFilters`

The `Filters` component has been updated with a new UI.

#### Migration

The `LegacyFilters` component is a duplicate of the existing `Filters` component. To replace `Filters` with `LegacyFilters`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <Filters prop />
+ <LegacyFilters prop />
- export interface FiltersProps {}
+ export interface LegacyFiltersProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="Filters" --renameTo="LegacyFilters" --renamePropsFrom="FiltersProps" --renamePropsTo="LegacyFiltersProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `Filters` across all file types:

```
<Filters
```

```
Polaris-Filters
```

### Migrated `Tabs` to `LegacyTabs`

The `Tabs` component has been updated with a new UI.

#### Migration

The `LegacyTabs` component is a duplicate of the existing `Tabs` component. To replace `Tabs` with `LegacyTabs`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <Tabs prop />
+ <LegacyTabs prop />
- export interface TabsProps {}
+ export interface LegacyTabsProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="Tabs" --renameTo="LegacyTabs" --renamePropsFrom="TabsProps" --renamePropsTo="LegacyTabsProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `Tabs` across all file types:

```
<Tabs
```

```
Polaris-Tabs
```

### Renamed `Inline`

The `Inline` component has been renamed to `HorizontalStack`.

#### Migration

To rename `Inline` to `HorizontalStack`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <Inline prop />
+ <HorizontalStack prop />
- export interface InlineProps {}
+ export interface HorizontalStackProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="Inline" --renameTo="HorizontalStack" --renamePropsFrom="InlineProps" --renamePropsTo="HorizontalStackProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `Inline` across all file types:

```
<Inline
```

```
Polaris-Inline
```

### Renamed `AlphaStack`

The `AlphaStack` component has been renamed to `VerticalStack`.

#### Migration

To rename `AlphaStack` to `VerticalStack`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <AlphaStack prop />
+ <VerticalStack prop />
- export interface AlphaStackProps {}
+ export interface VerticalStackProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="AlphaStack" --renameTo="VerticalStack" --renamePropsFrom="AlphaStackProps" --renamePropsTo="VerticalStackProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `AlphaStack` across all file types:

```
<AlphaStack
```

```
Polaris-AlphaStack
```

### Renamed `AlphaCard`

The `AlphaCard` component has been renamed to `Card`.

#### Migration

⚠️ **Important**: This migration can only be run **after** migrating usage of the existing `Card` component to `LegacyCard`! ⚠️

We are planning on deprecating and removing the existing `Card` component in favor of the new, more flexible `AlphaCard` component. `AlphaCard` has been available since v10.5.0 of `@shopify/polaris`. If there are any existing instances of `Card` in the codebase, migrations to rename `Card` to `LegacyCard` **must be run first** before migrations to rename `AlphaCard` to `Card`. The API for these two components are incompatible and will cause errors unless migrations are run in the correct order.

To rename `AlphaCard` to `Card`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <AlphaCard prop />
+ <Card prop />
- export interface AlphaCardProps {}
+ export interface CardProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="AlphaCard" --renameTo="Card" --renamePropsFrom="AlphaCardProps" --renamePropsTo="CardProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `AlphaCard` across all file types:

```
<AlphaCard
```

```
Polaris-AlphaCard
```

### Renamed `AlphaFilters`

The `AlphaFilters` component has been renamed to `Filters`.

#### Migration

⚠️ **Important**: This migration can only be run **after** migrating usage of the existing `Filters` component to `LegacyFilters`! ⚠️

We are planning on deprecating and removing the existing `Filters` component in favor of the new `AlphaFilters` component with updated designs. `AlphaFilters` has been available since v10.39.0 of `@shopify/polaris`. If there are any existing instances of `Filters` in the codebase, migrations to rename `Filters` to `LegacyFilters` **must be run first** before migrations to rename `AlphaFilters` to `Filters`. The API for these two components are incompatible and will cause errors unless migrations are run in the correct order.

To rename `AlphaFilters` to `Filters`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <AlphaFilters prop />
+ <Filters prop />
- export interface AlphaFiltersProps {}
+ export interface FiltersProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="AlphaFilters" --renameTo="Filters" --renamePropsFrom="AlphaFiltersProps" --renamePropsTo="FiltersProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `AlphaFilters` across all file types:

```
<AlphaFilters
```

```
Polaris-AlphaFilters
```

### Renamed `AlphaTabs`

The `AlphaTabs` component has been renamed to `Tabs`.

#### Migration

⚠️ **Important**: This migration can only be run **after** migrating usage of the existing `Tabs` component to `LegacyTabs`! ⚠️

We are planning on deprecating and removing the existing `Tabs` component in favor of the new `AlphaTabs` component with updated designs. `AlphaTabs` has been available since v10.39.0 of `@shopify/polaris`. If there are any existing instances of `Tabs` in the codebase, migrations to rename `Tabs` to `LegacyTabs` **must be run first** before migrations to rename `AlphaTabs` to `Tabs`. The API for these two components are incompatible and will cause errors unless migrations are run in the correct order.

To rename `AlphaTabs` to `Tabs`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- <AlphaTabs prop />
+ <Tabs prop />
- export interface AlphaTabsProps {}
+ export interface TabsProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renameFrom="AlphaTabs" --renameTo="Tabs" --renamePropsFrom="AlphaTabsProps" --renamePropsTo="TabsProps"
```

> Note: If the `AlphaTabProp` type is being used in the codebase, it requires an additional migration **after** `AlphaTabs` has been migrated and renamed to `Tabs`.

To rename `AlphaTabProps` to `TabProps`, you can run the generic [react-rename-component](https://polaris.shopify.com/tools/polaris-migrator#generic-migrations) migration. Please reference the [recommended component migration workflow](#recommended-component-migration-workflow) section below for additional migration support.

```diff
- export interface AlphaTabProps {}
+ export interface TabProps {}
```

```sh
npx @shopify/polaris-migrator react-rename-component <path> --renamePropsFrom="AlphaTabProps" --renamePropsTo="TabProps"
```

#### Post-migration validation

After migrating use the following to check for any additional instances of `AlphaTab` across all file types:

```
<AlphaTab
```

```
Polaris-AlphaTab
```

### Recommended component migration workflow

When running component migrations we suggest the following workflow:

- Handle automated migrations
  ```sh
  # Example migration
  npx @shopify/polaris-migrator ...
  # Stash files with "polaris-migrator:" comments
  git stash push $(grep -r -l "polaris-migrator:" $(git ls-files -m))
  # Stage all migrated files without "polaris-migrator:" comments
  git add .
  # Format staged files only
  git diff --staged --name-only | xargs npx prettier --write
  # Commit automated migrations
  git commit -m "Migrate X to Y"
  ```
- Handle manual migrations
  ```sh
  # Bring back the files with "polaris-migrator:" comments
  git stash pop
  ```
  - Search for "polaris-migrator:" comments and handle manual migrations
  - Search for Polaris class overrides and handle manual migrations (e.g. `Polaris-Card`)
    <br>
    <br>
  ```sh
  # Stage all manually migrated files
  git add .
  # Format staged files only
  git diff --staged --name-only | xargs npx prettier --write
  # Commit manual migrations
  git commit -m "Manually migrate X to Y"
  ```

## Tokens

The following tokens have either been renamed or removed. You will need to replace any instances of them with their new name or value equivalents. Please review each token section for migrations that can be run to resolve these breaking changes.

### Border

#### Migration

To replace these deprecated `shape` custom properties, you can run the [v11-styles-replace-custom-property-border](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-border) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- border: var(--p-border-divider);
+ border: var(--p-border-width-1) solid var(--p-color-border-subdued);
```

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-border <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `shape` custom properties across all file types:

```
--p-border-radius-base|--p-border-radius-large|--p-border-radius-half|--p-border-base|--p-border-dark|--p-border-transparent|--p-border-divider|--p-border-divider-on-dark
```

```
<Divider[^>\w](?:[^>]|\n)*?border
```

#### Replacement maps

| Deprecated Token             | Replacement Value                                             |
| ---------------------------- | ------------------------------------------------------------- |
| `--p-border-radius-base`     | `--p-border-radius-1`                                         |
| `--p-border-radius-large`    | `--p-border-radius-2`                                         |
| `--p-border-radius-half`     | `--p-border-radius-full`                                      |
| `--p-border-base`            | `var(--p-border-width-1) solid var(--p-color-border-subdued)` |
| `--p-border-dark`            | `var(--p-border-width-1) solid var(--p-color-border)`         |
| `--p-border-transparent`     | `var(--p-border-width-1) solid transparent`                   |
| `--p-border-divider`         | `var(--p-border-width-1) solid var(--p-color-border-subdued)` |
| `--p-border-divider-on-dark` | `var(--p-border-width-1) solid var(--p-color-border-inverse)` |

### Color

#### Migration

To replace these deprecated `colors` custom properties, you can run the [v11-styles-replace-custom-property-color](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-color) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- color: var(--p-text);
+ color: var(--p-color-text);
```

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-color <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `colors` custom properties across all file types:

```
--p-text-warning|--p-text-success|--p-text-subdued-on-dark|--p-text-subdued(?!-light|-neutral-light)|--p-text-primary-pressed|--p-text-primary-hovered|--p-text-primary|--p-text-on-primary|--p-text-on-interactive|--p-text-on-dark|--p-text-on-critical|--p-text-highlight|--p-text-disabled|--p-text-critical|--p-text(?!-field-spinner|-light|-subdued-light)|--p-surface-warning-subdued-pressed|--p-surface-warning-subdued-hovered|--p-surface-warning-subdued|--p-surface-warning|--p-surface-success-subdued-pressed|--p-surface-success-subdued-hovered|--p-surface-success-subdued|--p-surface-success|--p-surface-subdued|--p-surface-selected-pressed|--p-surface-selected-hovered|--p-surface-selected|--p-surface-search-field-dark|--p-surface-search-field|--p-surface-primary-selected-pressed|--p-surface-primary-selected-hovered|--p-surface-primary-selected|--p-surface-pressed-dark|--p-surface-pressed|--p-surface-neutral-subdued-dark|--p-surface-neutral-subdued|--p-surface-neutral-pressed|--p-surface-neutral-hovered|--p-surface-neutral-disabled|--p-surface-neutral(?!-light)|--p-surface-hovered-dark|--p-surface-hovered(?!-light)|--p-surface-highlight-subdued-pressed|--p-surface-highlight-subdued-hovered|--p-surface-highlight-subdued|--p-surface-highlight|--p-surface-disabled|--p-surface-depressed|--p-surface-dark|--p-surface-critical-subdued-pressed|--p-surface-critical-subdued-hovered|--p-surface-critical-subdued-depressed|--p-surface-critical-subdued|--p-surface-critical|--p-surface-attention|--p-surface(?!-hover|-interactive|-primary|-light|-neutral-light)|--p-shadow-color-picker-dragger|--p-shadow-color-picker|--p-overlay|--p-interactive-pressed-on-dark|--p-interactive-pressed|--p-interactive-on-dark|--p-interactive-hovered|--p-interactive-disabled|--p-interactive-critical-pressed|--p-interactive-critical-hovered|--p-interactive-critical-disabled|--p-interactive-critical|--p-interactive|--p-icon-warning|--p-icon-success|--p-icon-subdued|--p-icon-pressed|--p-icon-on-primary|--p-icon-on-interactive|--p-icon-on-dark|--p-icon-on-critical|--p-icon-hovered|--p-icon-highlight(?!--light)|--p-icon-disabled|--p-icon-critical|--p-icon-attention|--p-icon(?!-pinned|-hover|-light|-highlight--light)|--p-hint-from-direct-light|--p-focused|--p-divider-dark|--p-divider|--p-decorative-two-text|--p-decorative-two-surface|--p-decorative-two-icon|--p-decorative-three-text|--p-decorative-three-surface|--p-decorative-three-icon|--p-decorative-one-text|--p-decorative-one-surface|--p-decorative-one-icon|--p-decorative-four-text|--p-decorative-four-surface|--p-decorative-four-icon|--p-decorative-five-text|--p-decorative-five-surface|--p-decorative-five-icon|--p-border-warning-subdued|--p-border-warning|--p-border-success-subdued|--p-border-success|--p-border-subdued|--p-border-shadow-subdued|--p-border-shadow|--p-border-on-dark|--p-border-neutral-subdued|--p-border-hovered|--p-border-highlight-subdued|--p-border-highlight|--p-border-disabled|--p-border-depressed|--p-border-critical-subdued|--p-border-critical-disabled|--p-border-critical|--p-border(?!-width|-radius|-base|-dark|-transparent|-divider|-divider-on-dark)|--p-background-selected|--p-background-pressed|--p-background-hovered|--p-background|--p-backdrop|--p-action-secondary-pressed-dark|--p-action-secondary-pressed|--p-action-secondary-hovered-dark|--p-action-secondary-hovered|--p-action-secondary-disabled|--p-action-secondary-depressed|--p-action-secondary|--p-action-primary-pressed|--p-action-primary-hovered|--p-action-primary-disabled|--p-action-primary-depressed|--p-action-primary|--p-action-critical-pressed|--p-action-critical-hovered|--p-action-critical-disabled|--p-action-critical-depressed|--p-action-critical
```

```
<AlphaCard[^>\w](?:[^>]|\n)*?background(?!="bg)
```

```
<Box[^>\w](?:[^>]|\n)*?background(?!="bg)
```

```
<Box[^>\w](?:[^>]|\n)*?color(?!="text)
```

```
<Box[^>\w](?:[^>]|\n)*?borderColor(?!="border)
```

```
<Box[^>\w](?:[^>]|\n)*?outlineColor(?!="border)
```

```
<Divider[^>\w](?:[^>]|\n)*?borderColor(?!="border)
```

#### Replacement maps

| Deprecated Token                         | Replacement Value                                                                                                                                                                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--p-text-warning`                       | `--p-color-text-caution`                                                                                                                                                                                                                                                   |
| `--p-text-success`                       | `--p-color-text-success`                                                                                                                                                                                                                                                   |
| `--p-text-subdued-on-dark`               | `--p-color-text-inverse-subdued`                                                                                                                                                                                                                                           |
| `--p-text-subdued`                       | `--p-color-text-subdued`                                                                                                                                                                                                                                                   |
| `--p-text-primary-pressed`               | `--p-color-text-primary`                                                                                                                                                                                                                                                   |
| `--p-text-primary-hovered`               | `--p-color-text-primary-hover`                                                                                                                                                                                                                                             |
| `--p-text-primary`                       | `--p-color-text-primary`                                                                                                                                                                                                                                                   |
| `--p-text-on-primary`                    | `--p-color-text-on-color`                                                                                                                                                                                                                                                  |
| `--p-text-on-interactive`                | `--p-color-text-on-color`                                                                                                                                                                                                                                                  |
| `--p-text-on-dark`                       | `--p-color-text-inverse`                                                                                                                                                                                                                                                   |
| `--p-text-on-critical`                   | `--p-color-text-on-color`                                                                                                                                                                                                                                                  |
| `--p-text-highlight`                     | `--p-color-text-info`                                                                                                                                                                                                                                                      |
| `--p-text-disabled`                      | `--p-color-text-disabled`                                                                                                                                                                                                                                                  |
| `--p-text-critical`                      | `--p-color-text-critical`                                                                                                                                                                                                                                                  |
| `--p-text`                               | `--p-color-text`                                                                                                                                                                                                                                                           |
| `--p-surface-warning-subdued-pressed`    | `--p-color-bg-caution-subdued-active`                                                                                                                                                                                                                                      |
| `--p-surface-warning-subdued-hovered`    | `--p-color-bg-caution-subdued-hover`                                                                                                                                                                                                                                       |
| `--p-surface-warning-subdued`            | `--p-color-bg-caution-subdued`                                                                                                                                                                                                                                             |
| `--p-surface-warning`                    | `--p-color-bg-warning`                                                                                                                                                                                                                                                     |
| `--p-surface-success-subdued-pressed`    | `--p-color-bg-success-subdued-active`                                                                                                                                                                                                                                      |
| `--p-surface-success-subdued-hovered`    | `--p-color-bg-success-subdued-hover`                                                                                                                                                                                                                                       |
| `--p-surface-success-subdued `           | `--p-color-bg-success-subdued`                                                                                                                                                                                                                                             |
| `--p-surface-success`                    | `--p-color-bg-success`                                                                                                                                                                                                                                                     |
| `--p-surface-subdued`                    | `--p-color-bg-subdued`                                                                                                                                                                                                                                                     |
| `--p-surface-selected-pressed`           | `--p-color-bg-interactive-subdued-active`                                                                                                                                                                                                                                  |
| `--p-surface-selected-hovered`           | `--p-color-bg-interactive-subdued-hover`                                                                                                                                                                                                                                   |
| `--p-surface-selected`                   | `--p-color-bg-interactive-selected`                                                                                                                                                                                                                                        |
| `--p-surface-search-field-dark`          | `--p-color-bg-inverse`                                                                                                                                                                                                                                                     |
| `--p-surface-search-field`               | `--p-color-bg-inset`                                                                                                                                                                                                                                                       |
| `--p-surface-primary-selected-pressed`   | `--p-color-bg-primary-subdued-active`                                                                                                                                                                                                                                      |
| `--p-surface-primary-selected-hovered`   | `--p-color-bg-primary-subdued-hover`                                                                                                                                                                                                                                       |
| `--p-surface-primary-selected`           | `--p-color-bg-primary-subdued-selected`                                                                                                                                                                                                                                    |
| `--p-surface-pressed-dark`               | `--p-color-bg-inverse-active`                                                                                                                                                                                                                                              |
| `--p-surface-pressed`                    | `--p-color-bg-active`                                                                                                                                                                                                                                                      |
| `--p-surface-neutral-subdued-dark`       | `--p-color-bg-inverse`                                                                                                                                                                                                                                                     |
| `--p-surface-neutral-subdued`            | `--p-color-bg-subdued`                                                                                                                                                                                                                                                     |
| `--p-surface-neutral-pressed`            | `--p-color-bg-strong-active`                                                                                                                                                                                                                                               |
| `--p-surface-neutral-hovered`            | `--p-color-bg-strong-hover`                                                                                                                                                                                                                                                |
| `--p-surface-neutral-disabled`           | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-surface-neutral`                    | `--p-color-bg-strong`                                                                                                                                                                                                                                                      |
| `--p-surface-hovered-dark`               | `--p-color-bg-inverse-hover`                                                                                                                                                                                                                                               |
| `--p-surface-hovered`                    | `--p-color-bg-hover`                                                                                                                                                                                                                                                       |
| `--p-surface-highlight-subdued-pressed`  | `--p-color-bg-info-subdued-active`                                                                                                                                                                                                                                         |
| `--p-surface-highlight-subdued-hovered`  | `--p-color-bg-info-subdued-hover`                                                                                                                                                                                                                                          |
| `--p-surface-highlight-subdued`          | `--p-color-bg-info-subdued`                                                                                                                                                                                                                                                |
| `--p-surface-highlight`                  | `--p-color-bg-info`                                                                                                                                                                                                                                                        |
| `--p-surface-disabled`                   | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-surface-depressed`                  | `--p-color-bg-inset`                                                                                                                                                                                                                                                       |
| `--p-surface-dark`                       | `--p-color-bg-inverse`                                                                                                                                                                                                                                                     |
| `--p-surface-critical-subdued-pressed`   | `--p-color-bg-critical-subdued-active`                                                                                                                                                                                                                                     |
| `--p-surface-critical-subdued-hovered`   | `--p-color-bg-critical-subdued-hover`                                                                                                                                                                                                                                      |
| `--p-surface-critical-subdued-depressed` | `--p-color-bg-critical`                                                                                                                                                                                                                                                    |
| `--p-surface-critical-subdued`           | `--p-color-bg-critical-subdued`                                                                                                                                                                                                                                            |
| `--p-surface-critical`                   | `--p-color-bg-critical`                                                                                                                                                                                                                                                    |
| `--p-surface-attention`                  | `--p-color-bg-caution`                                                                                                                                                                                                                                                     |
| `--p-surface`                            | `--p-color-bg`                                                                                                                                                                                                                                                             |
| `--p-shadow-color-picker-dragger`        | `rgba(33, 43, 54, 0.32)`                                                                                                                                                                                                                                                   |
| `--p-shadow-color-picker`                | `rgba(0, 0, 0, 0.5)`                                                                                                                                                                                                                                                       |
| `--p-overlay`                            | `rgba(255, 255, 255, 0.5)`                                                                                                                                                                                                                                                 |
| `--p-interactive-pressed-on-dark`        | `--p-color-text-interactive-inverse`                                                                                                                                                                                                                                       |
| `--p-interactive-pressed`                | For `color` properties: `--p-color-text-interactive-active`<br> For `background` properties: `--p-color-bg-interactive-active` <br> For `border` properties: `--p-color-border-interactive-active` <br> For `fill` properties: `--p-color-icon-interactive-active`         |
| `--p-interactive-on-dark`                | `--p-color-text-interactive-inverse`                                                                                                                                                                                                                                       |
| `--p-interactive-hovered`                | For `color` properties: `--p-color-text-interactive-hover`<br> For `background` properties: `--p-color-bg-interactive-hover` <br> For `border` properties: `--p-color-border-interactive-hover` <br> For `fill` properties: `--p-color-icon-interactive-hover`             |
| `--p-interactive-disabled`               | For `color` properties: `--p-color-text-interactive-disabled`<br> For `background` properties: `--p-color-bg-interactive-disabled` <br> For `border` properties: `--p-color-border-interactive-disabled` <br> For `fill` properties: `--p-color-icon-interactive-disabled` |
| `--p-interactive-critical-pressed`       | `--p-color-text-critical-active`                                                                                                                                                                                                                                           |
| `--p-interactive-critical-hovered`       | `--p-color-bg-critical-strong-hover`                                                                                                                                                                                                                                       |
| `--p-interactive-critical-disabled`      | `--p-color-text-disabled`                                                                                                                                                                                                                                                  |
| `--p-interactive-critical`               | For `color` properties: `--p-color-text-critical`<br> For `background` properties: `--p-color-bg-critical` <br> For `border` properties: `--p-color-border-critical` <br> For `fill` properties: `--p-color-icon-critical`                                                 |
| `--p-interactive`                        | For `color` properties: `--p-color-text-interactive`<br> For `background` properties: `--p-color-bg-interactive` <br> For `border` properties: `--p-color-border-interactive` <br> For `fill` properties: `--p-color-icon-interactive`                                     |
| `--p-icon-warning`                       | `--p-color-icon-caution`                                                                                                                                                                                                                                                   |
| `--p-icon-success`                       | `--p-color-icon-success`                                                                                                                                                                                                                                                   |
| `--p-icon-subdued`                       | `--p-color-icon-subdued`                                                                                                                                                                                                                                                   |
| `--p-icon-pressed`                       | `--p-color-icon-active`                                                                                                                                                                                                                                                    |
| `--p-icon-on-primary`                    | `--p-color-icon-on-color`                                                                                                                                                                                                                                                  |
| `--p-icon-on-interactive`                | `--p-color-icon-on-color`                                                                                                                                                                                                                                                  |
| `--p-icon-on-dark`                       | `--p-color-icon-inverse`                                                                                                                                                                                                                                                   |
| `--p-icon-on-critical`                   | `--p-color-icon-on-color`                                                                                                                                                                                                                                                  |
| `--p-icon-hovered`                       | `--p-color-icon-hover`                                                                                                                                                                                                                                                     |
| `--p-icon-highlight`                     | `--p-color-icon-info`                                                                                                                                                                                                                                                      |
| `--p-icon-disabled`                      | `--p-color-icon-disabled`                                                                                                                                                                                                                                                  |
| `--p-icon-critical`                      | `--p-color-icon-critical`                                                                                                                                                                                                                                                  |
| `--p-icon-attention`                     | `--p-color-icon-caution`                                                                                                                                                                                                                                                   |
| `--p-icon`                               | `--p-color-icon`                                                                                                                                                                                                                                                           |
| `--p-hint-from-direct-light`             | `rgba(0, 0, 0, 0.15)`                                                                                                                                                                                                                                                      |
| `--p-focused`                            | `--p-color-border-interactive-focus`                                                                                                                                                                                                                                       |
| `--p-divider-dark`                       | `--p-color-border-inverse`                                                                                                                                                                                                                                                 |
| `--p-divider`                            | `--p-color-border-subdued`                                                                                                                                                                                                                                                 |
| `--p-decorative-two-text`                | `rgba(73, 11, 28, 1)`                                                                                                                                                                                                                                                      |
| `--p-decorative-two-surface`             | `rgba(255, 196, 176, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-two-icon`                | `rgba(175, 41, 78, 1)`                                                                                                                                                                                                                                                     |
| `--p-decorative-three-text`              | `rgba(0, 47, 25, 1)`                                                                                                                                                                                                                                                       |
| `--p-decorative-three-surface`           | `rgba(146, 230, 181, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-three-icon`              | `rgba(0, 109, 65, 1)`                                                                                                                                                                                                                                                      |
| `--p-decorative-one-text`                | `rgba(61, 40, 0, 1)`                                                                                                                                                                                                                                                       |
| `--p-decorative-one-surface`             | `rgba(255, 201, 107, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-one-icon`                | `rgba(126, 87, 0, 1)`                                                                                                                                                                                                                                                      |
| `--p-decorative-four-text`               | `rgba(0, 45, 45, 1)`                                                                                                                                                                                                                                                       |
| `--p-decorative-four-surface`            | `rgba(145, 224, 214, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-four-icon`               | `rgba(0, 106, 104, 1)`                                                                                                                                                                                                                                                     |
| `--p-decorative-five-text`               | `rgba(79, 14, 31, 1)`                                                                                                                                                                                                                                                      |
| `--p-decorative-five-surface`            | `rgba(253, 201, 208, 1)`                                                                                                                                                                                                                                                   |
| `--p-decorative-five-icon`               | `rgba(174, 43, 76, 1)`                                                                                                                                                                                                                                                     |
| `--p-border-warning-subdued`             | `--p-color-border-caution-subdued`                                                                                                                                                                                                                                         |
| `--p-border-warning`                     | `--p-color-border-caution`                                                                                                                                                                                                                                                 |
| `--p-border-success-subdued`             | `--p-color-border-success-subdued`                                                                                                                                                                                                                                         |
| `--p-border-success`                     | `--p-color-border-success`                                                                                                                                                                                                                                                 |
| `--p-border-subdued`                     | `--p-color-border-subdued`                                                                                                                                                                                                                                                 |
| `--p-border-shadow-subdued`              | `--p-color-border-input`                                                                                                                                                                                                                                                   |
| `--p-border-shadow`                      | `--p-color-border-input`                                                                                                                                                                                                                                                   |
| `--p-border-on-dark`                     | `--p-color-border-inverse`                                                                                                                                                                                                                                                 |
| `--p-border-neutral-subdued`             | `--p-color-border-strong`                                                                                                                                                                                                                                                  |
| `--p-border-hovered`                     | `--p-color-border-hover`                                                                                                                                                                                                                                                   |
| `--p-border-highlight-subdued`           | `--p-color-border-info-subdued`                                                                                                                                                                                                                                            |
| `--p-border-highlight`                   | `--p-color-border-info`                                                                                                                                                                                                                                                    |
| `--p-border-disabled`                    | `--p-color-border-disabled`                                                                                                                                                                                                                                                |
| `--p-border-depressed`                   | `--p-color-border-inverse`                                                                                                                                                                                                                                                 |
| `--p-border-critical-subdued`            | `--p-color-border-critical-subdued`                                                                                                                                                                                                                                        |
| `--p-border-critical-disabled`           | `--p-color-border-disabled`                                                                                                                                                                                                                                                |
| `--p-border-critical`                    | `--p-color-border-critical`                                                                                                                                                                                                                                                |
| `--p-border`                             | `--p-color-border`                                                                                                                                                                                                                                                         |
| `--p-background-selected`                | `--p-color-bg-app-selected`                                                                                                                                                                                                                                                |
| `--p-background-pressed`                 | `--p-color-bg-app-active`                                                                                                                                                                                                                                                  |
| `--p-background-hovered`                 | `--p-color-bg-app-hover`                                                                                                                                                                                                                                                   |
| `--p-background`                         | `--p-color-bg-app`                                                                                                                                                                                                                                                         |
| `--p-backdrop`                           | `rgba(0, 0, 0, 0.5)`                                                                                                                                                                                                                                                       |
| `--p-action-secondary-pressed-dark`      | `--p-color-bg-inverse-active`                                                                                                                                                                                                                                              |
| `--p-action-secondary-pressed`           | `--p-color-bg-subdued-active`                                                                                                                                                                                                                                              |
| `--p-action-secondary-hovered-dark`      | `--p-color-bg-inverse-hover`                                                                                                                                                                                                                                               |
| `--p-action-secondary-hovered`           | `--p-color-bg-subdued-hover`                                                                                                                                                                                                                                               |
| `--p-action-secondary-disabled`          | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-action-secondary-depressed`         | `--p-color-bg-inset-strong`                                                                                                                                                                                                                                                |
| `--p-action-secondary`                   | `--p-color-bg-subdued`                                                                                                                                                                                                                                                     |
| `--p-action-primary-pressed`             | `--p-color-bg-primary-active`                                                                                                                                                                                                                                              |
| `--p-action-primary-hovered`             | `--p-color-bg-primary-hover`                                                                                                                                                                                                                                               |
| `--p-action-primary-disabled`            | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-action-primary-depressed`           | `--p-color-bg-primary-active`                                                                                                                                                                                                                                              |
| `--p-action-primary`                     | For `color` properties: `--p-color-text-primary`<br> For `background` properties: `--p-color-bg-primary` <br> For `border` properties: `--p-color-border-primary` <br> For `fill` properties: `--p-color-icon-primary`                                                     |
| `--p-action-critical-pressed`            | `--p-color-bg-critical-strong-active`                                                                                                                                                                                                                                      |
| `--p-action-critical-hovered`            | `--p-color-bg-critical-strong-hover`                                                                                                                                                                                                                                       |
| `--p-action-critical-disabled`           | `--p-color-bg-disabled`                                                                                                                                                                                                                                                    |
| `--p-action-critical-depressed`          | `--p-color-bg-critical-strong-active`                                                                                                                                                                                                                                      |
| `--p-action-critical`                    | `--p-color-bg-critical-strong`                                                                                                                                                                                                                                             |

### Legacy

#### Migration

To replace these deprecated `legacy` custom properties, you can run the [v11-styles-replace-custom-property-legacy](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-legacy) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- z-index: var(--p-override-loading-z-index);
+ z-index: var(--p-z-index-6);

- width: var(--p-choice-size);
+ width: 20px;
```

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-legacy <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `legacy` custom properties across all file types:

```
--p-banner-border-critical|--p-banner-border-default|--p-banner-border-highlight|--p-banner-border-success|--p-banner-border-warning|--p-button-group-item-spacing|--p-choice-margin|--p-choice-size|--p-control-border-width|--p-frame-offset|--p-icon-size-medium|--p-icon-size-small|--p-override-loading-z-index|--p-range-slider-thumb-size-active|--p-range-slider-thumb-size-base|--p-text-field-focus-ring-offset|--p-text-field-spinner-offset|--p-thin-border-subdued
```

#### Replacement maps

| Deprecated Token                     | Replacement Value                                                                                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--p-override-loading-z-index`       | `--p-z-index-6`                                                                                                                                       |
| `--p-choice-size`                    | `20px` / `1.25rem`                                                                                                                                    |
| `--p-icon-size-small`                | `8px` / `0.5rem`                                                                                                                                      |
| `--p-icon-size-medium`               | `20px` / `1.25rem`                                                                                                                                    |
| `--p-choice-margin`                  | `--p-space-025`                                                                                                                                       |
| `--p-control-border-width`           | `--p-border-width-2`                                                                                                                                  |
| `--p-banner-border-default`          | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-strong), inset 0 0 0 (--p-border-width-1) var(--p-color-border-strong)`                     |
| `--p-banner-border-success`          | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-success-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-success-subdued)`   |
| `--p-banner-border-highlight`        | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-info-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-info-subdued)`         |
| `--p-banner-border-warning`          | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-caution-subdued), inset 0 0 0 (--p-border-width-1)var(--p-color-border-caution-subdued)`    |
| `--p-banner-border-critical`         | `inset 0 var(--p-border-width-1) 0 0 var(--p-color-border-critical-subdued), inset 0 0 0 (--p-border-width-1) var(--p-color-border-critical-subdued)` |
| `--p-thin-border-subdued`            | `var(--p-border-width-1) solid var(--p-color-border-subdued)`                                                                                         |
| `--p-text-field-spinner-offset`      | `2px` / `0.125rem`                                                                                                                                    |
| `--p-text-field-focus-ring-offset`   | `-4px` / `-0.25rem`                                                                                                                                   |
| `--p-button-group-item-spacing`      | `calc(-1 * var(--p-space-025))`                                                                                                                       |
| `--p-range-slider-thumb-size-base`   | `16px` / `1rem`                                                                                                                                       |
| `--p-range-slider-thumb-size-active` | `24px` / `1.5rem`                                                                                                                                     |
| `--p-frame-offset`                   | `0`                                                                                                                                                   |

### Motion

#### Migration

To replace these deprecated `motion` custom properties, you can run the [v11-styles-replace-custom-property-motion](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-motion) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- transition-timing-function: var(--p-linear);
+ transition-timing-function: var(--p-motion-linear);
```

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-motion <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `motion` custom properties across all file types:

```
--p-duration-0|--p-duration-50|--p-duration-100|--p-duration-150|--p-duration-200|--p-duration-250|--p-duration-300|--p-duration-350|--p-duration-400|--p-duration-450|--p-duration-500|--p-duration-5000|--p-ease|--p-ease-in|--p-ease-out|--p-ease-in-out|--p-linear|--p-keyframes-bounce|--p-keyframes-fade-in|--p-keyframes-pulse|--p-keyframes-spin|--p-keyframes-appear-above|--p-keyframes-appear-below
```

#### Replacement maps

| Deprecated Token             | Replacement Value                   |
| ---------------------------- | ----------------------------------- |
| `--p-linear`                 | `--p-motion-linear`                 |
| `--p-ease-in-out`            | `--p-motion-ease-in-out`            |
| `--p-ease-out`               | `--p-motion-ease-out`               |
| `--p-ease-in`                | `--p-motion-ease-in`                |
| `--p-ease`                   | `--p-motion-ease`                   |
| `--p-duration-0`             | `--p-motion-duration-0`             |
| `--p-duration-50`            | `--p-motion-duration-50`            |
| `--p-duration-100`           | `--p-motion-duration-100`           |
| `--p-duration-150`           | `--p-motion-duration-150`           |
| `--p-duration-200`           | `--p-motion-duration-200`           |
| `--p-duration-250`           | `--p-motion-duration-250`           |
| `--p-duration-300`           | `--p-motion-duration-300`           |
| `--p-duration-350`           | `--p-motion-duration-350`           |
| `--p-duration-400`           | `--p-motion-duration-400`           |
| `--p-duration-450`           | `--p-motion-duration-450`           |
| `--p-duration-500`           | `--p-motion-duration-500`           |
| `--p-duration-5000`          | `--p-motion-duration-5000`          |
| `--p-keyframes-bounce`       | `--p-motion-keyframes-bounce`       |
| `--p-keyframes-fade-in`      | `--p-motion-keyframes-fade-in`      |
| `--p-keyframes-pulse`        | `--p-motion-keyframes-pulse`        |
| `--p-keyframes-spin`         | `--p-motion-keyframes-spin`         |
| `--p-keyframes-appear-above` | `--p-motion-keyframes-appear-above` |
| `--p-keyframes-appear-below` | `--p-motion-keyframes-appear-below` |

### Shadow

#### Migration

To replace these deprecated `depth` custom properties, you can run the [v11-styles-replace-custom-property-depth](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-depth) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- box-shadow: var(--p-shadow-transparent);
+ box-shadow: 0 0 0 0 transparent;
```

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-depth <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `depth` custom properties across all file types:

```
--p-shadow-base|--p-shadow-button|--p-shadow-card|--p-shadow-deep|--p-shadow-faint|--p-shadow-layer|--p-shadow-modal|--p-shadow-popover|--p-shadow-top-bar|--p-shadow-transparent|--p-shadows-inset-button|--p-shadows-inset-button-pressed
```

```
<Box[^>\w](?:[^>]|\n)*?border
```

#### Replacement maps

| Deprecated Token                   | Replacement Value     |
| ---------------------------------- | --------------------- |
| `--p-shadow-transparent`           | `--p-shadow-none`     |
| `--p-shadow-faint`                 | `--p-shadow-sm`       |
| `--p-shadow-base`                  | `--p-shadow-md`       |
| `--p-shadow-deep`                  | `--p-shadow-md`       |
| `--p-shadow-button`                | `--p-shadow-sm`       |
| `--p-shadow-top-bar`               | `--p-shadow-sm`       |
| `--p-shadow-card`                  | `--p-shadow-md`       |
| `--p-shadow-popover`               | `--p-shadow-xl`       |
| `--p-shadow-layer`                 | `--p-shadow-2xl`      |
| `--p-shadow-modal`                 | `--p-shadow-2xl`      |
| `--p-shadows-inset-button`         | `--p-shadow-none`     |
| `--p-shadows-inset-button-pressed` | `--p-shadow-inset-md` |

### Z-index

#### Migration

To replace these deprecated `z-index` custom properties, you can run the [v11-styles-replace-custom-property-zindex](https://polaris.shopify.com/tools/polaris-migrator#v11-styles-replace-custom-property-zindex) migration. Please reference the [recommended token migration workflow](#recommended-token-migration-workflow) section below for additional migration support.

```diff
- z-index: var(--p-z-1);
+ z-index: var(--p-z-index-1);
```

```sh
npx @shopify/polaris-migrator v11-styles-replace-custom-property-zindex <path>
```

#### Post-migration validation

After migrating use the following RegExp to check for any additional instances of `z-index` custom properties across all file types:

```
--p-z-1|--p-z-2|--p-z-3|--p-z-4|--p-z-5|--p-z-6|--p-z-7|--p-z-8|--p-z-9|--p-z-10|--p-z-11|--p-z-12
```

#### Replacement maps

| Deprecated Token | Replacement Value |
| ---------------- | ----------------- |
| `--p-z-1`        | `--p-z-index-1`   |
| `--p-z-2`        | `--p-z-index-2`   |
| `--p-z-3`        | `--p-z-index-3`   |
| `--p-z-4`        | `--p-z-index-4`   |
| `--p-z-5`        | `--p-z-index-5`   |
| `--p-z-6`        | `--p-z-index-6`   |
| `--p-z-7`        | `--p-z-index-7`   |
| `--p-z-8`        | `--p-z-index-8`   |
| `--p-z-9`        | `--p-z-index-9`   |
| `--p-z-10`       | `--p-z-index-10`  |
| `--p-z-11`       | `--p-z-index-11`  |
| `--p-z-12`       | `--p-z-index-12`  |

### Recommended token migration workflow

When running token migrations we suggest the following workflow:

- Handle automated migrations
  ```sh
  # Example migration
  npx @shopify/polaris-migrator ...
  # Stage all migrated files
  git add .
  # Format staged files only
  git diff --staged --name-only | xargs npx prettier --write
  # Commit automated migrations
  git commit -m "Migrate X custom properties from Polaris v10 to v11"
  ```
- Handle manual migrations
  - Search for token RegExps and handle manual migrations
    <br>

```sh
# Stage all manually migrated files
git add .
# Format staged files only
git diff --staged --name-only | xargs npx prettier --write
# Commit manual migrations
git commit -m "Manually migrate X custom properties from Polaris v10 to v11"
```

- Optionally if you use `stylelint-polaris`, you can check for errors after all custom property migrations are finished
  ```sh
  npx stylelint <path>
  ```
