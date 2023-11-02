---
title: Text
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
  - fileName: text-tone.tsx
    title: Tone
    description: >-
      Use to set text tone (color).
  - fileName: text-inheritance.tsx
    title: Inheritance
    description: >-
      Inherits props from a parent Text container
  - fileName: text-decoration.tsx
    title: Decoration
    description: >-
      Use to define text decoration
previewImg: /images/components/typography/text.png
---

# {frontmatter.title}

<Lede>

Typography helps establish hierarchy and communicate important content by creating clear visual patterns.

</Lede>

<Examples />

<Props componentName={frontmatter.title} />

## Variant tokens

Each variant uses a predetermined combination of the [font tokens](/tokens/font) to set the font size and line height. Heading variants have a set font weight but can be overridden by using the `fontWeight` prop. Nested Text components will inherit properties from its parent Text container.

| Variant      | Font size token     | px value | rem value | Font line height token | Font weight token          | Reponsive |
| ------------ | ------------------- | -------- | --------- | ---------------------- | -------------------------- | --------- |
| `heading3xl` | `--p-font-size-900` | 36       | 2.25      | `--p-line-height-1200` | `--p-font-weight-bold`     | Yes       |
| `heading2xl` | `--p-font-size-750` | 30       | 1.875     | `--p-line-height-1000` | `--p-font-weight-bold`     | Yes       |
| `headingXl`  | `--p-font-size-600` | 24       | 1.5       | `--p-line-height-800`  | `--p-font-weight-bold`     | Yes       |
| `headingLg`  | `--p-font-size-500` | 20       | 1.25      | `--p-line-height-600`  | `--p-font-weight-semibold` | Yes       |
| `headingMd`  | `--p-font-size-350` | 14       | 0.875     | `--p-line-height-500`  | `--p-font-weight-semibold` | No        |
| `headingSm`  | `--p-font-size-325` | 13       | 0.8125    | `--p-line-height-500`  | `--p-font-weight-semibold` | No        |
| `bodyLg`     | `--p-font-size-350` | 14       | 0.875     | `--p-line-height-500`  | `--p-font-weight-regular`  | No        |
| `bodyMd`     | `--p-font-size-325` | 13       | 0.8125    | `--p-line-height-500`  | `--p-font-weight-regular`  | No        |
| `bodySm`     | `--p-font-size-300` | 12       | 0.75      | `--p-line-height-400`  | `--p-font-weight-regular`  | No        |
| `bodyXs`     | `--p-font-size-275` | 11       | 0.6875    | `--p-line-height-300`  | `--p-font-weight-regular`  | No        |

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
+ <Text variant="heading3xl" as="p">Sales this year</Text>
```

### Heading

```diff
- <Heading>Online store dashboard</Heading>
+ <Text variant="headingMd" as="h2">Online store dashboard</Text>
```

### Subheading

```diff
- <Subheading>Accounts</Subheading>
+ <Text variant="headingSm" as="h3">Accounts</Text>
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
+ <Text as="span" tone="subdued">No supplier listed</Text>
```

#### Strong

```diff
- <TextStyle variation="strong">No supplier listed</TextStyle>
+ <Text as="span" fontWeight="semibold" >No supplier listed</Text>
```

#### Positive

```diff
- <TextStyle variation="positive">No supplier listed</TextStyle>
+ <Text as="span" tone="success">No supplier listed</Text>
```

#### Negative

```diff
- <TextStyle variation="negative">No supplier listed</TextStyle>
+ <Text as="span" tone="critical">No supplier listed</Text>
```

#### Warning

```diff
- <TextStyle variation="warning">No supplier listed</TextStyle>
+ <Text as="span" tone="warning">No supplier listed</Text>
```

#### Code

```diff
- <TextStyle variation="code">No supplier listed</TextStyle>
+ <Text as="span"><InlineCode>No supplier listed</InlineCode></Text>
```

### VisuallyHidden

```diff
- <VisuallyHidden>
-   <Heading>Title and description</Heading>
- </VisuallyHidden>
+ <Text visuallyHidden as="h2">Title and description</Text>
```

---

## Best practices

### Headings

Headings use all the variants with `heading` in the name, such as `headingMd`. Headings should:

- Clearly describe the section of interface they refer to
- Highlight the most important concept or piece of information merchants need to know
- Sit at the top of the section of interface they’re referring to

### Captions

Captions use the `bodySm` Text variant.

- Use for secondary labels in graphs and charts
- May be used for timestamps in lists of content
- Don’t use this variant for other cases
- Don’t use this variant for text longer than a few words
- Don’t use this variant for aesthetic effect or to break from the standard text size

### Text styles

Text styles should be:

- Used when enhancing the text to help merchants understand its meaning
- Subdued if the text is less important than its surrounding text
- Warning if the text denotes something that needs attention, or that merchants need to take action on.
- Semibold for input fields, or for a row total in a price table
- Paired with symbols, like an arrow or dollar sign, when using success or critical styles

### Visually hidden

Visually hidden text should:

- Not be used if semantic markup can make content understandable to people using assistive technology
- Be used to provide extra context when semantic markup isn’t enough
- Be used on any content that is normally present but is being omitted
- Make sense in context when used with a screen reader

---
