---
name: Tooltip
tags:
  - info
  - help
  - popover
category: Overlays
---

# Tooltip
Tooltips are floating labels that briefly explain the function of a user
interface element. They can be triggered when merchants hover, focus, tap, or
click.

**Problem**

Merchants who use Shopify represent a range of levels of experience and
familiarity with using software. It can be challenging to build
experiences that are clear to all merchants, all the time.

**Solution**

Tooltips can provide additional explanations to merchants who need more
information or help without cluttering up the interface.

> **Not what you’re looking for?**
>* To make helpful content more visible to merchants, use the help text portions of form components such as [text fields](/components/forms/text-field), [footer help](/components/titles-and-text/footer-help), or [an inline link to help](/components/navigations/link)

---

## Best practices

Tooltips should:

* Provide useful, additional information or clarification.
* Succinctly describe or expand on the element they point to.
* Be provided for icon-only buttons or a button with an associated keyboard
shortcut.
* Not be used to communicate critical information, including errors in forms or
other interaction feedback.
* Not contain any links or buttons.
* Be used sparingly. If you’re building something that requires a lot of
tooltips, work on clarifying the design and the language in the experience.

---

## Content guidelines

### Basic tooltips

Tooltips should:

* Be written in sentence case
* Be concise and scannable
* Not be used to communicate error messages or important account information

<!-- usageblock -->
#### Do
Post reach is the number of people who have seen your post in their News Feed.

#### Don’t
To continue using Shopify, this amount must be paid immediately.
<!-- end -->

| Prop | Type | Description |
| ---- | ---- | ----------- |
| children | React.ReactNode | The children that activate the tooltip |
| content | string | The content to display within the tooltip |
| light | boolean | Display tooltip with a light background |
| active | boolean | Toggle whether the tooltip is visible |
| preferredPosition | enum['above', 'below'] | The direction the tooltip tries to display |
| activatorWrapper | string | The element type to wrap the activator in |

## Examples

### Default tooltip

Use only when necessary to provide an explanation for an interface element.

```jsx
<Tooltip content="This order has shipping labels.">
  <Link>Order #1001</Link>
</Tooltip>
```
