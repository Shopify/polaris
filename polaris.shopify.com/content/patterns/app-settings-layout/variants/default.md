---
hideFromNav: true
---

<div as="HowItHelps">

## How it helps merchants

![App settings page with two columns](/images/patterns/app-settings-layout/app-settings-cover-image.png)

1. In the left column, glanceable labels and descriptions are listed to make it easier for merchants to scan the page and quickly find what they are looking for.
2. In the right column, settings are grouped in cards to make it easier for merchants to configure a setting after it's been found, or to configure multiple settings that might belong together.

<div as="DefinitionTable">

### Use when merchants need to:

**Find and change app settings**
: This pattern is used specifically for finding and updating individual app settings within the Shopify admin.

</div>
</div>
<div as="Usage">

## Using this pattern

### Building with AppSettingsLayout

#### Install Polaris patterns

[Polaris patterns](https://github.com/Shopify/polaris/tree/3eefcc4382e6f2360c80266306e86eb4d9671255/polaris-patterns) is an opinionated UI library that provides out of the box implementations of common patterns in the Shopify Admin.

<div as="Install"></div>

#### Import the AppSettingsLayout component

Import `AppSettingsLayout` from the patterns library along with any other Polaris components from the core library that you may need.

```javascript
import {Page} from '@shopify/polaris';
import {AppSettingsLayout} from '@shopify/polaris-patterns';
```

#### Composition

`AppSettingsLayout` has two subcomponents (see [props](#props) for each of these components' APIs.):

- `AppSettingsLayout.AnnotatedSection`
- `AppSettingsLayout.Card`

A typical settings section is composed like this:

```javascript
<AppSettingsLayout.AnnotatedSection
  title="InterJambs"
  description="Interjambs are the rounded protruding bits of your puzzlie piece"
  hideDivider
>
  <AppSettingsLayout.Card>{mySettingCardContent}</AppSettingsLayout.Card>
</AppSettingsLayout.AnnotatedSection>
```

Set `hideDivider` to `true` on the first annotated section and `false` on subsequent sections.

Then, wrap all of the annotated sections with `AppSettingsLayout`.

#### Example

```javascript {"type":"previewContext","for":"example"}
<div style={{paddingBottom: '2rem'}}>{____CODE____()}</div>
```

```javascript {"type":"livePreview","id":"example"}
// import {Page} from '@shopify/polaris';
// import {AppSettingsLayout} from '@shopify/polaris-patterns';

<Page
  divider
  primaryAction={{
    content: 'View on your store',
    disabled: true,
    onAction: () => {},
  }}
  secondaryActions={[
    {
      content: 'Duplicate',
      accessibilityLabel: 'Duplicate settings',
      onAction: () => {},
    },
  ]}
>
  <AppSettingsLayout>
    <AppSettingsLayout.AnnotatedSection
      title="InterJambs"
      description="Interjambs are the rounded protruding bits of your puzzlie piece"
      hideDivider
    >
      <AppSettingsLayout.Card>
        <TextField label="Interjamb style" autoComplete="off" />
        <TextField label="Interjamb ratio" autoComplete="off" />
      </AppSettingsLayout.Card>
    </AppSettingsLayout.AnnotatedSection>
    <AppSettingsLayout.AnnotatedSection
      title="Dimensions"
      description="Size of your puzzlie piece"
    >
      <AppSettingsLayout.Card>
        <TextField label="Horizontal" autoComplete="off" />
        <TextField label="Interjamb ratio" autoComplete="off" />
      </AppSettingsLayout.Card>
    </AppSettingsLayout.AnnotatedSection>
  </AppSettingsLayout>
</Page>
```

#### Props

<div as="PropsTables"></div>

### Building with primatives

This pattern uses the [`VerticalStack`](/components/layout-and-structure/vertical-stack), [`AlphaCard`](/components/layout-and-structure/alpha-card), [`HorizontalGrid`](/components/layout-and-structure/horizontal-grid) and [`Box`](/components/layout-and-structure/box) components.

<!-- prettier-ignore -->
```javascript {"type":"previewContext","for":"example"}
<div style={{ paddingBottom: '2rem' }}>
  {(____CODE____)()}
</div>
```

```javascript {"type":"livePreview","id":"example"}
function AppSettingsLayoutExample() {
  const {smUp} = useBreakpoints();
  return (
    <Page
      divider
      primaryAction={{content: 'View on your store', disabled: true}}
      secondaryActions={[
        {
          content: 'Duplicate',
          accessibilityLabel: 'Secondary action label',
          onAction: () => alert('Duplicate action'),
        },
      ]}
    >
      <VerticalStack gap={{xs: '8', sm: '4'}}>
        <HorizontalGrid columns={{xs: '1fr', md: '2fr 5fr'}} gap="4">
          <Box
            as="section"
            paddingInlineStart={{xs: 4, sm: 0}}
            paddingInlineEnd={{xs: 4, sm: 0}}
          >
            <VerticalStack gap="4">
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </VerticalStack>
          </Box>
          <AlphaCard roundedAbove="sm">
            <VerticalStack gap="4">
              <TextField label="Interjamb style" />
              <TextField label="Interjamb ratio" />
            </VerticalStack>
          </AlphaCard>
        </HorizontalGrid>
        {smUp ? <Divider /> : null}
        <HorizontalGrid columns={{xs: '1fr', md: '2fr 5fr'}} gap="4">
          <Box
            as="section"
            paddingInlineStart={{xs: 4, sm: 0}}
            paddingInlineEnd={{xs: 4, sm: 0}}
          >
            <VerticalStack gap="4">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </VerticalStack>
          </Box>
          <AlphaCard roundedAbove="sm">
            <VerticalStack gap="4">
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </VerticalStack>
          </AlphaCard>
        </HorizontalGrid>
      </VerticalStack>
    </Page>
  );
}
```

</div>
<div as="UsefulToKnow">

### Useful to know

- <span>Don't include a description unless it's helpful.</span> ![Section header with no description on an app settings page](/images/patterns/app-settings-layout/app-settings-usage-1.png)
- <span>Place grouped settings within cards.</span> ![App settings page with section headings and grouped settings](/images/patterns/app-settings-layout/app-settings-usage-2.png)
- <span>Stack all setting groups vertically on the page.</span> ![App settings page with two vertically stacked sections](/images/patterns/app-settings-layout/app-settings-usage-3.png)

</div>
