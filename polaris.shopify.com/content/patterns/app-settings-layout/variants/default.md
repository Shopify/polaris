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

This pattern uses the [`AlphaStack`](/components/layout-and-structure/alpha-stack), [`AlphaCard`](/components/layout-and-structure/alpha-card), [`Columns`](/components/layout-and-structure/columns) and [`Box`](/components/layout-and-structure/box) components.

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
      <AlphaStack gap={{xs: '8', sm: '4'}}>
        <Columns columns={{xs: '1fr', md: '2fr 5fr'}} gap="4">
          <Box
            as="section"
            paddingInlineStart={{xs: 4, sm: 0}}
            paddingInlineEnd={{xs: 4, sm: 0}}
          >
            <AlphaStack gap="4">
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </AlphaStack>
          </Box>
          <AlphaCard roundedAbove="sm">
            <AlphaStack gap="4">
              <TextField label="Interjamb style" />
              <TextField label="Interjamb ratio" />
            </AlphaStack>
          </AlphaCard>
        </Columns>
        {smUp ? <Divider borderColor="border-subdued" /> : null}
        <Columns columns={{xs: '1fr', md: '2fr 5fr'}} gap="4">
          <Box
            as="section"
            paddingInlineStart={{xs: 4, sm: 0}}
            paddingInlineEnd={{xs: 4, sm: 0}}
          >
            <AlphaStack gap="4">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </AlphaStack>
          </Box>
          <AlphaCard roundedAbove="sm">
            <AlphaStack gap="4">
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </AlphaStack>
          </AlphaCard>
        </Columns>
      </AlphaStack>
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
