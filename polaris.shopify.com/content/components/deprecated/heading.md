---
title: Heading
description: Headings are used as the titles of each major section of a page in the interface. For example, [card components](https://polaris.shopify.com/components/card) generally use headings as their title.
category: Deprecated
keywords:
  - titles
  - text
  - microcopy
  - conversational
  - typographic
  - card headings
  - card titles
  - section titles
  - section headings
  - heading text
  - heading font
status:
  value: Deprecated
  message: This component is no longer supported. Please use the Text component instead.
---

## Mapping to the Text component

```diff
- <Heading>Online store dashboard</Heading>
+ <Text variant="headingMd" as="h2">Online store dashboard</Text>
```

---

## Best practices

Headings should:

- Clearly describe the section of interface they refer to
- Highlight the most important concept or piece of information merchants need to know
- Sit at the top of the section of interface they’re referring to

---

## Content guidelines

Headings should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).

---

## Related components

- To break up a section with a heading into sub-sections, [use the subheading component](https://polaris.shopify.com/components/subheading)

---

## Accessibility

A clear and consistent heading structure helps merchants who have difficulty with reading or language. It also helps screen reader users to navigate the page using keystrokes that are custom to their screen reader.

Use the `element` prop to determine the specific HTML element that’s output for the heading. The component defaults to a level 2 heading (`<h2>`). Use a different value for the `element` prop if a different heading fits the context better.

Learn more about writing helpful [headings and subheadings](https://polaris.shopify.com/content/actionable-language#headings-and-subheadings).

<!-- dodont -->

#### Do

Use headings to support the hierarchy and structure of the page.

#### Don’t

Use headings for style alone.

<!-- end -->
