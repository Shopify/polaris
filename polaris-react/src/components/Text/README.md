---
name: Text
category: Titles and text
keywords:
  - titles
  - text
  - typographic
  - spacing
  - display
  - heading
  - body
  - success
  - critical
  - warning
  - subdued
  - regular
  - medium
  - semibold
  - bold
  - list
status:
  value: Alpha
  message: This component is in development. There could be breaking changes made to it in a non-major release of Polaris. Please use with caution.
---

# Text

Typography helps establish hierarchy and communicate important content by creating clear visual patterns.

---

## Examples

### Display small

Use to create a small display text.

```jsx
<Text variant="displaySm">Good evening, Dominic.</Text>
```

### Display medium

Use to create a medium display text.

```jsx
<Text variant="displayMd">Good evening, Dominic.</Text>
```

### Display large

Use to create a large display text.

```jsx
<Text variant="displayLg">Good evening, Dominic.</Text>
```

### heading small

Use to create a small heading text.

```jsx
<Text variant="headingSm" as="h6">
  Online store dashboard
</Text>
```

### Heading medium

Use to create a medium heading text.

```jsx
<Text variant="headingMd" as="h5">
  Online store dashboard
</Text>
```

### Heading large

Use to create a large heading text.

```jsx
<Text variant="headingLg" as="h4">
  Online store dashboard
</Text>
```

### Heading extra large

Use to create an extra large heading text.

```jsx
<Text variant="headingXl" as="h3">
  Online store dashboard
</Text>
```

### Body small

Use to create a small body text.

```jsx
<Text variant="bodySm" as="p">
  Shopify POS is the easiest way to sell your products in person. Available for
  iPad, iPhone, and Android.
</Text>
```

### Body medium

Use to create a medium body text.

```jsx
<Text variant="bodyMd" as="p">
  Shopify POS is the easiest way to sell your products in person. Available for
  iPad, iPhone, and Android.
</Text>
```

### Body large

Use to create a large body text.

```jsx
<Text variant="bodyLg" as="p">
  Shopify POS is the easiest way to sell your products in person. Available for
  iPad, iPhone, and Android.
</Text>
```

### Align Inherit

Use to inherit parent alignment.

```jsx
<Text variant="bodyLg" as="p" alignment="inherit">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### Align Start

Use to align text at start of horizontal line.

```jsx
<Text variant="bodyLg" as="p" alignment="start">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### Align Center

Use to align text at center of horizontal line.

```jsx
<Text variant="bodyLg" as="p" alignment="center">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### Align End

Use to align text at end of horizontal line.

```jsx
<Text variant="bodyLg" as="p" alignment="end">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### Align Justify

Use to align text on a vertical line.

```jsx
<Text variant="bodyLg" as="p" alignment="justify">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### Font Weight Regular

Use to give text a regular font weight.

```jsx
<Text variant="bodyMd" as="p" fontWeight="regular">
  Sales this year
</Text>
```

### Font Weight Medium

Use to give text a medium font weight.

```jsx
<Text variant="bodyMd" as="p" fontWeight="medium">
  Sales this year
</Text>
```

### Font Weight Semi-bold

Use to give text a semi-bold font weight.

```jsx
<Text variant="bodyMd" as="p" fontWeight="semibold">
  Sales this year
</Text>
```

### Font Weight Bold

Use to give text a bold font weight.

```jsx
<Text variant="bodyMd" as="p" fontWeight="bold">
  Sales this year
</Text>
```

### Success text color

Use in combination with a symbol showing an increasing value to indicate an upward trend.

```jsx
<Text variant="bodyMd" as="p" color="success">
  Orders increased
</Text>
```

### Critical text color

Use in combination with a symbol showing a decreasing value to indicate a downward trend.

```jsx
<Text variant="bodyMd" as="p" color="critical">
  Orders decreased
</Text>
```

### Warning text color

Use to denote something that needs attention, or that merchants need to take action on.

```jsx
<Text variant="bodyMd" as="p" color="warning">
  Scheduled maintenance
</Text>
```

### Subdued text color

Use to de-emphasize a piece of text that is less important to merchants than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect.

```jsx
<Text variant="bodyMd" as="p" color="subdued">
  No supplier listed
</Text>
```

---
