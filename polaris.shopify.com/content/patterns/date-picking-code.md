## Using the date range picker

Install:

```bash
yarn add @shopify-ui/date-range-picker
```

Basic usage:

// Could be a live render code example.

```tsx
<DateRangePicker />
```

### Providing multiple ways to select a date range

Providing multiple ways to select a date range gives merchants full flexibility. The list provides quick access to common options, the text input makes it easier to set large custom ranges, and the calendar is an intuitive way to set a more narrow scope. All of these are provided by default by the `DateRangePicker` component.

Here's how you might configure this.

## Displaying two months makes it easier for merchants to select date ranges that span across both.

This is provided by default by the `DateRangePicker` component, however for smaller breakpoints, one calendar is provided in order to maximise the amount of screen real-estate and minimise UI clutter for the merchant. We strongly recommend this solution to ensure we cater to all merchant screen sizes, however should you need to customise this behaviour for your case, you can do so with the `multiMonth` prop, which is reflected onto the underlying `DatePicker` component.

```tsx
<DateRangePicker multiMonth={mdUp}>
```

## Architectural decisions (secondary audience) // optional

- This could match 1:1 to principles, but generally focuses on why a technical decision has been made in service of a principle.
- This might be similar to the useful to know section in terms of brevity

For example:

- DateRangePicker uses `@shopify/dates` under the hood to deal with all date manipulation logic. We use this library as it contains a lot of useful abstractions and Shopify opinions on top of the default Javascript Date object that would otherwise be a hassle to write over and over, for example date formatting logic that you see on the date input:

// Live render

```tsx
<DateRangePicker isOpen />
```
