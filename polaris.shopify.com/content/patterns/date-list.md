---
title: Date list
description: Select a date or a date range
lede: Lets merchants select a date or a date range from a list of preset dates.
url: /patterns/date-list
previewImg: /images/patterns/date-picking/pattern-thumbnail-date-picking.png
githubDiscussionsLink: https://github.com/Shopify/polaris/discussions/7853
---

<div as="HowItHelps">

## How it helps merchants

![Option list with common suggested dates, such as “Today” and “Last 30 days”](/images/patterns/date-picking/date-list-cover-image.png)

1. The date list provides merchants with suggested dates. This makes date picking simpler when useful dates are predictable and custom dates aren’t necessary.

<div as="DefinitionTable">

### Use when merchants need to:

**Select from templated dates**
: When a templated list of dates is sufficient for the merchant task, use the date list because it is a task that does not require in-depth filtering of historical information. Found in: Inbox app / Overview

</div>
</div>
<div as="Usage">

## Using this pattern

This pattern uses the [`Button`](/components/actions/button), [`OptionList`](/components/lists/option-list) and [`Popover`](/components/overlays/popover) components.

<!-- prettier-ignore -->
```javascript {"type":"previewContext","for":"example"}
<div style={{
  display: 'flex',
  paddingTop: "2rem",
  flexDirection: 'column',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'start',
}}>
  {(____CODE____)()}
</div>
```

<!-- prettier-ignore -->
```javascript {"type":"sandboxContext","for":"example"}
{(____CODE____)()}
```

```javascript {"type":"livePreview","id":"example"}
function DateListPicker() {
  const ranges = [
    {
      title: 'No Date',
      alias: 'no-date',
      period: null,
    },
    {
      title: 'Today',
      alias: 'today',
      period: {
        since: 'today',
        until: 'today',
      },
    },
    {
      title: 'Yesterday',
      alias: 'yesterday',
      period: {
        since: 'yesterday',
        until: 'yesterday',
      },
    },
    {
      title: 'Last 7 days',
      alias: 'last7days',
      period: {
        since: '-7d',
        until: '-1d',
      },
    },
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
          label: range.title,
        }))}
        selected={selected.alias}
        onChange={(value) => {
          setSelected(ranges.find((range) => range.alias === value[0]));
          setPopoverActive(false);
        }}
      />
    </Popover>
  );
}
```

</div>
<div as="UsefulToKnow">

### Useful to know

- <span>In the button preview, set a default date range that a merchant will most likely use.</span> ![Button showing a calendar icon labeled “Today”](/images/patterns/date-picking/date-list-usage-1.png)
- <span>Single dates should be at the top of the list, followed by date ranges from smallest to largest ranges.</span> ![Option list with common suggested dates followed by ranges](/images/patterns/date-picking/date-list-usage-2.png)
- <span>A date list can be modified to serve unique situations, like providing suggested search queries in the customer segment editor.</span> ![Customer segment editor with a date list showing common ranges and related code snippets](/images/patterns/date-picking/date-list-usage-3.png)

</div>
<div as="Stack" gap="4">

## Related resources

- Programming timezones can be finicky. Get great tips in the article [UTC is for everyone right](https://zachholman.com/talk/utc-is-enough-for-everyone-right)?
- Learn about date formatting in the [Grammar and mechanics](/content/grammar-and-mechanics#date) guidelines.
- See how to craft effective button labels in the [Actionable language](/content/actionable-language) guidelines.

</div>
