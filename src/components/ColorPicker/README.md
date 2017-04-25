---
name: Color picker
tags:
  - Choose color
  - Select color
  - Pick color
category: Forms
---

# Color picker
The color picker is used to let the merchant select a color visually. For
example, merchants use the color picker to customize the accent color of the
email templates for their shop.

**Problem**

Merchants occasionally need to select a color and they need to be able to see
a sample of available colors to make the best decision.

**Solution:**

The color picker component displays swatches of colors to make the selection
process visual for merchants.

---

## Best practices

* Use the alpha slider if you want to allow merchants to be able to select a
transparent color

---

## Content guidelines
There are no customizable content elements in the color picker component.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| color | Color | The currently selected color |
| allowAlpha | boolean | Allow user to select an alpha value |
| onChange | function(color: HSBAColor) | Callback when color is selected |

## Examples

### Default color picker

Use when the merchant needs to select a color to make the selection a visual
task rather than a technical one.

```jsx
<ColorPicker
  color={{
    hue: 120,
    brightness: 1,
    saturation: 1,
  }}
/>
```

### Colorpicker with transparent value

Use when attached to a visual builder to allow the designated object to have a
transparent background that allows underlying objects to show through.

```jsx
<ColorPicker
  color={{
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7
  }}
  allowAlpha
/>
```
