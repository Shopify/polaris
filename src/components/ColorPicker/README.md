---
name: Color picker
category: Forms
keywords:
  - ColorPicker
  - HuePicker
  - AlphaPicker
  - Slidable
  - Choose color
  - Select color
  - Pick color
  - color selector with transparent value
  - colorpicker with transparent value
  - alpha value picker
  - alpha value selector
---

# Color picker

The color picker is used to let merchants select a color visually. For
example, merchants use the color picker to customize the accent color of the
email templates for their shop.

---

## Best practices

- Use the alpha slider if you want to allow merchants to be able to select a
  transparent color

---

## Examples

### Default color picker

Use when merchants need to select a color to make the selection a visual
task rather than a technical one.

```jsx
function ColorPickerExample() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  const handleChange = useCallback(setColor, []);

  return <ColorPicker onChange={handleChange} color={color} />;
}
```

### Colorpicker with transparent value

Use when attached to a visual builder to allow the designated object to have a
transparent background that allows underlying objects to show through.

```jsx
function ColorPickerWithTransparentValueExample() {
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });

  const handleChange = useCallback(setColor, []);

  return <ColorPicker onChange={handleChange} color={color} allowAlpha />;
}
```
