# Migrating from v5 to v6

Polaris v6.0.0 ([full release notes](https://github.com/Shopify/polaris-react/releases/tag/v6.0.0)) removes deprecated features in past releases. This file describes all code updates required to stay up to date.

## AppProvider theming changes

### newDesignLanguage feature has been removed and is now the default

In v6 you no longer need to enable the newDesignLanguage through the features flag in the `AppProvider`.

```diff
<AppProvider
  i18n={{}}
- features={{newDesignLanguage: true}}
>
```

### Removed legacy topbar theming

With the new visual styles the TopBar theming has been replaced with the `ThemeProvider`. If you want to change the `TopBar` appearance you can ovveride the theme or the CSS variables.

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

## Exported type changes

### Removed exported type`AnimationProps`

`AnimationProps` is a simple type that was used once in `@shopify/polaris` and we have decided to remove it.

```diff
- import {AnimationProps} from '@shopify/polaris';

+ interface AnimationProps {
+   in?: boolean;
+ }
```

### Removed export for `NewDesignLanguageColor` and `Color`

We no longer support `NewDesignLanguageColor` and `Color` types. They were used to type our icon colors and have been replaced with ` IconProps['color']`.

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

## Component API changes

### Link is underlined by default

When using the `Link` component it is now underlined by default to make sure that color is not the only way for users to percieve interactivity.

When other factors help a user determine interactivity the underline can be removed with the `removeUnderline` prop.

```diff
- <Link url="https://help.shopify.com/">Orders</Link>
+ <Link url="https://help.shopify.com/" removeUnderline>Orders</Link>
```

### Modals require a title property that can be hidden

Modal titles are required for screenreaders. There is a new option to hide the title.

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

With the new changes `Tooltip` it now defaults to a light background. The property can safely be removed.

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

### Removed `button-filled-disabled` SASS mixin

This mixin has been removed as `Button` `disabled` property implements this background.

```diff
.IconButton {
  padding: 0.8rem;
- background: button-filled-disabled();
}
```

### Removed `plain-button-background` SASS mixin

This mixin has been removed as `Button` `plain` property implements this background.

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
- color: text-emphasis-placeholder();
+ color: text-emphasis-subdued();
}
```
