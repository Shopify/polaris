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
examples:
  - fileName: text-heading-small.tsx
    title: Heading small
    description: >-
      Use to create a small heading text.
  - fileName: text-heading-medium.tsx
    title: Heading medium
    description: >-
      Use to create a medium heading text.
  - fileName: text-heading-large.tsx
    title: Heading large
    description: >-
      Use to create a large heading text.
  - fileName: text-heading-extra-large.tsx
    title: Heading extra large
    description: >-
      Use to create an extra large heading text.
  - fileName: text-heading-2xl.tsx
    title: Heading 2xl
    description: >-
      Use to create a 2xl heading text.
  - fileName: text-heading-3xl.tsx
    title: Heading 3xl
    description: >-
      Use to create a 3xl heading text.
  - fileName: text-heading-4xl.tsx
    title: Heading 4xl
    description: >-
      Use to create a 4xl heading text.
  - fileName: text-body-small.tsx
    title: Body small
    description: >-
      Use to create a small body text.
  - fileName: text-body-medium.tsx
    title: Body medium
    description: >-
      Use to create a medium body text.
  - fileName: text-body-large.tsx
    title: Body large
    description: >-
      Use to create a large body text.
  - fileName: text-with-align-inherit.tsx
    title: With align inherit
    description: >-
      Use to inherit parent alignment.
  - fileName: text-with-align-start.tsx
    title: With align start
    description: >-
      Use to align text at start of horizontal line.
  - fileName: text-with-align-center.tsx
    title: With align center
    description: >-
      Use to align text at center of horizontal line.
  - fileName: text-with-align-end.tsx
    title: With align end
    description: >-
      Use to align text at end of horizontal line.
  - fileName: text-with-align-justify.tsx
    title: With align justify
    description: >-
      Use to align text on a vertical line.
  - fileName: text-with-font-weight-regular.tsx
    title: With font weight regular
    description: >-
      Use to give text a regular font weight.
  - fileName: text-with-font-weight-medium.tsx
    title: With font weight medium
    description: >-
      Use to give text a medium font weight.
  - fileName: text-with-font-weight-semibold.tsx
    title: With font weight semibold
    description: >-
      Use to give text a semi-bold font weight.
  - fileName: text-with-font-weight-bold.tsx
    title: With font weight bold
    description: >-
      Use to give text a bold font weight.
  - fileName: text-with-color-success.tsx
    title: With color success
    description: >-
      Use in combination with a symbol showing an increasing value to indicate an upward trend.
  - fileName: text-with-color-critical.tsx
    title: With color critical
    description: >-
      Use in combination with a symbol showing a decreasing value to indicate a downward trend.
  - fileName: text-with-color-warning.tsx
    title: With color warning
    description: >-
      Use to denote something that needs attention, or that merchants need to take action on.
  - fileName: text-with-color-subdued.tsx
    title: With color subdued
    description: >-
      Use to de-emphasize a piece of text that is less important to merchants than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect.
---

# Text

Typography helps establish hierarchy and communicate important content by creating clear visual patterns.

---

## Mapping from previous type components
These are suggested replacements for existing text style components, but ultimately the best replacement should be evaluated based on the context of the usage. The `Text` component also requires setting the semantically appropriate html element through the `as` prop.

### DisplayText

#### Small

```diff
- <DisplayText size="small">Sales this year</DisplayText>
+ <Text variant="headingXl">Sales this year</Text>
```
#### Medium
```diff
- <DisplayText size="medium">Sales this year</DisplayText>
+ <Text variant="heading2xl">Sales this year</Text>
```
#### Large
```diff
- <DisplayText size="large">Sales this year</DisplayText>
+ <Text variant="heading3xl">Sales this year</Text>
```
#### Extra large
```diff
- <DisplayText size="extraLarge">Sales this year</DisplayText>
+ <Text variant="heading4xl">Sales this year</Text>
```
### Heading
```diff
- <Heading>Online store dashboard</Heading>
+ <Text variant="headingLg">Online store dashboard</Text>
```
### Subheading
```diff
- <Subheading>Accounts</Subheading>
+ <Text variant="headingSm">Accounts</Text>
```
### Caption
```diff
- <Caption>Received April 21, 2017</Caption>
+ <Text variant="bodySm">Received April 21, 2017</Text>
```
### TextStyle

#### Subdued
```diff
- <TextStyle variation="subdued">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="p" color="subdued">No supplier listed</Text>
```

#### Strong
```diff
- <TextStyle variation="strong">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="p" fontWeight="semibold" >No supplier listed</Text>
```
#### Positive
```diff
- <TextStyle variation="positive">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="p" color="success">No supplier listed</Text>
```

#### Negative
```diff
- <TextStyle variation="negative">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="p" color="critical">No supplier listed</Text>
```

#### Warning
```diff
- <TextStyle variation="warning">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="p" color="warning">No supplier listed</Text>
```

#### Code
```diff
- <TextStyle variation="code">No supplier listed</TextStyle>
+ <Text variant="bodyMd" as="p"><InlineCode>No supplier listed</InlineCode></Text>
```

### VisuallyHidden
```diff
- <VisuallyHidden>
-   <Heading>Title and description</Heading>
- </VisuallyHidden>
+ <Text visuallyHidden variant="bodySm" as="h2">Title and description</Text>
```
