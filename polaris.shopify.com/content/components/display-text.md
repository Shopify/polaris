---
title: Display text
description: Display styles make a bold visual statement. Use them to create impact when the main goal is visual storytelling. For example, use display text to convince or reassure merchants such as in marketing content or to capture attention during onboarding.
category: Titles and text
keywords:
  - DisplayText
  - announcement text
  - greeting text
  - marketing text
  - title text
  - biggest text
  - bigger text
  - big text
  - large text
  - larger text
  - largest text
  - strong text
  - bold text
  - bold statements
  - extra large display text
  - medium and large display text
  - small display text
  - visual story telling
  - visual storytelling
  - visual statements
status:
  value: Deprecated
  message: This component is no longer supported. Please use the Text component instead.
---

## Mapping to the Text component

### Small

```diff
- <DisplayText size="small">Sales this year</DisplayText>
+ <Text variant="headingLg" as="p">Sales this year</Text>
```

### Medium

```diff
- <DisplayText size="medium">Sales this year</DisplayText>
+ <Text variant="headingXl" as="p">Sales this year</Text>
```

### Large

```diff
- <DisplayText size="large">Sales this year</DisplayText>
+ <Text variant="heading2xl" as="p">Sales this year</Text>
```

### Extra large

```diff
- <DisplayText size="extraLarge">Sales this year</DisplayText>
+ <Text variant="heading4xl" as="p">Sales this year</Text>
```

---

## Best practices

- Use when the primary goal of the page is communication rather than interaction.
- Use larger display text sizes when a page is focused around a single message. In these cases it may be paired with an illustration.
- Use smaller display text to pair with larger text, or alone as part of more complex data displays such as dashboards.

---

## Content guidelines

### Display text

Display text should be:

- Benefits-driven and focused on information that is most important to merchants
- Concise and scannable:
  - Use simple, clear language that can be read at a glance
  - Keep display text content to a short sentence that’s just a few words in length
  - Avoid using punctuation such as periods, commas, or semicolons
  - Avoid using exclamation marks—display text already makes enough of a statement without an exclamation mark
  - Write in sentence case

---

## Accessibility

Although display text creates an interesting visual experience, it doesn’t replace the semantic structure provided by HTML headings.

By default, the display text component outputs text in an HTML paragraph (`<p>`). If a heading tag is needed for display text, use the `element` prop to set the heading level.

<!-- dodont -->

#### Do

Use display text to create visual interest along with a meaningful heading structure.

#### Don’t

Use display text in place of standard headings. Use the [heading component](https://polaris.shopify.com/components/heading) and [subheading component](https://polaris.shopify.com/components/subheading) to provide structure.

<!-- end -->
