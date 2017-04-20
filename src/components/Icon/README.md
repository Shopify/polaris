---
name: Icon
tags:
  - visual
  - alt text
  - alternative text
  - accessibility
  - wayfinding
  - alert
  - find an icon
category: Images and icons
---

# Icon

Icons are used to visually communicate core parts of the product and available actions. They can act as wayfinding tools to help merchants more easily understand where they are in the product, and common interaction patterns that are available.

**Problem**

Merchants are pressed for time. They need visual ways to identify what’s happening in Shopify.

**Solution**

Icons can alert merchants to changes in status and make the interface easier to scan.

---

## Best practices

* Icons should be accessible: remember that people with people with limited vision may not be able to see icons. Review our [alternative text guidelines](/content/alternative-text) to make sure your use of icon works for all merchants.

---

## Content guidelines

### Alternative text (alt text)

Screen readers read alt text for icons on hover. Use alt text (`accessibilityLabel` prop or `aria-label` attribute) to communicate icon meaning.

Alt text should be written in [plain language](/content/grammar-and-mechanics#plain-language):
- Keep it short by excluding unnecessary words
- Write in the [active voice](/content/grammar-and-mechanics#active-and-passive-voice)
- Use words and language that our merchants use (avoid technical jargon)

| Properties | Type | Description |
| ---------- | ---- | ----------- |
| source | SVGSource | The SVG contents to display in the icon |
| color | Color | Sets the color for the SVG fill |
| backdrop | boolean | Show a backdrop behind the icon |
| accessibilityLabel | string | Descriptive text to be read to screenreaders |

## Examples

### Default icon

Use to visually communicate core parts of the product and available actions.

```jsx
<Icon source="notes" color="tealDark" backdrop />
```
