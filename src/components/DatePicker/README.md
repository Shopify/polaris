---
name: Date picker
category: Forms
keywords:
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

## Purpose

Put the merchant first by identifying the problem they face and the component that helps them solve it.

### Problem

Merchants need to choose dates in a way that’s visual and avoids confusion
caused by localization issues.

### Solution

A consistent date picker lets merchants quickly select a date or range of
dates.

---

## Best practices

Date pickers should:

* Use smart defaults and highlight common selections (e.g. Today)
* Close after a single date is selected unless a start and end date is required
* Set the start date on first click and the end date on second click if a range
is required
* Not be used to enter a date that is many years in the future or the past

---

## Content guidelines
There are no content elements that are specific to the date picker.
Learn how to [format dates and numbers](/content/grammar-and-mechanics#dates-and-numbers) in your interface content.

| Prop | Type | Description |
| ---- | ---- | ----------- |
| selected | Date or Range | The selected date or range of dates |
| month | Months | The month to show |
| year | Year | The year to show |
| disableDatesBefore | Date | Disable selecting dates before this. |
| disableDatesAfter | Date |  Disable selecting dates after this.|
| multiMonth | boolean | The selection can span multiple months |
| onChange | function(date: Range) | Callback when date is selected. |
| onMonthChange | function(month: Months, year: Year) | Callback when month is changed. |

## Examples

### Default date picker

Use when merchants need to select a date range close to today (today is the default starting position for the date picker).

```jsx
<DatePicker
  month={4}
  year={2017}
/>
```
