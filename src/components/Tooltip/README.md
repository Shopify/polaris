---
name: Tooltip
category: Overlays
keywords:
  - info
  - help
  - popover
  - infotip
  - hint
  - small popover
  - hover
  - tap
---

# Tooltip

Tooltips are floating labels that briefly explain the function of a user
interface element. They can be triggered when merchants hover, focus, tap, or
click.

---

## Best practices

Tooltips should:

- Provide useful, additional information or clarification.
- Succinctly describe or expand on the element they point to.
- Be provided for icon-only buttons or a button with an associated keyboard
  shortcut.
- Not be used to communicate critical information, including errors in forms or
  other interaction feedback.
- Not contain any links or buttons.
- Be used sparingly. If you’re building something that requires a lot of
  tooltips, work on clarifying the design and the language in the experience.

---

## Content guidelines

### Basic tooltips

Tooltips should:

- Be written in sentence case
- Be concise and scannable
- Not be used to communicate error messages or important account information

<!-- usageblock -->

#### Do

Post reach is the number of people who have seen your post in their News Feed.

#### Don’t

To continue using Shopify, this amount must be paid immediately.

<!-- end -->

---

## Examples

### Default tooltip

Use only when necessary to provide an explanation for an interface element.

```jsx
<div style={{padding: '75px 0'}}>
  <Tooltip active content="This order has shipping labels.">
    <Link>Order #1001</Link>
  </Tooltip>
</div>
```

### Light tooltip

A light tooltip draws less attention than the default tooltip. Use only when necessary to provide an explanation for an interface element with less emphasis.

```jsx
<div style={{padding: '75px 0'}}>
  <Tooltip light active content="This order has shipping labels.">
    <Link>Order #1001</Link>
  </Tooltip>
</div>
```

### Tooltip visible only with child interaction

Use when the tooltip overlays interactive elements when active, for example a form input. The `dismissOnMouseOut` prop prevents the tooltip from remaining active when mouse hover or focus leaves its `children` and enters the tooltip's content.

```jsx
<div style={{width: '200px'}}>
  <ButtonGroup segmented fullWidth>
    <Tooltip content="Bold" dismissOnMouseOut>
      <Button>B</Button>
    </Tooltip>
    <Tooltip content="Italic" dismissOnMouseOut>
      <Button>I</Button>
    </Tooltip>
    <Tooltip content="Underline" dismissOnMouseOut>
      <Button>U</Button>
    </Tooltip>
    <Tooltip content="Strikethrough" dismissOnMouseOut>
      <Button>S</Button>
    </Tooltip>
  </ButtonGroup>
  <TextField label="Product title" labelHidden multiline />
</div>
```

---

## Related components

- To make helpful content more visible to merchants, use the help text portions of form components such as [text fields](https://polaris.shopify.com/components/forms/text-field), [footer help](https://polaris.shopify.com/components/titles-and-text/footer-help), or [an inline link to help](https://polaris.shopify.com/components/navigation/link)
