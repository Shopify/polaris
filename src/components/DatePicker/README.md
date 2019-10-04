---
name: Date picker
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - DatePicker
  - month
  - day
  - year
  - weekday
  - choose date
  - pick date
  - pick time
  - date picker
  - calendar
  - date selector
  - date range picker
  - date range selector
---

# Date picker

Date pickers let merchants choose dates from a visual calendar that’s
consistently applied wherever dates need to be selected across Shopify.

---

## Best practices

Date pickers should:

- Use smart defaults and highlight common selections
- Close after a single date is selected unless a range with a start and end date is required
- Set the start date on first click or tap and the end date on second click or tap if a range
  is required
- Not be used to enter a date that is many years in the future or the past
- Follow [date format guidelines](https://polaris.shopify.com/content/grammar-and-mechanics#section-dates-numbers-and-addresses)

---

## Examples

### Default date picker

Use when merchants need to select a date range close to today (today is the default starting position for the date picker).

```jsx
function DatePickerExample() {
  const [{month, year}, setDate] = useState({
    month: 1,
    year: 2018,
  });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
    />
  );
}
```

<!-- content-for: android -->

![Date picker on Android](/public_images/components/DatePicker/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Date picker on iOS](/public_images/components/DatePicker/ios/default@2x.png)

<!-- /content-for -->

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

Some users might find interacting with date pickers to be challenging. When you use the date picker component, always give users the option to enter the date using a text field component as well.

If you use the date picker within a [popover component](/components/overlays/popover), then use a button to trigger the popover instead of displaying the popover when the text input gets focus. This gives users more control over their experience.

### Keyboard support

- Press the <kbd>tab</kbd> key to move forward and <kbd>shift</kbd> + <kbd>tab</kbd> to move backward through the previous button, next button, and the calendar
- When focus is in the calendar, move keyboard focus between the dates using the arrow keys
- To select a date that has focus, press the <kbd>enter</kbd>/<kbd>return</kbd> key

<!-- /content-for -->
