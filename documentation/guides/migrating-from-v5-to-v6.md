# Migrating from v5 to v6

Polaris v6.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v6.0.0)) removes deprecated features in past releases. This file describes all code updates required to stay up to date.

## AppProvider theming changes

### New Design Language

In v5 we exposed a feature flag toggle to change between our old and new design languages. In v6 the new design is always enabled by default and our old design language has been removed.

In v6 you no longer need to enable the newDesignLanguage through the features flag in the `AppProvider`.

```diff
<AppProvider
  i18n={{}}
- features={{newDesignLanguage: true}}
>
```

### Removed legacy topbar theming

With the new visual styles the TopBar theming has been replaced with the `ThemeProvider`. If you want to change the `TopBar` appearance you can override the theme or the CSS variables.

```diff
<AppProvider
  i18n={{}}
  theme={{
    colors: {
-     topBar: {
-       color: 'rgb(33,43,54)',
-       backgroundLighter: 'rgb(244, 246, 248)',
-       backgroundDarker: 'rgb(223, 227, 232)',
-       background: 'rgb(255,255,255)',
-     },
+     surface: 'rgb(0, 0, 0)',
+     onSurface: 'rgb(33,43,54)',
    },
  }}
>
```

### Changed `frameOffset` prop to accept a string

This allows relative units for the frame offset. Allowing users to take into account for font-size and matching up breakpoints.

```diff
<AppProvider
  i18n={{}}
  theme={{
-   frameOffset: 60,
+   frameOffset: '60px',
  }}
>
```

## Component API changes

### Icon color prop uses semantic colors

`subdued` has replaced `white`, `skyLighter`, `skyLight`, `sky` and `skyDark`.
`base` has replaced `black`, `inkLightest`, `inkLighter`, `inkLight`, `ink`, `blueLighter`, `blueLight`, `blue`, `blueDark` and `blueDarker`.
`primary` has replaced `indigoLighter`, `indigoLight`, `indigo`, `indigoDark` and `indigoDarker`.
`highlight` has replaced `tealLighter`, `tealLight`, `teal`, `tealDark` `tealDarker` and `purple`.
`success` has replaced `greenLighter`, `green` and `greenDark`.
`warning` has replaced `yellowLighter`, `yellow`, `yellowDark` and `orange` `orangeDark`.
`critical` has replaced `redLighter`, `red` and `redDark`.

```diff
- <Icon color="indigo" source={CirclePlusMinor} />
+ <Icon color="primary" source={CirclePlusMinor} />
```

### Spinner color prop is now removed

In the new design language `Spinner`s are always green. Thus the `color` prop no longer has any effect and has been removed. Remove any usage of this prop.

```diff
- <Spinner color="teal" />
+ <Spinner />
```

### Link is underlined by default

The `Link` component is now underlined by default to make sure that color is not the only way for users to perceive interactivity.

When other factors help a user determine interactivity the underline can be removed with the `removeUnderline` prop.

```diff
- <Link url="https://help.shopify.com/">Orders</Link>
+ <Link url="https://help.shopify.com/" removeUnderline>Orders</Link>
```

### Modal title prop is now required

To help enforce accessibility for screen readers, `Modal`'s title prop is now required. You must add a title to all your modals. In the event that you do not want to display this title visually you can add the `titleHidden` prop to hide the title.

```diff
<Modal
  activator={activator}
  open={active}
  onClose={handleChange}
  primaryAction={{
    content: 'Add Instagram',
    onAction: handleChange,
  }}
  secondaryActions={[
    {
      content: 'Learn more',
      onAction: handleChange,
    },
  ]}
+  title="Reach more shoppers with Instagram product tags"
+  hiddenTitle
>
  <Modal.Section>
    <TextContainer>
      <p>
        Use Instagram posts to share your products with millions of
        people. Let shoppers buy from your store without leaving
        Instagram.
      </p>
    </TextContainer>
  </Modal.Section>
</Modal>
```

### Sheet requires an accessibility label

Accessibility labels are required for screen readers. This new label does not render anything to the page.

```diff
<Sheet
  open={sheetActive}
  onClose={toggleSheetActive}
+ accessibilityLabel="Reach more shoppers with Instagram product tags"
>
  <TextContainer>
    <p>
      Use Instagram posts to share your products with millions of
      people. Let shoppers buy from your store without leaving
      Instagram.
    </p>
  </TextContainer>
</Sheet>
```

### Replace `ariaPressed` prop with `pressed` in `Button` and `UnstyledButton`

```diff
- <Button ariaPressed={true}>Let’s go</Button>
+ <Button pressed={true}>Let’s go</Button>
```

### Removed `Button`'s `stretchContent` prop

Consumers should combine the `fullWidth` and `textAlign="left"` props instead.

```diff
- <Button stretchContent>Lets go</Button>
+ <Button fullWidth textAlign="left">Lets go</Button>
```

### Removed `Page`'s `seperator` prop

Consumers should remove the seperator property as it no longer renders a border or spacing on the `Page`.

```diff
- <Page title="Settings" separator>
+ <Page title="Settings">
  <Layout>
    <Layout.AnnotatedSection title="Store details">
      <p>Annotated section content</p>
    </Layout.AnnotatedSection>
  </Layout>
</Page>
```

### Removed `Popover`/`PopoverOverlay`'s `preventAutoFocus` prop

There was duplicated functionality and we have decided to replace `preventAutofocus` with `autofocusTarget="none"`.

```diff
<Popover
  active={popoverActive}
  activator={activator}
  onClose={togglePopoverActive}
- preventAutofocus
+ autofocusTarget="none"
>
  <p>Hello world</p>
</Popover>
```

### Removed the light prop from Tooltip

In the new design language `Tooltip`s are always light. Thus the `light` prop no longer has any effect and has been removed. Remove any usage of this prop.

```diff
<Tooltip
  content="Hello world"
- light
>Order #1001</Tooltip>
```

### Removed `plain` property in `Pagination`

With the new visual styles we have decided to remove the plain property from `Pagination`. This makes sure the Pagination appears interactive to users.

```diff
<Pagination
  hasPrevious
  hasNext
  onPrevious={() => handlePrevious()}
  onNext={() => handleNext()}
- plain={true}
/>
```

### Renamed the `additionalMetaData` property to `additionalMetadata` in `Page`

This keeps the capitilisation consistent in the `Header` and `Title` components.

```diff
<Page
  fullWidth
- additionalMetaData="Created May 8, 2020 at 7:31 am from Developer Tools (via import)"
+ additionalMetadata="Created May 8, 2020 at 7:31 am from Developer Tools (via import)"
```

## Sass API Changes

### Removed `button-filled-disabled` SASS function

This function has been removed as `Button` `disabled` property implements this background.

```diff
.IconButton {
  padding: 0.8rem;
- background: button-filled-disabled();
}
```

### Removed `plain-button-background` SASS function

This function has been removed.

```diff
.IconButton {
  padding: 0.8rem;
- background: plain-button-background();
}
```

### Removed `text-emphasis-placeholder` SASS mixin

With the new visual styles the placeholder and subdued mixins have the same functionality. We have replaced the placeholder for subdued.

```diff
.SearchInput {
- color: @include button-filled-disabled();
+ color: @include text-emphasis-subdued();
}
```

### Removed `skeleton-page-header-has-secondary-actions` SASS mixin

The `skeleton-page-header-has-secondary-actions` mixin has been removed.

```diff
.Header {
- @include skeleton-page-header-has-secondary-actions;
}
```

## Exported type changes

### Removed `AnimationProps`

`AnimationProps` is a simple type that was used once in `@shopify/polaris` and we have decided to remove it.

```diff
- import {AnimationProps} from '@shopify/polaris';

+ interface AnimationProps {
+   in?: boolean;
+ }
```

### Removed `NewDesignLanguageColor` and `Color`

The `NewDesignLanguageColor` and `Color` that describes the argument you pass into Icon's color prop. You should use `IconProps['color']` instead of referencing these low level types.

```diff
- import {Color, NewDesignLanguageColor, Icon} from '@shopify/polaris';
+ import {Icon, IconProps} from '@shopify/polaris';

interface PartyIconProps {
- color: Color | NewDesignLanguageColor;
+ color: IconProps['color'];
}
```

### Replaced `BaseAction` type with `Action`

`BaseAction` has been replaced with the `Action` type.

```diff
- import {BaseAction} from '@shopify/polaris';
+ import {Action} from '@shopify/polaris';

export interface Props {
- headerAction?: BaseAction;
+ headerAction?: Action;
}
```
