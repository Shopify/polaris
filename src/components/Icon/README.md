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
