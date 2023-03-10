---
title: Using layout primitives
slug: using-layout-primitives
hideFromNav: true
---

<div as="Usage">

## Building an app settings page

### Scannable descriptions

Keep body text scannable with the `bodyMd` variant, and reduce descriptions to
at most a single paragraph.

```tsx
<Text as="p" variant="bodyMd">
  Interjambs are the rounded protruding bits of your puzzle piece
</Text>
```

To make it easier for merchants to scan the page and quickly find what they are looking for, headings should use the `headingMd` variant:

```tsx
<Text as="h3" variant="headingMd">
  InterJambs
</Text>
```

Combine headings and descriptions with the `<AlphaStack>` component to ensure an
appropriate gap is used (TODO: better write here):

```tsx
<AlphaStack gap="4">
  <Text as="h3" variant="headingMd">
    InterJambs
  </Text>
  <Text as="p" variant="bodyMd">
    Interjambs are the rounded protruding bits of your puzzlie piece
  </Text>
</AlphaStack>
```

TODO: Learn more about composing layouts with AlphaStack, etc [here]().

### Group related settings

Use the [`AlphaCard`](/components/layout-and-structure/AlphaCard) and
[`AlphaStack`](/components/layout-and-structure/AlphaStack) components to
provide the right spacing and visual hierarchy to help merchants more easily
configure a setting after it's been found. (TODO: why? Scanability? Faster JTBD)

<!-- TODO: highlight relevant lines -->

```tsx
<AlphaCard>
  <AlphaStack gap="4">
    <TextField label="Interjamb style" />
    <TextField label="Interjamb ratio" />
  </AlphaStack>
</AlphaCard>
```

### Laying it all out

A 2:5 ratio of description:settings is good on desktop. (TODO: why?).

When a merchant is using a mobile device, stacked content is more readable than
a 2 column layout.

Polaris provides us with the [`Columns`](/components/layout-and-structure/Columns) component that abstracts away the complexity of automatically stacking on mobile for us. Use the `columns` prop to set the ratio at different [breakpoints](TODO)

![TODO: image of mobile stacking]()

<!-- prettier-ignore -->
```tsx
<Columns
  columns={{
    // On mobile, only a single column is used
    xs: '1fr',
    // On medium and above, use a two column layout in a 2:5 ratio
    md: '2fr 5fr'
  }}
  gap="4"
>
  {''/* Description goes here. Left column on desktop, Stacked on top on mobile.*/}
  <Text />
  {''/* Settings go here. Right column on desktop, Stacked on bottom on mobile */}
  <AlphaCard />
</Columns>
```

### Finishing touches

TODO: When stacked on mobile, align the description text with the settings below by
wrapping in a box with padding.

```tsx
<Box
  as="section"
  // On mobile when stacked, we want the description to have the same
  // padding as the Card below.
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
```

TODO: `roundedAbove` on `<AlphaCard>` makes the card full width / look better

```tsx
<AlphaCard roundedAbove="sm">
  <AlphaStack gap="4">
    <TextField label="Interjamb style" />
    <TextField label="Interjamb ratio" />
  </AlphaStack>
</AlphaCard>
```

### All together

NOTE: Use the `<Page>` component for actions and event listeners

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
        {smUp ? <Divider borderStyle="base" /> : null}
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
