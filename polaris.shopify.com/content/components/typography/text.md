---
title: Text
description: Typography helps establish hierarchy and communicate important content by creating clear visual patterns.
category: Typography
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
  value: Beta
  message: This component is in development. There could be breaking changes made to it in a non-major release of Polaris. Please use with caution.
examples:
  - fileName: text-heading.tsx
    title: Heading
    description: >-
      Use to create various levels of hierarchy on the page.
  - fileName: text-body.tsx
    title: Body
    description: >-
      Use to create a range of body text. These styles are primarily used within components and blocks of text.
  - fileName: text-align.tsx
    title: Align
    description: >-
      Use to set text alignment.
  - fileName: text-weight.tsx
    title: Weight
    description: >-
      Use to give text a range of font weights.
  - fileName: text-color.tsx
    title: Color
    description: >-
      Use to set text color.
---

## Mapping from previous type components

These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

### DisplayText

#### Small

```diff
- <DisplayText size="small">Sales this year</DisplayText>
+ <Text variant="headingLg" as="p">Sales this year</Text>
```

#### Medium

```diff
- <DisplayText size="medium">Sales this year</DisplayText>
+ <Text variant="headingXl" as="p">Sales this year</Text>
```

#### Large

```diff
- <DisplayText size="large">Sales this year</DisplayText>
+ <Text variant="heading2xl" as="p">Sales this year</Text>
```

#### Extra large

```diff
- <DisplayText size="extraLarge">Sales this year</DisplayText>
+ <Text variant="heading4xl" as="p">Sales this year</Text>
```

### Heading

```diff
- <Heading>Online store dashboard</Heading>
+ <Text variant="headingMd" as="h2">Online store dashboard</Text>
```

### Subheading

```diff
- <Subheading>Accounts</Subheading>
+ <Text variant="headingXs" as="h3">Accounts</Text>
```

### Caption

```diff
- <Caption>Received April 21, 2017</Caption>
+ <Text variant="bodySm" as="p">Received April 21, 2017</Text>
```

### TextStyle

#### Subdued

```diff
- <TextStyle variation="subdued">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="subdued">No supplier listed</Text>
```

#### Strong

```diff
- <TextStyle variation="strong">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" fontWeight="semibold" >No supplier listed</Text>
```

#### Positive

```diff
- <TextStyle variation="positive">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="success">No supplier listed</Text>
```

#### Negative

```diff
- <TextStyle variation="negative">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="critical">No supplier listed</Text>
```

#### Warning

```diff
- <TextStyle variation="warning">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span" color="warning">No supplier listed</Text>
```

#### Code

```diff
- <TextStyle variation="code">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="span"><InlineCode>No supplier listed</InlineCode></Text>
```

### VisuallyHidden

```diff
- <VisuallyHidden>
-   <Heading>Title and description</Heading>
- </VisuallyHidden>
+ <Text visuallyHidden variant="bodySm" as="h2">Title and description</Text>
```
