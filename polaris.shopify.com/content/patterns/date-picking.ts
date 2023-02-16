import type {MultiVariantPattern} from '../../src/types';

const pattern: MultiVariantPattern = {
  relatedResources: `* Programming timezones can be finicky. Get great tips in the article [UTC is for everyone right](https://zachholman.com/talk/utc-is-enough-for-everyone-right)?
* Learn about date formatting in the [Grammar and mechanics](/content/grammar-and-mechanics#date) guidelines.
* See how to craft effective button labels in the [Actionable language](/content/actionable-language) guidelines.`,
  description:
    'Lets merchants select a date or date range to help them filter information or objects and schedule events or actions.',
  variants: [
    {
      title: 'Single date',
      slug: 'single-date',
      description:
        'This enables merchants to type a specific date or pick it from a calendar.',
      howItHelps: `![Date text input and a single-month calendar](/images/patterns/single-list-cover-image.png)

1. The text input gives merchants the option to use the keyboard to enter a date.
2. A single month calendar allows merchants to select a date while seeing its relationship to other days.

:::customtable

### **Use when merchants need to:**

**Schedule an event on a specific day**
:   Some examples of this are setting a visibility date for a new online store page, or an estimated arrival date for a shipment. Found in: Product / transfers

**Input memorable dates to forms**
:   An example of this is entering a birthdate.

:::`,
      usefulToKnow: `
| | |
|-|-|
|Labels need to simply depict the task at hand. Whether that be a start date, end date, start time etc.|![Date input labeled “Expiry date”](/images/patterns/single-list-usage-1.png)|
|This pattern can be duplicated to allow users to add an end date or time.|![“Active dates” section with “start date” and “end date” inputs, toggled on with a “Set end date” checkbox](/images/patterns/single-list-usage-2.png)|
`,
      example: {
        relatedComponents: [
          {
            label: 'Alpha Card',
            url: '/components/layout-and-structure/alpha-card',
          },
          {
            label: 'Date picker',
            url: '/components/selection-and-input/date-picker',
          },
          {label: 'Popover', url: '/components/overlays/popover'},
          {
            label: 'Text field',
            url: '/components/selection-and-input/text-field',
          },
        ],
        code: `
        {(function DatePickerExample() {
          function formatDateToYearMonthDayDateString(date) {
            const year = String(date.getFullYear());
            let month = String(date.getMonth() + 1);
            let day = String(date.getDate());
            if (month.length < 2) {
              month = String(month).padStart(2, "0");
            }
            if (day.length < 2) {
              day = String(day).padStart(2, "0");
            }
            return [year, month, day].join("-");
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
          const [visible, setVisible] = useState(false);
          const [selectedDate, setSelectedDate] = useState(new Date());
          const [{ month, year }, setDate] = useState({
            month: selectedDate.getMonth(),
            year: selectedDate.getFullYear(),
          });
          const formattedValue = formatDateToYearMonthDayDateString(selectedDate);
          const datePickerRef = useRef(null);
          function isNodeWithinPopover(node) {
            return datePickerRef?.current
              ? nodeContainsDescendant(datePickerRef.current, node)
              : false;
          }
          function handleInputValueChange() {
            console.log("handleInputValueChange");
          }
          function handleOnClose({ relatedTarget }) {
            setVisible(false);
          }
          function handleMonthChange(month, year) {
            setDate({ month, year });
          }
          function handleDateSelection({ end: newSelectedDate }) {
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
            <AlphaStack align="center">
              <Box minWidth="276px" padding={{ xs: 2 }}>
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
                      label={"Start date"}
                      prefix={<Icon source={CalendarMinor} />}
                      value={formattedValue}
                      onFocus={() => setVisible(true)}
                      onChange={handleInputValueChange}
                      autoComplete="off"
                    />
                  }
                >
                  <AlphaCard ref={datePickerRef}>
                    <DatePicker
                      month={month}
                      year={year}
                      selected={selectedDate}
                      onMonthChange={handleMonthChange}
                      onChange={handleDateSelection}
                    />
                  </AlphaCard>
                </Popover>
              </Box>
            </AlphaStack>
          );
        })()}

`,
        snippetCode: `
        function DatePickerExample() {
          function formatDateToYearMonthDayDateString(date) {
            const year = String(date.getFullYear());
            let month = String(date.getMonth() + 1);
            let day = String(date.getDate());
            if (month.length < 2) {
              month = String(month).padStart(2, "0");
            }
            if (day.length < 2) {
              day = String(day).padStart(2, "0");
            }
            return [year, month, day].join("-");
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
          const [visible, setVisible] = useState(false);
          const [selectedDate, setSelectedDate] = useState(new Date());
          const [{ month, year }, setDate] = useState({
            month: selectedDate.getMonth(),
            year: selectedDate.getFullYear(),
          });
          const formattedValue = formatDateToYearMonthDayDateString(selectedDate);
          const datePickerRef = useRef(null);
          function isNodeWithinPopover(node) {
            return datePickerRef?.current
              ? nodeContainsDescendant(datePickerRef.current, node)
              : false;
          }
          function handleInputValueChange() {
            console.log("handleInputValueChange");
          }
          function handleOnClose({ relatedTarget }) {
            setVisible(false);
          }
          function handleMonthChange(month, year) {
            setDate({ month, year });
          }
          function handleDateSelection({ end: newSelectedDate }) {
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
            <AlphaStack align="center">
              <Box minWidth="276px" padding={{ xs: 2 }}>
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
                      label={"Start date"}
                      prefix={<Icon source={CalendarMinor} />}
                      value={formattedValue}
                      onFocus={() => setVisible(true)}
                      onChange={handleInputValueChange}
                      autoComplete="off"
                    />
                  }
                >
                  <AlphaCard ref={datePickerRef}>
                    <DatePicker
                      month={month}
                      year={year}
                      selected={selectedDate}
                      onMonthChange={handleMonthChange}
                      onChange={handleDateSelection}
                    />
                  </AlphaCard>
                </Popover>
              </Box>
            </AlphaStack>
          );
        }
        `,
      },
    },
    {
      title: 'Date range',
      slug: 'date-range',
      description: 'This enables merchants to select a date range.',
      howItHelps: `![Date range picker with three numbered zones](/images/patterns/date-range-cover-image.png)

1. Providing multiple ways to select a date range gives merchants full flexibility. The list provides quick access to common options, the text input makes it easier to set large custom ranges, and the calendar is an intuitive way to set a more narrow scope.
2. Displaying two months makes it easier for merchants to select date ranges that span across both.
3. Selecting a date range may require multiple steps, so merchants prefer to explicitly confirm their selection, unlike the single date picker which closes on selection.

:::customtable

### **Use when merchants need to**

**Analyze trends and data**
:   When a merchant needs to view their business metrics so that they can learn and make decisions, they use the date range picker to frame data to certain time periods. Found in: Analytics

**Schedule an event**
:   When a merchant needs to schedule an event that spans multiple days, a date range picker is necessary.

:::`,
      usefulToKnow: `
| | |
|-|-|
|Pin any relevant, merchant-specific dates to the top of the option list.|![List of date options such as “BFCM (2023)”](/images/patterns/date-range-usage-1.png)|
|If a date cannot be selected, indicate it with the [disabled text color token](/tokens/colors)|![Single-month calendar with a range of unselectable dates](/images/patterns/date-range-usage-2.png)|
|If a merchant enters a nonexistent date, revert to the previously selected date.|![Calendar with date inputs reading an incorrect date](/images/patterns/date-range-usage-3.png)|
`,
      example: {
        relatedComponents: [
          {
            label: 'Alpha stack',
            url: '/components/layout-and-structure/alpha-stack',
          },
          {label: 'Box', url: '/components/layout-and-structure/box'},
          {label: 'Button', url: '/components/actions/button'},
          {label: 'Columns', url: '/components/layout-and-structure/columns'},
          {
            label: 'Date picker',
            url: '/components/selection-and-input/date-picker',
          },
          {label: 'Inline', url: '/components/layout-and-structure/inline'},
          {label: 'Option list', url: '/components/lists/option-list'},
          {label: 'Popover', url: '/components/overlays/popover'},
          {
            label: 'Text field',
            url: '/components/selection-and-input/text-field',
          },
        ],
        snippetCode: `
        function DateRangePicker() {
          const { mdDown, lgUp } = useBreakpoints();
          const shouldShowMultiMonth = lgUp;
          const today = new Date(new Date().setHours(0, 0, 0, 0));
          const yesterday = new Date(
            new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
          );
          const ranges = [
            {
              title: "Today",
              alias: "today",
              period: {
                since: today,
                until: today,
              },
            },
            {
              title: "Yesterday",
              alias: "yesterday",
              period: {
                since: yesterday,
                until: yesterday,
              },
            },
            {
              title: "Last 7 days",
              alias: "last7days",
              period: {
                since: new Date(
                  new Date(new Date().setDate(today.getDate() - 7)).setHours(
                    0,
                    0,
                    0,
                    0
                  )
                ),
                until: yesterday,
              },
            },
          ];
          const [popoverActive, setPopoverActive] = useState(false);
          const [activeDateRange, setActiveDateRange] = useState(ranges[0]);
          const [inputValues, setInputValues] = useState({});
          const [{ month, year }, setDate] = useState({
            month: activeDateRange.period.since.getMonth(),
            year: activeDateRange.period.since.getFullYear(),
          });
          const datePickerRef = useRef(null);
          const VALID_YYYY_MM_DD_DATE_REGEX = /^\\d{4}-\\d{1,2}-\\d{1,2}$/;
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
            const [year, month, day] = input.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day));
          }
          function formatDateToYearMonthDayDateString(date) {
            const year = String(date.getFullYear());
            let month = String(date.getMonth() + 1);
            let day = String(date.getDate());
            if (month.length < 2) {
              month = String(month).padStart(2, "0");
            }
            if (day.length < 2) {
              day = String(day).padStart(2, "0");
            }
            return [year, month, day].join("-");
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
              return { ...prevState, since: value };
            });
            console.log("handleStartInputValueChange, validDate", value);
            if (isValidDate(value)) {
              const newSince = parseYearMonthDayDateString(value);
              setActiveDateRange((prevState) => {
                const newPeriod =
                  prevState.period && newSince <= prevState.period.until
                    ? { since: newSince, until: prevState.period.until }
                    : { since: newSince, until: newSince };
                return {
                  ...prevState,
                  period: newPeriod,
                };
              });
            }
          }
          function handleEndInputValueChange(value) {
            setInputValues((prevState) => ({ ...prevState, until: value }));
            if (isValidDate(value)) {
              const newUntil = parseYearMonthDayDateString(value);
              setActiveDateRange((prevState) => {
                const newPeriod =
                  prevState.period && newUntil >= prevState.period.since
                    ? { since: prevState.period.since, until: newUntil }
                    : { since: newUntil, until: newUntil };
                return {
                  ...prevState,
                  period: newPeriod,
                };
              });
            }
          }
          function handleInputBlur({ relatedTarget }) {
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
            setDate({ month, year });
          }
          function handleCalendarChange({ start, end }) {
            const newDateRange = ranges.find((range) => {
              return (
                range.period.since.valueOf() === start.valueOf() &&
                range.period.until.valueOf() === end.valueOf()
              );
            }) || {
              alias: "custom",
              title: "Custom",
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
              if (activeDateRange.period.since === activeDateRange.period.until) {
                return;
              }
              const clonedDate = new Date(activeDateRange.period.until);
              clonedDate.setMonth(clonedDate.getMonth() - 1);
              if (activeDateRange.period.since.getMonth() === month) {
                if (
                  activeDateRange.period.since.getMonth() ===
                  activeDateRange.period.until.getMonth()
                ) {
                  clonedDate.setMonth(clonedDate.getMonth() + 1);
                }
              }
              setDate({
                month: clonedDate.getMonth(),
                year: clonedDate.getFullYear(),
              });
            }
          }, [activeDateRange]);
          const buttonValue =
            activeDateRange.title === "Custom"
              ? activeDateRange.period.since.toDateString() +
                " - " +
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
              {/* <Box padding={{ xs: 2 }} maxWidth={"728px"}> */}
              <Popover.Pane fixed>
                <Columns
                  columns={{
                    xs: "1fr",
                    mdDown: "1fr",
                    md: "max-content max-content",
                  }}
                  gap={0}
                  ref={datePickerRef}
                >
                  <Box
                    maxWidth={mdDown ? "516px" : "212px"}
                    width={mdDown ? "100%" : "212px"}
                    padding={{ xs: 5, md: 0 }}
                    paddingBlockEnd={{ xs: 1, md: 0 }}
                  >
                    {mdDown ? (
                      <Select
                        label="dateRangeLabel"
                        labelHidden
                        onChange={(value) => {
                          const result = ranges.find(
                            ({ title, alias }) => title === value || alias === value
                          );
                          setActiveDateRange(result);
                        }}
                        value={activeDateRange?.title || activeDateRange?.alias || ""}
                        options={ranges.map(({ alias, title }) => title || alias)}
                      />
                    ) : (
                      <Scrollable style={{height: "334px"}}>
                        <OptionList
                          options={ranges.map((range) => ({
                            value: range.alias,
                            label: range.title,
                          }))}
                          selected={activeDateRange.alias}
                          onChange={(value) => {
                            setActiveDateRange(
                              ranges.find((range) => range.alias === value[0])
                            );
                          }}
                        />
                      </Scrollable>
                    )}
                  </Box>
                  <Box padding={{ xs: 5 }} maxWidth={mdDown ? "320px" : "516px"}>
                    <AlphaStack fullWidth>
                      <Inline>
                        <div style={{ flexGrow: 1 }}>
                          <TextField
                            role="combobox"
                            label={"Since"}
                            labelHidden
                            prefix={<Icon source={CalendarMinor} />}
                            value={inputValues.since}
                            onChange={handleStartInputValueChange}
                            onBlur={handleInputBlur}
                            autoComplete="off"
                          />
                        </div>
                        <Icon source={ArrowRightMinor} />
                        <div style={{ flexGrow: 1 }}>
                          <TextField
                            role="combobox"
                            label={"Until"}
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
        })
        `,
        context: `<div style={{
          paddingLeft: "2rem",
          paddingRight: "2rem",
          paddingTop: "2rem",
          minHeight: "100vh",
          height: "500px",
        }}>
        ____CODE____
        </div>`,
        code: `
        {(function DateRangePicker() {
          const { mdDown, lgUp } = useBreakpoints();
          const shouldShowMultiMonth = lgUp;
          const today = new Date(new Date().setHours(0, 0, 0, 0));
          const yesterday = new Date(
            new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
          );
          const ranges = [
            {
              title: "Today",
              alias: "today",
              period: {
                since: today,
                until: today,
              },
            },
            {
              title: "Yesterday",
              alias: "yesterday",
              period: {
                since: yesterday,
                until: yesterday,
              },
            },
            {
              title: "Last 7 days",
              alias: "last7days",
              period: {
                since: new Date(
                  new Date(new Date().setDate(today.getDate() - 7)).setHours(
                    0,
                    0,
                    0,
                    0
                  )
                ),
                until: yesterday,
              },
            },
          ];
          const [popoverActive, setPopoverActive] = useState(false);
          const [activeDateRange, setActiveDateRange] = useState(ranges[0]);
          const [inputValues, setInputValues] = useState({});
          const [{ month, year }, setDate] = useState({
            month: activeDateRange.period.since.getMonth(),
            year: activeDateRange.period.since.getFullYear(),
          });
          const datePickerRef = useRef(null);
          const VALID_YYYY_MM_DD_DATE_REGEX = /^\\d{4}-\\d{1,2}-\\d{1,2}$/;
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
            const [year, month, day] = input.split("-");
            return new Date(Number(year), Number(month) - 1, Number(day));
          }
          function formatDateToYearMonthDayDateString(date) {
            const year = String(date.getFullYear());
            let month = String(date.getMonth() + 1);
            let day = String(date.getDate());
            if (month.length < 2) {
              month = String(month).padStart(2, "0");
            }
            if (day.length < 2) {
              day = String(day).padStart(2, "0");
            }
            return [year, month, day].join("-");
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
              return { ...prevState, since: value };
            });
            console.log("handleStartInputValueChange, validDate", value);
            if (isValidDate(value)) {
              const newSince = parseYearMonthDayDateString(value);
              setActiveDateRange((prevState) => {
                const newPeriod =
                  prevState.period && newSince <= prevState.period.until
                    ? { since: newSince, until: prevState.period.until }
                    : { since: newSince, until: newSince };
                return {
                  ...prevState,
                  period: newPeriod,
                };
              });
            }
          }
          function handleEndInputValueChange(value) {
            setInputValues((prevState) => ({ ...prevState, until: value }));
            if (isValidDate(value)) {
              const newUntil = parseYearMonthDayDateString(value);
              setActiveDateRange((prevState) => {
                const newPeriod =
                  prevState.period && newUntil >= prevState.period.since
                    ? { since: prevState.period.since, until: newUntil }
                    : { since: newUntil, until: newUntil };
                return {
                  ...prevState,
                  period: newPeriod,
                };
              });
            }
          }
          function handleInputBlur({ relatedTarget }) {
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
            setDate({ month, year });
          }
          function handleCalendarChange({ start, end }) {
            const newDateRange = ranges.find((range) => {
              return (
                range.period.since.valueOf() === start.valueOf() &&
                range.period.until.valueOf() === end.valueOf()
              );
            }) || {
              alias: "custom",
              title: "Custom",
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
              if (activeDateRange.period.since === activeDateRange.period.until) {
                return;
              }
              const clonedDate = new Date(activeDateRange.period.until);
              clonedDate.setMonth(clonedDate.getMonth() - 1);
              if (activeDateRange.period.since.getMonth() === month) {
                if (
                  activeDateRange.period.since.getMonth() ===
                  activeDateRange.period.until.getMonth()
                ) {
                  clonedDate.setMonth(clonedDate.getMonth() + 1);
                }
              }
              setDate({
                month: clonedDate.getMonth(),
                year: clonedDate.getFullYear(),
              });
            }
          }, [activeDateRange]);
          const buttonValue =
            activeDateRange.title === "Custom"
              ? activeDateRange.period.since.toDateString() +
                " - " +
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
              {/* <Box padding={{ xs: 2 }} maxWidth={"728px"}> */}
              <Popover.Pane fixed>
                <Columns
                  columns={{
                    xs: "1fr",
                    mdDown: "1fr",
                    md: "max-content max-content",
                  }}
                  gap={0}
                  ref={datePickerRef}
                >
                  <Box
                    maxWidth={mdDown ? "516px" : "212px"}
                    width={mdDown ? "100%" : "212px"}
                    padding={{ xs: 5, md: 0 }}
                    paddingBlockEnd={{ xs: 1, md: 0 }}
                  >
                    {mdDown ? (
                      <Select
                        label="dateRangeLabel"
                        labelHidden
                        onChange={(value) => {
                          const result = ranges.find(
                            ({ title, alias }) => title === value || alias === value
                          );
                          setActiveDateRange(result);
                        }}
                        value={activeDateRange?.title || activeDateRange?.alias || ""}
                        options={ranges.map(({ alias, title }) => title || alias)}
                      />
                    ) : (
                      <Scrollable style={{height: "334px"}}>
                        <OptionList
                          options={ranges.map((range) => ({
                            value: range.alias,
                            label: range.title,
                          }))}
                          selected={activeDateRange.alias}
                          onChange={(value) => {
                            setActiveDateRange(
                              ranges.find((range) => range.alias === value[0])
                            );
                          }}
                        />
                      </Scrollable>
                    )}
                  </Box>
                  <Box padding={{ xs: 5 }} maxWidth={mdDown ? "320px" : "516px"}>
                    <AlphaStack fullWidth>
                      <Inline>
                        <div style={{ flexGrow: 1 }}>
                          <TextField
                            role="combobox"
                            label={"Since"}
                            labelHidden
                            prefix={<Icon source={CalendarMinor} />}
                            value={inputValues.since}
                            onChange={handleStartInputValueChange}
                            onBlur={handleInputBlur}
                            autoComplete="off"
                          />
                        </div>
                        <Icon source={ArrowRightMinor} />
                        <div style={{ flexGrow: 1 }}>
                          <TextField
                            role="combobox"
                            label={"Until"}
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
        })()}
        `,
      },
    },
    {
      title: 'Date list',
      slug: 'date-list',
      description:
        'This enables merchants to select a date or a date range from a list of preset dates.',
      howItHelps: `![Option list with common suggested dates, such as “Today” and “Last 30 days”](/images/patterns/date-list-cover-image.png)

1. The date list provides merchants with suggested dates. This makes date picking simpler when useful dates are predictable and custom dates aren’t necessary.

:::customtable

### **Use when merchants need to**

**Select from templated dates**
:   When a templated list of dates is sufficient for the merchant task, use the date list because it is a task that does not require in-depth filtering of historical information. Found in: Inbox app / Overview

:::`,
      usefulToKnow: `
| | |
|-|-|
|In the button preview, set a default date range that a merchant will most likely use.|![Button showing a calendar icon labeled “Today”](/images/patterns/date-list-usage-1.png)|
|Single dates should be at the top of the list, followed by date ranges from smallest to largest ranges.|![Option list with common suggested dates followed by ranges](/images/patterns/date-list-usage-2.png)|
|A date list can be modified to serve unique situations, like providing suggested search queries in the customer segment editor.|![Customer segment editor with a date list showing common ranges and related code snippets](/images/patterns/date-list-usage-3.png)|
`,
      example: {
        relatedComponents: [
          {label: 'Button', url: '/components/button'},
          {label: 'Option list', url: '/components/option-list'},
          {
            label: 'Popover',
            url: '/components/popover',
          },
        ],
        context: `<div style={{
          display: 'flex',
          paddingTop: "2rem",
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'start',
        }}>
            ____CODE____
        </div>`,
        snippetCode: `
        function DateListPicker () {
          const ranges = [{
              title: "No Date",
              alias: "no-date",
              period: null
            },
            {
              title: "Today",
              alias: "today",
              period: {
                since: "today",
                until: "today"
              }
            },
            {
              title: "Yesterday",
              alias: "yesterday",
              period: {
                since: "yesterday",
                until: "yesterday"
              }
            },
            {
              title: "Last 7 days",
              alias: "last7days",
              period: {
                since: "-7d",
                until: "-1d"
              }
            }
          ];
          const [selected, setSelected] = useState(ranges[0]);
          const [popoverActive, setPopoverActive] = useState(false);
          return (
            <Popover
              autofocusTarget="none"
              preferredAlignment="left"
              preferInputActivator={false}
              preferredPosition="below"
              activator={
                <Button
                  onClick={() => setPopoverActive(!popoverActive)}
                  icon={CalendarMinor}
                >
                  {selected.title}
                </Button>
              }
              active={popoverActive}
            >
              <OptionList
                options={ranges.map((range) => ({
                  value: range.alias,
                  label: range.title
                }))}
                selected={selected.alias}
                onChange={(value) => {
                  setSelected(ranges.find((range) => range.alias === value[0]));
                  setPopoverActive(false);
                }}
              />
          </Popover>
        )}
        `,
        code: `
{(function DateListPicker () {
  const ranges = [{
      title: "No Date",
      alias: "no-date",
      period: null
    },
    {
      title: "Today",
      alias: "today",
      period: {
        since: "today",
        until: "today"
      }
    },
    {
      title: "Yesterday",
      alias: "yesterday",
      period: {
        since: "yesterday",
        until: "yesterday"
      }
    },
    {
      title: "Last 7 days",
      alias: "last7days",
      period: {
        since: "-7d",
        until: "-1d"
      }
    }
  ];
  const [selected, setSelected] = useState(ranges[0]);
  const [popoverActive, setPopoverActive] = useState(false);
  return (
    <Popover
      autofocusTarget="none"
      preferredAlignment="left"
      preferInputActivator={false}
      preferredPosition="below"
      activator={
        <Button
          onClick={() => setPopoverActive(!popoverActive)}
          icon={CalendarMinor}
        >
          {selected.title}
        </Button>
      }
      active={popoverActive}
    >
      <OptionList
        options={ranges.map((range) => ({
          value: range.alias,
          label: range.title
        }))}
        selected={selected.alias}
        onChange={(value) => {
          setSelected(ranges.find((range) => range.alias === value[0]));
          setPopoverActive(false);
        }}
      />
  </Popover>
)})()}
`,
      },
    },
  ],
};

export default pattern;
