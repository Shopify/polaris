---
name: Display text
tags:
  - heading
  - typography
category: Titles and text
---

# Display text

Display styles make a bold visual statement. Use them to create impact when the
main goal is visual storytelling. For example, use display text to convince or
reassure a merchant such as in marketing content or to capture attention during onboarding.

---

## Purpose

Think about the merchant problem this component solves when you’re using it:

### Problem

When all the typography on Shopify is the same size, it can be hard to tell a
story visually.

### Solution

Display text can be used thoughtfully to create an impact and make a bold
statement.

---

## Best Practices

- Use when the primary goal of the page is communication rather than
interaction.
- Use larger display text sizes when a page is focused around a single message.
In these cases it may be paired with an illustration.
- Use smaller display text to pair with larger text, or alone as part of more
complex data displays such as dashboards.

---

## Content guidelines

### Display text

* Be benefits-driven and focused on information that is most important to
merchants
* Concise and scannable:
  * Use simple, clear language that can be read at a glance
  * Keep display text content to a short sentence that’s just a few words in
  length
  * Avoid using punctuation such as periods, commas, or semicolons
  * Avoid using exclamation marks—display text already makes enough of a
  statement without an exclamation mark
  * Written in sentence case


| Prop | Type | Description |
| ---- | ---- | ----------- |
| element | enum['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] | Name of element to use for text |
| size | enum['small', 'medium', 'large', 'extraLarge'] | Size of the text |
| children | string or React.ReactNode | Content to display |

## Examples

### Extra large

Use this size sparingly and never multiple times on the same page.

```jsx
<DisplayText size="extraLarge">Good evening, Dominic.</DisplayText>
```

### Medium and large

Use as part of complex data displays to highlight key numbers, or to harmonize with other display text.

```jsx
<DisplayText size="medium">Good evening, Dominic.</DisplayText>
```

### Small

Use for text that would otherwise use body text, but that needs to scale with other display text.

```jsx
<DisplayText size="small">Good evening, Dominic.</DisplayText>
```
