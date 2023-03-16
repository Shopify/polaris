---
title: Single date
slug: single-date
hideFromNav: true
---

This enables merchants to type a specific date or pick it from a calendar.

<div as="HowItHelps">

## How it helps merchants

![Date text input and a single-month calendar](/images/patterns/single-list-cover-image.png)

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

This pattern uses the [`Card`](/components/layout-and-structure/card), [`DatePicker`](/components/selection-and-input/date-picker), [`Popover`](/components/overlays/popover) and [`TextField`](/components/selection-and-input/text-field) components.

<!-- prettier-ignore -->
```javascript {"type":"sandboxContext","for":"example"}
{(____CODE____)()}
```

<!-- prettier-ignore -->
```javascript {"type":"previewContext","for":"example"}
{(____CODE____)()}
```

```javascript {"type":"livePreview","id":"example"}
function DatePickerExample() {
  function nodeContainsDescendant(rootNode, descendant) {
    if (rootNode === descendant) {
      return true;
    }
    let parent = descendant.parentNode;
    while (parent != null) {
      if (parent === rootNode) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [{month, year}, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });
  const formattedValue = selectedDate.toISOString().slice(0, 10);
  const datePickerRef = useRef(null);
  function isNodeWithinPopover(node) {
    return datePickerRef?.current
      ? nodeContainsDescendant(datePickerRef.current, node)
      : false;
  }
  function handleInputValueChange() {
    console.log('handleInputValueChange');
  }
  function handleOnClose({relatedTarget}) {
    setVisible(false);
  }
  function handleMonthChange(month, year) {
    setDate({month, year});
  }
  function handleDateSelection({end: newSelectedDate}) {
    setSelectedDate(newSelectedDate);
    setVisible(false);
  }
  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    }
  }, [selectedDate]);
  return (
    <Stack align="center" gap="4">
      <Box minWidth="276px" padding={{xs: 2}}>
        <Popover
          active={visible}
          autofocusTarget="none"
          preferredAlignment="left"
          fullWidth
          preferInputActivator={false}
          preferredPosition="below"
          preventCloseOnChildOverlayClick
          onClose={handleOnClose}
          activator={
            <TextField
              role="combobox"
              label={'Start date'}
              prefix={<Icon source={CalendarMinor} />}
              value={formattedValue}
              onFocus={() => setVisible(true)}
              onChange={handleInputValueChange}
              autoComplete="off"
            />
          }
        >
          <Card ref={datePickerRef}>
            <DatePicker
              month={month}
              year={year}
              selected={selectedDate}
              onMonthChange={handleMonthChange}
              onChange={handleDateSelection}
            />
          </Card>
        </Popover>
      </Box>
    </Stack>
  );
}
```

</div>
<div as="UsefulToKnow">

### Useful to know

- <span>Labels need to simply depict the task at hand. Whether that be a start date, end date, start time etc.</span> ![Date input labeled “Expiry date”](/images/patterns/single-list-usage-1.png)
- <span>This pattern can be duplicated to allow users to add an end date or time.</span> ![“Active dates” section with “start date” and “end date” inputs, toggled on with a “Set end date” checkbox](/images/patterns/single-list-usage-2.png)

</div>
