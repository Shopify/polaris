import {useState} from 'react';
import type {StoryFn} from '@storybook/react';
import {Box} from '@shopify/polaris';
import type {DatePeriod} from 'utilities/reportify';

import {DateRange} from './DateRange';
import type {Props, QuickPicks} from './DateRange';

export default {
  component: DateRange,
};

const mockQuickPicks: QuickPicks = {
  options: [
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
  ],
  sections: [
    {
      title: 'Quarters',
      options: [
        {
          title: 'Quarter 1',
          alias: 'quarter1',
          period: {since: '2022-01-01', until: '2022-03-31'},
        },
        {
          title: 'Quarter 2',
          alias: 'quarter2',
          period: {since: '2022-04-01', until: '2022-06-30'},
        },
        {
          title: 'Quarter 3',
          alias: 'quarter 3',
          period: {since: '2022-07-01', until: '2022-09-30'},
        },
        {
          title: 'Quarter 4',
          alias: 'quarter4',
          period: {since: '2022-10-01', until: '2022-12-31'},
        },
      ],
    },
  ],
};

const Template: StoryFn<Props> = (args) => {
  const [reportingPeriod, setReportingPeriod] = useState<DatePeriod>({
    since: new Date(),
    until: new Date(),
  });

  const handleChange = (newReportingPeriod: DatePeriod) => {
    setReportingPeriod(newReportingPeriod);
  };

  return (
    <DatePicker
      {...args}
      quickPicks={mockQuickPicks}
      datePeriod={reportingPeriod}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});

export const NoPopover: StoryFn<Props> = () => {
  const [reportingPeriod, setReportingPeriod] = useState<DatePeriod>({
    since: new Date(),
    until: new Date(),
  });

  const handleChange = (newReportingPeriod: DatePeriod) => {
    setReportingPeriod(newReportingPeriod);
  };

  return (
    <Box
      maxWidth="fit-content"
      background="surface"
      overflowX="hidden"
      overflowY="hidden"
    >
      <DatePicker
        quickPicks={mockQuickPicks}
        datePeriod={reportingPeriod}
        onChange={handleChange}
        popoverOptions={{shouldRenderPopover: false}}
      />
    </Box>
  );
};
Default.args = {};
