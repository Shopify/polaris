---
name: Icon
category: Images and icons
keywords:
  - iconography
  - visual indicator
  - svg
  - icon background
  - icon backdrop
  - accessible icons
  - icon alternative text
  - alt text
  - alternative text
  - accessibility
  - wayfinding
  - alert
---

# Icon

Icons are used to visually communicate core parts of the product and available actions. They can act as wayfinding tools to help merchants more easily understand where they are in the product, and common interaction patterns that are available.

---

## Best practices

- Icons should be accessible: remember that people with limited vision may not be able to see icons. Review our [alternative text guidelines](/content/alternative-text) to make sure your use of icon works for all merchants.

---

## Content guidelines

### Alternative text (alt text)

Screen readers read alt text for icons on hover. Use alt text (`accessibilityLabel` prop or `aria-label` attribute) to communicate icon meaning.

Alt text should be written in [plain language](/content/grammar-and-mechanics#plain-language):

- Keep it short by excluding unnecessary words
- Write in the [active voice](/content/grammar-and-mechanics#active-and-passive-voice)
- Use words and language that our merchants use (avoid technical jargon)

---

## Examples

### Default icon

Use to visually communicate core parts of the product and available actions.

```jsx
<Icon source="circlePlus" />
```

### User provided icon

Use to mark an icon as to render it in an img tag.

```jsx
<Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
```
