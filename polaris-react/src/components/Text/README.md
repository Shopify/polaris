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

### Heading small

Use to create a small heading text.

```jsx
<Text variant="headingSm" as="h6">
  Online store dashboard
</Text>
```

### Heading medium

Use to create a medium heading text.

```jsx
<Text variant="headingMd" as="h6">
  Online store dashboard
</Text>
```

### Heading large

Use to create a large heading text.

```jsx
<Text variant="headingLg" as="h5">
  Online store dashboard
</Text>
```

### Heading extra large

Use to create an extra large heading text.

```jsx
<Text variant="headingXl" as="h4">
  Online store dashboard
</Text>
```

### Heading 2xl

Use to create a 2xl heading text.

```jsx
<Text variant="heading2xl" as="h3">
  Online store dashboard
</Text>
```

### Heading 3xl

Use to create a 3xl heading text.

```jsx
<Text variant="heading3xl" as="h2">
  Online store dashboard
</Text>
```

### Heading 4xl

Use to create a 4xl heading text.

```jsx
<Text variant="heading4xl" as="h1">
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

### With align inherit

Use to inherit parent alignment.

```jsx
<Text variant="bodyLg" as="p" alignment="inherit">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### With align start

Use to align text at start of horizontal line.

```jsx
<Text variant="bodyLg" as="p" alignment="start">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### With align center

Use to align text at center of horizontal line.

```jsx
<Text variant="bodyLg" as="p" alignment="center">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### With align end

Use to align text at end of horizontal line.

```jsx
<Text variant="bodyLg" as="p" alignment="end">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### With align justify

Use to align text on a vertical line.

```jsx
<Text variant="bodyLg" as="p" alignment="justify">
  Manage your Shopify store on-the-go with real-time notifications, access to
  your dashboard, and order management, all from your smartphone.
</Text>
```

### With font weight regular

Use to give text a regular font weight.

```jsx
<Text variant="bodyMd" as="p" fontWeight="regular">
  Sales this year
</Text>
```

### With font weight medium

Use to give text a medium font weight.

```jsx
<Text variant="bodyMd" as="p" fontWeight="medium">
  Sales this year
</Text>
```

### With font weight semibold

Use to give text a semibold font weight.

```jsx
<Text variant="bodyMd" as="p" fontWeight="semibold">
  Sales this year
</Text>
```

### With font weight bold

Use to give text a bold font weight.

```jsx
<Text variant="bodyMd" as="p" fontWeight="bold">
  Sales this year
</Text>
```

### With color success

Use in combination with a symbol showing an increasing value to indicate an upward trend.

```jsx
<Text variant="bodyMd" as="p" color="success">
  Orders increased
</Text>
```

### With color critical

Use in combination with a symbol showing a decreasing value to indicate a downward trend.

```jsx
<Text variant="bodyMd" as="p" color="critical">
  Orders decreased
</Text>
```

### With color warning

Use to denote something that needs attention, or that merchants need to take action on.

```jsx
<Text variant="bodyMd" as="p" color="warning">
  Scheduled maintenance
</Text>
```

### With color subdued

Use to de-emphasize a piece of text that is less important to merchants than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect.

```jsx
<Text variant="bodyMd" as="p" color="subdued">
  No supplier listed
</Text>
```
## Mapping from previous type components
These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

### DisplayText

#### Small

```diff
- <DisplayText size="small">Sales this year</DisplayText>
+ <Text variant="headingXl">Sales this year</Text>
#### Medium
```jsx
<DisplayText size="medium">Sales this year</DisplayText>
```
Replace with
```jsx
<Text variant="heading2xl"
>Sales this year</Text>
```
#### Large
```jsx
<DisplayText size="large">Sales this year</DisplayText>
```
Replace with
```jsx
<Text variant="heading3xl"
>Sales this year</Text>
```
#### Extra large
```jsx
<DisplayText size="extraLarge">Sales this year</DisplayText>
```
Replace with
```jsx
<Text variant="heading4xl"
>Sales this year</Text>
```
### Heading
```jsx
<Heading>Online store dashboard</Heading>
```

Replace with
```jsx
<Text variant="headingLg">Online store dashboard</Text>
```
### Subheading
```jsx
<Subheading>Accounts</Subheading>
```

Replace with
```jsx
<Text variant="headingSm">Accounts</Text>
```
### Caption
```jsx
<Caption>Received April 21, 2017</Caption>
```

Replace with
```jsx
<Text variant="bodySm">Received April 21, 2017</Text>
```
### TextStyle

#### Subdued
```jsx
<TextStyle variation="subdued">No supplier listed</TextStyle>
```

Replace with
```jsx
<Text variant="bodyMd" as="p" color="subdued">
  No supplier listed
</Text>
```

#### Strong
```jsx
<TextStyle variation="strong">No supplier listed</TextStyle>
```

Replace with
```jsx
<Text variant="bodyMd" as="p" fontWeight="semibold" >
  No supplier listed
</Text>
```
#### Positive
```jsx
<TextStyle variation="positive">No supplier listed</TextStyle>
```

Replace with
```jsx
<Text variant="bodyMd" as="p" color="success">
  No supplier listed
</Text>
```

#### Negative
```jsx
<TextStyle variation="negative">No supplier listed</TextStyle>
```

Replace with
```jsx
<Text variant="bodyMd" as="p" color="critical">
  No supplier listed
</Text>
```

#### Warning
```jsx
<TextStyle variation="warning">No supplier listed</TextStyle>
```

Replace with
```jsx
<Text variant="bodyMd" as="p" color="warning">
  No supplier listed
</Text>
```

#### Code
```jsx
<TextStyle variation="code">No supplier listed</TextStyle>
```

Replace with
```jsx
<Text variant="bodyMd" as="p">
  <InlineCode>No supplier listed</InlineCode>
</Text>

```
