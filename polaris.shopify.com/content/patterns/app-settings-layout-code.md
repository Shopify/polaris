# How you should build this

## Intro

Reiterating the principles and why this pattern is important.

## Scannable headings on Mobile and desktop

- Scannable headings use `headingMd`

// Embed goes here

```jsx
<Text as="h3" variant="headingMd">
  InterJambs
</Text>
```

- For descriptions use `bodyMd`

// Embed goes here

```jsx
<Text as="p" variant="bodyMd">
  Interjambs are the rounded protruding bits of your puzzlie piece
</Text>
```

- To make the headings scannable on Mobile, we probably also want to use [css-grid](https://mdn.org/css-grid) to accommodate stacking descriptions on form fields in mobile.
  - Conveniently Polaris provides us with the [`Columns`](/components/layout-and-structure/Columns) component that abstracts away this complexity for us.

// Embed goes here

```tsx
<Columns columns={{xs: '1fr', md: '2fr 5fr'}}>
  // This is the left hand column description
  <Box />
  // This is our card element with all of our grouped form elements / content
  <AlphaCard />
</Columns>
```

> Note: We have to compose the Columns component in a particular way, because of browser compatibility issues.

## Using the Card and Stack component to group Settings

Use the AlphaCard and Stack components to provide the right spacing and visual hierarchy
to help merchants more easily configure a setting after it's been found.

// Embed goes here

```tsx
<AlphaCard roundedAbove="sm">
  <AlphaStack fullWidth>
    <TextField label="Interjamb style" />
    <TextField label="Interjamb ratio" />
  </AlphaStack>
</AlphaCard>
```

## Good reference implementations.[optional]

- Do we want this?
- What should this look like?
- How do we safeguard against someone just copy and pasting this instead?
