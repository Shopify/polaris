---
name: Range slider
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - RangeSlider
  - input
  - range
  - slider
  - percent
  - number
  - range form
---

# Range slider

A range slider is an input field that merchants can use to select a numeric value within a given range (minimum and maximum values).

---

## Best practices

Range sliders should:

- Always be used with a label, even if that label is `hidden`.
- When a label is visible, it should clearly communicate the purpose of the range input and its values (min, max, step, value)
- Be labeled as “Optional” when you need to request input that’s not required
- Validate input as soon as merchants have finished interacting with a field (but not before)
- Always be used with two text field components when range slider has dual thumbs, to provide accessible alternatives to both the lower and upper thumbs

---

## Content guidelines

### Range label

A label is a short description of the requested input. Labels are not instructional text but they should be meaningful and clearly indicate what is expected. Labels should be:

- Placed above the form field
- Short and succinct (1–3 words)
- Written in sentence case (the first word capitalized, the rest lowercase)

<!-- usagelist -->

#### Do

- Saturation percentage
- Banner width

#### Don’t

- What is the saturation value?
- The banner width is:

<!-- end -->

### Designating optional fields

Try to only ask for information that’s required. If you need to ask merchants
to provide optional information, mark the field optional by placing the text “(optional)” at the end of the field’s label. Don’t mark required fields with asterisks.

<!-- usagelist -->

#### Do

- Banner width (optional)

#### Don’t

- Banner width

<!-- end -->

### Help text

Help text provides extra guidance or instruction to people filling out a form field. It can also be used to clarify how the information will be used. As with all form content, help text should be succinct and easy to read.

<!-- usagelist -->

#### Do

- Video duration is calculated in seconds

#### Don’t

- Example: 134 seconds

<!-- end -->

### Validation error messages

Error messages should:

- Clearly explain what went wrong and how to fix it
- Be short and concise, no more than a single sentence
- Use [passive voice](https://polaris.shopify.com/content/grammar-and-mechanics) so merchants don’t feel like they’re being blamed for the error

<!-- usagelist -->

#### Do

- Video duration is required

#### Don’t

- You didn’t enter a duration

<!-- end -->

---

## Examples

### Default range slider

Use when a single value between `0 and 100` needs to be selected.

```jsx
function RangeSliderExample() {
  const [rangeValue, setRangeValue] = useState(32);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  return (
    <Card sectioned title="Background color">
      <RangeSlider
        label="Opacity percentage"
        value={rangeValue}
        onChange={handleRangeSliderChange}
        output
      />
    </Card>
  );
}
```

<!-- content-for: android -->

![Range slider for Android](/public_images/components/RangeSlider/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Range slider for iOS](/public_images/components/RangeSlider/ios/default@2x.png)

<!-- /content-for -->

### Min and max range control

<!-- example-for: web -->

Use when a single value needs to be selected from a number range with a specific minimum and maximum.

```jsx
function RangeSliderWithPreciseRangeControlExample() {
  const [rangeValue, setRangeValue] = useState(0);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  return (
    <Card sectioned title="Navigation branding">
      <RangeSlider
        output
        label="Logo offset"
        min={-20}
        max={20}
        value={rangeValue}
        onChange={handleRangeSliderChange}
      />
    </Card>
  );
}
```

### Step incremented range control

<!-- example-for: web -->

Use when a single value of a specific increment needs to be selected from a range of numbers.

```jsx
function RangeSliderWithPreciseRangeControlExample() {
  const [rangeValue, setRangeValue] = useState(4);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  return (
    <Card sectioned title="Navigation branding">
      <RangeSlider
        output
        label="Logo offset"
        min={-20}
        max={20}
        step={4}
        value={rangeValue}
        onChange={handleRangeSliderChange}
      />
    </Card>
  );
}
```

### Prefix and suffix elements

<!-- example-for: web -->

Use when the start or end of the range input benefits from additional content.

The height of the range slider component varies based on the presence or absence of props like `label` and `helpText`. Setting a React element on the `prefix` and `suffix` props is supported to enable control of spacing and alignment.

```jsx
function RangeSliderWithPrefixAndSuffixExample() {
  const [rangeValue, setRangeValue] = useState(100);

  const handleRangeSliderChange = useCallback(
    (value) => setRangeValue(value),
    [],
  );

  const suffixStyles = {
    minWidth: '24px',
    textAlign: 'right',
  };

  return (
    <Card sectioned title="Text color">
      <RangeSlider
        output
        label="Hue color mix"
        min={0}
        max={360}
        value={rangeValue}
        onChange={handleRangeSliderChange}
        prefix={<p>Hue</p>}
        suffix={<p style={suffixStyles}>{rangeValue}</p>}
      />
    </Card>
  );
}
```

### Dual thumb range slider

<!-- example-for: web -->

Use when two values need to be selected from a range of numbers.

```jsx
function DualThumbRangeSliderExample() {
  const initialValue = [900, 1000];
  const prefix = '$';
  const min = 0;
  const max = 2000;
  const step = 10;

  const [intermediateTextFieldValue, setIntermediateTextFieldValue] = useState(
    initialValue,
  );
  const [rangeValue, setRangeValue] = useState(initialValue);

  const handleRangeSliderChange = useCallback((value) => {
    setRangeValue(value);
    setIntermediateTextFieldValue(value);
  }, []);

  const handleLowerTextFieldChange = useCallback(
    (value) => {
      const upperValue = rangeValue[1];
      setIntermediateTextFieldValue([parseInt(value, 10), upperValue]);
    },
    [rangeValue],
  );

  const handleUpperTextFieldChange = useCallback(
    (value) => {
      const lowerValue = rangeValue[0];
      setIntermediateTextFieldValue([lowerValue, parseInt(value, 10)]);
    },
    [rangeValue],
  );

  const handleLowerTextFieldBlur = useCallback(() => {
    const upperValue = rangeValue[1];
    const value = intermediateTextFieldValue[0];

    setRangeValue([parseInt(value, 10), upperValue]);
  }, [intermediateTextFieldValue, rangeValue]);

  const handleUpperTextFieldBlur = useCallback(() => {
    const lowerValue = rangeValue[0];
    const value = intermediateTextFieldValue[1];

    setRangeValue([lowerValue, parseInt(value, 10)]);
  }, [intermediateTextFieldValue, rangeValue]);

  const handleEnterKeyPress = useCallback(
    (event) => {
      const newValue = intermediateTextFieldValue;
      const oldValue = rangeValue;

      if (event.keyCode === Key.Enter && newValue !== oldValue) {
        setRangeValue(newValue);
      }
    },
    [intermediateTextFieldValue, rangeValue],
  );

  const lowerTextFieldValue =
    intermediateTextFieldValue[0] === rangeValue[0]
      ? rangeValue[0]
      : intermediateTextFieldValue[0];

  const upperTextFieldValue =
    intermediateTextFieldValue[1] === rangeValue[1]
      ? rangeValue[1]
      : intermediateTextFieldValue[1];

  return (
    <Card sectioned title="Minimum requirements">
      <div onKeyDown={handleEnterKeyPress}>
        <RangeSlider
          output
          label="Money spent is between"
          value={rangeValue}
          prefix={prefix}
          min={min}
          max={max}
          step={step}
          onChange={handleRangeSliderChange}
        />
        <Stack distribution="equalSpacing" spacing="extraLoose">
          <TextField
            label="Min money spent"
            type="number"
            value={`${lowerTextFieldValue}`}
            prefix={prefix}
            min={min}
            max={max}
            step={step}
            onChange={handleLowerTextFieldChange}
            onBlur={handleLowerTextFieldBlur}
          />
          <TextField
            label="Max money spent"
            type="number"
            value={`${upperTextFieldValue}`}
            prefix={prefix}
            min={min}
            max={max}
            step={step}
            onChange={handleUpperTextFieldChange}
            onBlur={handleUpperTextFieldBlur}
          />
        </Stack>
      </div>
    </Card>
  );
}
```

---

## Related components

- To collect a number value as a text input, [use the text field component](https://polaris.shopify.com/components/forms/text-field)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

The range slider provides a large click and tap target for the slider thumbs. Merchants can also tap or click on the slider track to move the closest slider thumb.

### Single-thumb slider

The default range slider component uses the [ARIA 1.1 slider pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#slider) to build upon the default HTML `<input type="range">`. The required `label` prop provides a label for the field that’s conveyed to assistive technologies when it receives focus. When the slider is used, the `value` prop should update visually and programmatically to reflect the current value.

To consistently provide the current value to assistive technologies, use the `min` and `max` props to provide the minimum and maximum values for the slider.

### Dual-thumb slider

The dual-thumb range slider component uses the [ARIA 1.1 slider (multi-thumb) pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#slidertwothumb). However, the pattern isn’t consistently supported by screen readers, especially on mobile devices. Because of this, it’s best to pair the dual-thumb slider with a set of text fields for each value, or to provide another accessible method for entering information.

### Keyboard

- To move focus to a slider thumb, press the <kbd>tab</kbd> key to move forward and or <kbd>shift</kbd> + <kbd>tab</kbd> to move backward
- When a thumb has focus, use the up and down or left and right arrow keys to move the thumb and update the associated value.

<!-- /content-for -->
