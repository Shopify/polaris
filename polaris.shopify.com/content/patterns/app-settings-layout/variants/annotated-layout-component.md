---
slug: using-annotated-layout
title: Using Annotated layout
hideFromNav: true
---

<div as="Usage">

## Using the Layout component to build the app-settings page

We can use the Layout component from @shopify/polaris-react to build out the app-settings page.

```bash
npm install @shopify/polaris-react
```

```tsx
import {Layout} from '@shopify/polaris-react';
```

### Scannable descriptions

Use the `Layout.AnnotatedSection` component for each section of our app-settings layout.
The title and description for each of our sections will be styled in a way that is
easily scannable.

```tsx
<Layout>
  <Layout.AnnotatedSection
    title="Store details"
    description="Shopify and your customers will use this information to contact you."
  />
</Layout>
```

### Group related settings

Use `Layout.AnnotatedSection` to group related settings, doing so will also automatically add the right vertical padding to make each individual settings group easier to scan and identify.

Within `Layout.AnnotatedSection`, we use the [`AlphaCard`](/components/layout-and-structure/AlphaCard) and
[`AlphaStack`](/components/layout-and-structure/AlphaStack) components here
to provide the right spacing and visual hierarchy to help merchants more easily
configure a setting after it's been found.

<!-- TODO: highlight relevant lines -->

```tsx
<Layout>
  <Layout.AnnotatedSection
    id="storeDetails"
    title="Store details"
    description="Shopify and your customers will use this information to contact you."
  >
    <AlphaCard>
      <AlphaStack gap="4">
        <TextField label="Interjamb style" />
        <TextField label="Interjamb ratio" />
      </AlphaStack>
    </AlphaCard>
  </Layout.AnnotatedSection>
</Layout>
```

### Understanding the layout

The AnnotatedLayout uses a 1:2 ratio of description:settings as this is optimal for readability on desktop. (TODO: why?).

When a merchant is using a mobile device, the AnnotatedLayout component automatically stacks content as this is is more readable than
a 2 column layout.

![TODO: image of mobile stacking]()

<!-- prettier-ignore -->
```tsx
<Layout>
  <Layout.AnnotatedSection
    id="storeDetails"
    title="Store details"
    description="Shopify and your customers will use this information to contact you."
  >
    <AlphaCard roundedAbove="sm" />
  </Layout.AnnotatedSection>
</Layout>
```

### Finishing touches

TODO: `roundedAbove` on `<AlphaCard>` makes the card full width / look better

```tsx
<AlphaCard roundedAbove="sm">
  <AlphaStack gap="4">
    <TextField label="Store name" onChange={() => {}} autoComplete="off" />
    <TextField
      type="email"
      label="Account email"
      onChange={() => {}}
      autoComplete="email"
    />
  </AlphaStack>
</AlphaCard>
```

### All together

NOTE: Use the `<Page>` component for actions and event listeners

<!-- prettier-ignore -->
```javascript {"type":"previewContext","for":"example"}
<div style={{ paddingBottom: '2rem' }}>
  ____CODE____
</div>
```

```javascript {"type":"livePreview","id":"example"}
<Page fullWidth>
  <Layout>
    <Layout.AnnotatedSection
      id="storeDetails"
      title="Store details"
      description="Shopify and your customers will use this information to contact you."
    >
      <AlphaCard roundedAbove="sm">
        <AlphaStack gap="4">
          <TextField
            label="Store name"
            onChange={() => {}}
            autoComplete="off"
          />
          <TextField
            type="email"
            label="Account email"
            onChange={() => {}}
            autoComplete="email"
          />
        </AlphaStack>
      </AlphaCard>
    </Layout.AnnotatedSection>
    <Layout.AnnotatedSection
      id="storeDetails"
      title="Store details"
      description="Shopify and your customers will use this information to contact you."
    >
      <AlphaCard roundedAbove="sm">
        <FormLayout>
          <TextField
            label="Store name"
            onChange={() => {}}
            autoComplete="off"
          />
          <TextField
            type="email"
            label="Account email"
            onChange={() => {}}
            autoComplete="email"
          />
        </FormLayout>
      </AlphaCard>
    </Layout.AnnotatedSection>
  </Layout>
</Page>
```

</div>
