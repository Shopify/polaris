---
name: Heading
category: Titles and text
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
---

# Heading

Headings are used as the titles of each major section of a page in the interface. For example, [card components](https://polaris.shopify.com/components/card) generally use headings as their title.

---

## Best practices

Headings should:

- Clearly describe the section of interface they refer to
- Highlight the most important concept or piece of information merchants need to know
- Sit at the top of the section of interface they’re referring to

---

## Content guidelines

Headings should follow the content guidelines for [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

---

## Examples

### Default

Use for the title of each top-level page section.

```jsx
<Heading>Online store dashboard</Heading>
```

---

## Related components

- To break up a section with a heading into sub-sections, [use the subheading component](https://polaris.shopify.com/components/subheading)

---

## Accessibility

A clear and consistent heading structure helps merchants who have difficulty with reading or language. It also helps screen reader users to navigate the page using keystrokes that are custom to their screen reader.

Use the `element` prop to determine the specific HTML element that’s output for the heading. The component defaults to a level 2 heading (`<h2>`). Use a different value for the `element` prop if a different heading fits the context better.

Learn more about writing helpful [headings and subheadings](https://polaris.shopify.com/content/actionable-language#section-headings-and-subheadings).

<!-- dodont -->

#### Do

Use headings to support the hierarchy and structure of the page.

#### Don’t

Use headings for style alone.

<!-- end -->
