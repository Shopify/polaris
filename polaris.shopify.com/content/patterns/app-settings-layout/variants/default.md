---
hideFromNav: true
---

<HowItHelps>

## How it helps merchants

![App settings page with two columns](/images/patterns/app-settings-layout/app-settings-cover-image.png)

1. In the left column, glanceable labels and descriptions are listed to make it easier for merchants to scan the page and quickly find what they are looking for.
2. In the right column, settings are grouped in cards to make it easier for merchants to configure a setting after it's been found, or to configure multiple settings that might belong together.

<DefinitionTable>

### Use when merchants need to:

**Find and change app settings**
: This pattern is used specifically for finding and updating individual app settings within the Shopify admin.

</DefinitionTable>

</HowItHelps>

<Usage>

## Using this pattern

This pattern uses the [`BlockStack`](/components/layout-and-structure/block-stack), [`Card`](/components/layout-and-structure/card), [`InlineGrid`](/components/layout-and-structure/inline-grid) and [`Box`](/components/layout-and-structure/box) components.

{/* prettier-ignore */}
```javascript {"type":"previewContext","for":"example"}
<div style={{ padding: '2rem' }}>
  {(____CODE____)()}
</div>
```

{/* prettier-ignore */}
```javascript {"type":"sandboxContext","for":"example"}
{(____CODE____)()}
```

```javascript {"type":"livePreview","id":"example","title":"App settings layout"}
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
      <BlockStack gap={{xs: '800', sm: '400'}}>
        <InlineGrid columns={{xs: '1fr', md: '2fr 5fr'}} gap="400">
          <Box
            as="section"
            paddingInlineStart={{xs: 400, sm: 0}}
            paddingInlineEnd={{xs: 400, sm: 0}}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                InterJambs
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Interjamb style" />
              <TextField label="Interjamb ratio" />
            </BlockStack>
          </Card>
        </InlineGrid>
        {smUp ? <Divider /> : null}
        <InlineGrid columns={{xs: '1fr', md: '2fr 5fr'}} gap="400">
          <Box
            as="section"
            paddingInlineStart={{xs: 400, sm: 0}}
            paddingInlineEnd={{xs: 400, sm: 0}}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Dimensions
              </Text>
              <Text as="p" variant="bodyMd">
                Interjambs are the rounded protruding bits of your puzzlie piece
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <BlockStack gap="400">
              <TextField label="Horizontal" />
              <TextField label="Interjamb ratio" />
            </BlockStack>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}
```

</Usage>

### Useful to know

<SideBySide>

- Don't include a description unless it's helpful.

  ![Section header with no description on an app settings page](/images/patterns/app-settings-layout/app-settings-usage-1.png)

- Place grouped settings within cards.

  ![App settings page with section headings and grouped settings](/images/patterns/app-settings-layout/app-settings-usage-2.png)

- Stack all setting groups vertically on the page.

  ![App settings page with two vertically stacked sections](/images/patterns/app-settings-layout/app-settings-usage-3.png)

</SideBySide>
