---
title: Single date
slug: single-date
---

This enables merchants to type a specific date or pick it from a calendar.

<div as="HowItHelps">

## How it helps merchants

![A labeled diagram of an active input field displaying a calendar beneath it. The input field is labeled "1". The calendar is labeled "2".](/images/patterns/single-list-cover-image.png)

1. The text input gives merchants the option to use the keyboard to enter a date.
2. A single month calendar allows merchants to select a date while seeing its relationship to other days.

<div as="DefinitionTable">

### Use when merchants need to:

**Schedule an event on a specific day**
: Some examples of this are setting a visibility date for a new online store page, or an estimated arrival date for a shipment. Found in: Product / transfers

**Input memorable dates to forms**
: An example of this is entering a birthdate.

</div>
</div>
<div as="Usage">

## Using this pattern

This pattern uses the [`Date Picker`](/components/date-picker), and [`TextField`](/components/text-field) components.

```javascript {"context":"<Box style={{margin: '0 auto', maxWidth: '300px'}}>{(function Wrapper(){____CODE____})()}</Box>"}
const [{month, year}, setDate] = useState({month: 1, year: 2018});
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
```

</div>
<div as="UsefulToKnow">

### Useful to know

|                                                                                                        |                                               |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Labels need to simply depict the task at hand. Whether that be a start date, end date, start time etc. | ![](/images/patterns/single-list-usage-1.png) |
| This pattern can be duplicated to allow users to add an end date or time.                              | ![](/images/patterns/single-list-usage-2.png) |

</div>
