---
name: Typography
category: Titles and text
platforms:
  - android
  - ios
  - web
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
  - android
  - ios
---

# Typography

Generic typography component encapsulating an opinionated collection of design token groups.

---

## Examples

### Typography default

Render the body variant by default with a paragraph tag.

```jsx
<Typography>The quick brown fox jumps over the lazy dog</Typography>
```

### Typography heading

Setting a variant will apply a collection of design tokens and a predefined HTML element.

```jsx
<Typography variant="heading">
  The quick brown fox jumps over the lazy dog
</Typography>
```

### Typography polymorphic

Use the `as` prop to override the default HTML element associated with each variant.

```jsx
<Typography variant="heading" as="span">
  The quick brown fox jumps over the lazy dog
</Typography>
```

### Typography noWrap

Truncate text with an ellipsis.

```jsx
<Typography noWrap>The quick brown fox jumps over the lazy dog</Typography>
```

### Typography color

Convenience prop for applying Polaris design tokens.

```jsx
<Typography color="action-primary">
  The quick brown fox jumps over the lazy dog
</Typography>
```
