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
      howItHelps: `![A labeled diagram of an active input field displaying a calendar beneath it. The input field is labeled "1". The calendar is labeled "2".](/images/patterns/single-list-cover-image.png)

1. The text input gives merchants the option to use the keyboard to enter a date.
2. A single month calendar allows merchants to select a date while seeing its relationship to other days.

| | |
|-|-|
|**Schedule an event on a specific day**|Some examples of this are setting a visibility date for a new online store page, or an estimated arrival date for a shipment. Found in: Product / transfers|
|**Input memorable dates to forms**|An example of this is entering a birthdate.|
:caption[**Use when merchants need to:**]{side=top}`,
      usefulToKnow: `
| | |
|-|-|
|Labels need to simply depict the task at hand. Whether that be a start date, end date, start time etc.|![](/images/patterns/single-list-usage-1.png)|
|This pattern can be duplicated to allow users to add an end date or time.|![](/images/patterns/single-list-usage-2.png)|
`,
      example: {
        code: `
      {(function DatePickerPattern () {
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
      })()}`,
        context: `
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '32px',
        paddingRight: '32px',
      }}>
        <div style={{ width: '100%' }}>
          ____CODE____
        </div>
      </div>
      `,
        snippetCode: `
      function DatePickerPattern () {
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
      }
          `,
      },
    },
    {
      title: 'Date range',
      slug: 'date-range',
      description: 'This enables merchants to select a date range.',
      howItHelps: `![](/images/patterns/date-range-cover-image.png)

1. Providing multiple ways to select a date range gives merchants full flexibility. The list provides quick access to common options, the text input makes it easier to set large custom ranges, and the calendar is an intuitive way to set a more narrow scope.
2. Displaying two months makes it easier for merchants to select date ranges that span across both.
3. Selecting a date range may require multiple steps, so merchants prefer to explicitly confirm their selection, unlike the single date picker which closes on selection.

| | |
|-|-|
|**Analyze trends and data**|When a merchant needs to view their business metrics so that they can learn and make decisions, they use the date range picker to frame data to certain time periods. Found in: Analytics|
|**Schedule an event**|When a merchant needs to schedule an event that spans multiple days, a date range picker is necessary.|
:caption[**Use when merchants need to:**]{side=top}`,
      usefulToKnow: `
| | |
|-|-|
|Pin any relevant, merchant-specific dates to the top of the option list.|![](/images/patterns/date-range-usage-1.png)|
|If a date cannot be selected, indicate it with the [disabled text color token](/tokens/colors)|![](/images/patterns/date-range-usage-2.png)|
|If a merchant enters a nonexistent date, revert to the previously selected date.|![](/images/patterns/date-range-usage-3.png)|
`,
      example: {
        code: ` <Page
        divider
      >
        <AlphaStack gap="16">
          Coming Soon
        </AlphaStack>
      </Page>`,
      },
    },
    {
      title: 'Date list',
      slug: 'date-list',
      description:
        'This enables merchants to select a date or a date range from a list of preset dates.',
      howItHelps: `![](/images/patterns/date-list-cover-image.png)

1. The date list provides merchants with suggested dates. This makes date picking simpler when useful dates are predictable and custom dates aren’t necessary.

| | |
|-|-|
|**Select from templated dates**|When a templated list of dates is sufficient for the merchant task, use the date list because it is a task that does not require in-depth filtering of historical information. Found in: Inbox app / Overview|
:caption[**Use when merchants need to:**]{side=top}`,
      usefulToKnow: `
| | |
|-|-|
|In the button preview, set a default date range that a merchant will most likely use.|![](/images/patterns/date-list-usage-1.png)|
|Single dates should be at the top of the list, followed by date ranges from smallest to largest ranges.|![](/images/patterns/date-list-usage-2.png)|
|A date list can be modified to serve unique situations, like providing suggested search queries in the customer segment editor.|![](/images/patterns/date-list-usage-3.png)|
`,
      example: {
        context: `<div style={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '32px',
          paddingRight: '32px',
        }}>
          <div style={{ width: '100%' }}>
            ____CODE____
          </div>
        </div>`,
        code: `
        <Page
        divider
      >
        <AlphaStack gap="16">
          Coming Soon
        </AlphaStack>
      </Page>
        `,
      },
    },
  ],
};

export default pattern;
