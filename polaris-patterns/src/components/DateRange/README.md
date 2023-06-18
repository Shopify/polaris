---
category: Numbers and dates
tags:
  - datepicker
  - analytics
---

# AnalyticsDatePicker

Renders a list of precanned dates, a date text input, and a calendar picker

## Best practices

Use this component anywhere to enable merchants to choose a date either from a list of options or select a custom date

Usage:

```tsx
import {DatePicker} from 'components/AnalyticsDatePicker';
import {useReportQuickPicks} from 'components/AnalyticsDatePicker/hooks/useReportQuickPicks';

function Example() {
  const {dateRangeQuickPicks} = useReportQuickPicks();

  const [reportingPeriod, setReportingPeriod] = useState<DatePeriod>({
    since: new Date(),
    until: new Date(),
  });

  const handleDateChange = (newReportingPeriod: DatePeriod) => {
    setReportingPeriod(newReportingPeriod);
  };
  return (
    <DatePicker
      datePeriod={reportingPeriod}
      onChange={handleDateChange}
      quickPicks={dateRangeQuickPicks}
      popoverAlignment="left"
    />
  );
}
```

QuickPicks:

The DatePicker `quickPicks` prop accepts a Quickpicks object:

```ts
interface QuickPicks {
  // The main section of date ranges
  options: DateRange[];
  // Date ranges rendered at the top of the quick picks section above a dividing line
  recommended?: DateRange[];
  // Collapsible sections of quick picks
  sections?: SectionDescriptor[];
}
```

A sensible set of default quick picks including quarters and BFCM ranges can be accessed via the `useReportQuickpicks()` hook.

```ts
import {useReportQuickPicks} from 'components/AnalyticsDatePicker/hooks/useReportQuickPicks';

const {dateRangeQuickPicks} = useReportQuickPicks();
```

The hook also returns a set of comparison ranges, pre-calculated based on the active query period

```ts
const {comparisonRangeQuickPicks} = useComparisonQuickPicks(currentQueryPeriod);
```

## Research and development

| Owner                                                   | Help                                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------------------ |
| [optimize-analyze](https://vault.shopify.io/teams/2446) | [#optimize-analyze-team](https://shopify.slack.com/archives/C046GA5QGJX) |
