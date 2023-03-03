---
title: Date range
slug: date-range
hideFromNav: true
---

This enables merchants to select a date range.

<div as="HowItHelps">

## How it helps merchants

![Date range picker with three numbered zones](/images/patterns/date-range-cover-image.png)

1. Providing multiple ways to select a date range gives merchants full flexibility. The list provides quick access to common options, the text input makes it easier to set large custom ranges, and the calendar is an intuitive way to set a more narrow scope.
2. Displaying two months makes it easier for merchants to select date ranges that span across both.
3. Selecting a date range may require multiple steps, so merchants prefer to explicitly confirm their selection, unlike the single date picker which closes on selection.

<div as="DefinitionTable">

### Use when merchants need to:

**Analyze trends and data**
: When a merchant needs to view their business metrics so that they can learn and make decisions, they use the date range picker to frame data to certain time periods. Found in: Analytics

**Schedule an event**
: When a merchant needs to schedule an event that spans multiple days, a date range picker is necessary.

</div>
</div>
<div as="Usage">

## Using this pattern

This pattern uses the [`AlphaStack`](/components/layout-and-structure/alpha-stack), [`Box`](/components/layout-and-structure/box), [`Button`](/components/actions/button), [`Columns`](/components/layout-and-structure/columns), [`DatePicker`](/components/selection-and-input/date-picker), [`Inline`](/components/layout-and-structure/inline), [`OptionList`](/components/lists/option-list), [`Popover`](/components/overlays/popover) and [`TextField`](/components/selection-and-input/text-field) components.

<!-- prettier-ignore -->
```javascript {"type":"previewContext","for":"example"}
<div style={{
  paddingLeft: "2rem",
  paddingRight: "2rem",
  paddingTop: "2rem",
  minHeight: "100vh",
  height: "500px",
}}>
{(____CODE____)()}
</div>
```

<!-- prettier-ignore -->
```javascript {"type":"sandboxContext","for":"example"}
{(____CODE____)()}
```

```javascript {"type":"livePreview","id":"example"}
function DateRangePicker() {
  const {mdDown, lgUp} = useBreakpoints();
  const shouldShowMultiMonth = lgUp;
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const yesterday = new Date(
    new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0),
  );
  const ranges = [
    {
      title: 'Today',
      alias: 'today',
      period: {
        since: today,
        until: today,
      },
    },
    {
      title: 'Yesterday',
      alias: 'yesterday',
      period: {
        since: yesterday,
        until: yesterday,
      },
    },
    {
      title: 'Last 7 days',
      alias: 'last7days',
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 7)).setHours(
            0,
            0,
            0,
            0,
          ),
        ),
        until: yesterday,
      },
    },
  ];
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeDateRange, setActiveDateRange] = useState(ranges[0]);
  const [inputValues, setInputValues] = useState({});
  const [{month, year}, setDate] = useState({
    month: activeDateRange.period.since.getMonth(),
    year: activeDateRange.period.since.getFullYear(),
  });
  const datePickerRef = useRef(null);
  const VALID_YYYY_MM_DD_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}$/;
  function isDate(date) {
    return !isNaN(new Date(date).getDate());
  }
  function isValidYearMonthDayDateString(date) {
    return VALID_YYYY_MM_DD_DATE_REGEX.test(date) && isDate(date);
  }
  function isValidDate(date) {
    return date.length === 10 && isValidYearMonthDayDateString(date);
  }
  function parseYearMonthDayDateString(input) {
    // Date-only strings (e.g. "1970-01-01") are treated as UTC, not local time
    // when using new Date()
    // We need to split year, month, day to pass into new Date() separately
    // to get a localized Date
    const [year, month, day] = input.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  function formatDateToYearMonthDayDateString(date) {
    const year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    if (month.length < 2) {
      month = String(month).padStart(2, '0');
    }
    if (day.length < 2) {
      day = String(day).padStart(2, '0');
    }
    return [year, month, day].join('-');
  }
  function formatDate(date) {
    return formatDateToYearMonthDayDateString(date);
  }
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
  function isNodeWithinPopover(node) {
    return datePickerRef?.current
      ? nodeContainsDescendant(datePickerRef.current, node)
      : false;
  }
  function handleStartInputValueChange(value) {
    setInputValues((prevState) => {
      return {...prevState, since: value};
    });
    console.log('handleStartInputValueChange, validDate', value);
    if (isValidDate(value)) {
      const newSince = parseYearMonthDayDateString(value);
      setActiveDateRange((prevState) => {
        const newPeriod =
          prevState.period && newSince <= prevState.period.until
            ? {since: newSince, until: prevState.period.until}
            : {since: newSince, until: newSince};
        return {
          ...prevState,
          period: newPeriod,
        };
      });
    }
  }
  function handleEndInputValueChange(value) {
    setInputValues((prevState) => ({...prevState, until: value}));
    if (isValidDate(value)) {
      const newUntil = parseYearMonthDayDateString(value);
      setActiveDateRange((prevState) => {
        const newPeriod =
          prevState.period && newUntil >= prevState.period.since
            ? {since: prevState.period.since, until: newUntil}
            : {since: newUntil, until: newUntil};
        return {
          ...prevState,
          period: newPeriod,
        };
      });
    }
  }
  function handleInputBlur({relatedTarget}) {
    const isRelatedTargetWithinPopover =
      relatedTarget != null && isNodeWithinPopover(relatedTarget);
    // If focus moves from the TextField to the Popover
    // we don't want to close the popover
    if (isRelatedTargetWithinPopover) {
      return;
    }
    setPopoverActive(false);
  }
  function handleMonthChange(month, year) {
    setDate({month, year});
  }
  function handleCalendarChange({start, end}) {
    const newDateRange = ranges.find((range) => {
      return (
        range.period.since.valueOf() === start.valueOf() &&
        range.period.until.valueOf() === end.valueOf()
      );
    }) || {
      alias: 'custom',
      title: 'Custom',
      period: {
        since: start,
        until: end,
      },
    };
    setActiveDateRange(newDateRange);
  }
  function apply() {
    setPopoverActive(false);
  }
  function cancel() {
    setPopoverActive(false);
  }
  useEffect(() => {
    if (activeDateRange) {
      setInputValues({
        since: formatDate(activeDateRange.period.since),
        until: formatDate(activeDateRange.period.until),
      });
      function monthDiff(referenceDate, newDate) {
        return (
          newDate.month -
          referenceDate.month +
          12 * (referenceDate.year - newDate.year)
        );
      }
      const monthDifference = monthDiff(
        {year, month},
        {
          year: activeDateRange.period.until.getFullYear(),
          month: activeDateRange.period.until.getMonth(),
        },
      );
      if (monthDifference > 1 || monthDifference < 0) {
        setDate({
          month: activeDateRange.period.until.getMonth(),
          year: activeDateRange.period.until.getFullYear(),
        });
      }
    }
  }, [activeDateRange]);
  const buttonValue =
    activeDateRange.title === 'Custom'
      ? activeDateRange.period.since.toDateString() +
        ' - ' +
        activeDateRange.period.until.toDateString()
      : activeDateRange.title;
  return (
    <Popover
      active={popoverActive}
      autofocusTarget="none"
      preferredAlignment="left"
      preferredPosition="below"
      fluidContent
      sectioned={false}
      fullHeight
      activator={
        <Button
          size="slim"
          icon={CalendarMinor}
          onClick={() => setPopoverActive(!popoverActive)}
        >
          {buttonValue}
        </Button>
      }
      onClose={() => setPopoverActive(false)}
    >
      <Popover.Pane fixed>
        <Columns
          columns={{
            xs: '1fr',
            mdDown: '1fr',
            md: 'max-content max-content',
          }}
          gap={0}
          ref={datePickerRef}
        >
          <Box
            maxWidth={mdDown ? '516px' : '212px'}
            width={mdDown ? '100%' : '212px'}
            padding={{xs: 5, md: 0}}
            paddingBlockEnd={{xs: 1, md: 0}}
          >
            {mdDown ? (
              <Select
                label="dateRangeLabel"
                labelHidden
                onChange={(value) => {
                  const result = ranges.find(
                    ({title, alias}) => title === value || alias === value,
                  );
                  setActiveDateRange(result);
                }}
                value={activeDateRange?.title || activeDateRange?.alias || ''}
                options={ranges.map(({alias, title}) => title || alias)}
              />
            ) : (
              <Scrollable style={{height: '334px'}}>
                <OptionList
                  options={ranges.map((range) => ({
                    value: range.alias,
                    label: range.title,
                  }))}
                  selected={activeDateRange.alias}
                  onChange={(value) => {
                    setActiveDateRange(
                      ranges.find((range) => range.alias === value[0]),
                    );
                  }}
                />
              </Scrollable>
            )}
          </Box>
          <Box padding={{xs: 5}} maxWidth={mdDown ? '320px' : '516px'}>
            <AlphaStack fullWidth gap="4">
              <Inline>
                <div style={{flexGrow: 1}}>
                  <TextField
                    role="combobox"
                    label={'Since'}
                    labelHidden
                    prefix={<Icon source={CalendarMinor} />}
                    value={inputValues.since}
                    onChange={handleStartInputValueChange}
                    onBlur={handleInputBlur}
                    autoComplete="off"
                  />
                </div>
                <Icon source={ArrowRightMinor} />
                <div style={{flexGrow: 1}}>
                  <TextField
                    role="combobox"
                    label={'Until'}
                    labelHidden
                    prefix={<Icon source={CalendarMinor} />}
                    value={inputValues.until}
                    onChange={handleEndInputValueChange}
                    onBlur={handleInputBlur}
                    autoComplete="off"
                  />
                </div>
              </Inline>
              <div>
                <DatePicker
                  month={month}
                  year={year}
                  selected={{
                    start: activeDateRange.period.since,
                    end: activeDateRange.period.until,
                  }}
                  onMonthChange={handleMonthChange}
                  onChange={handleCalendarChange}
                  multiMonth={shouldShowMultiMonth}
                  allowRange
                />
              </div>
            </AlphaStack>
          </Box>
        </Columns>
      </Popover.Pane>
      <Popover.Pane fixed>
        <Popover.Section>
          <Inline align="end">
            <Button onClick={cancel}>Cancel</Button>
            <Button primary onClick={apply}>
              Apply
            </Button>
          </Inline>
        </Popover.Section>
      </Popover.Pane>
    </Popover>
  );
}
```

</div>
<div as="UsefulToKnow">

### Useful to know

|                                                                                                |                                                                                                      |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Pin any relevant, merchant-specific dates to the top of the option list.                       | ![List of date options such as “BFCM (2023)”](/images/patterns/date-range-usage-1.png)               |
| If a date cannot be selected, indicate it with the [disabled text color token](/tokens/colors) | ![Single-month calendar with a range of unselectable dates](/images/patterns/date-range-usage-2.png) |
| If a merchant enters a nonexistent date, revert to the previously selected date.               | ![Calendar with date inputs reading an incorrect date](/images/patterns/date-range-usage-3.png)      |

</div>
