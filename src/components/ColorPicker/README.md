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

## Content guidelines

There are no customizable content elements in the color picker component.

---

## Examples

### Default color picker

Use when merchants need to select a color to make the selection a visual
task rather than a technical one.

```jsx
class ColorPickerExample extends React.Component {
  state = {
    color: {
      hue: 120,
      brightness: 1,
      saturation: 1,
    },
  };

  render() {
    const {color} = this.state;

    return <ColorPicker onChange={this.handleChange} color={color} />;
  }

  handleChange = (color) => {
    this.setState({color});
  };
}
```

### Colorpicker with transparent value

Use when attached to a visual builder to allow the designated object to have a
transparent background that allows underlying objects to show through.

```jsx
class ColorPickerExample extends React.Component {
  state = {
    color: {
      hue: 300,
      brightness: 1,
      saturation: 0.7,
      alpha: 0.7,
    },
  };

  render() {
    const {color} = this.state;

    return (
      <ColorPicker onChange={this.handleChange} color={color} allowAlpha />
    );
  }

  handleChange = (color) => {
    this.setState({color});
  };
}
```
