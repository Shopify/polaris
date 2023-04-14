import {useState} from 'react';
import type {StoryFn} from '@storybook/react';

import type {DateRange} from '../../types';

import type {QuickPick, SectionDescriptor} from './QuickPicks';

import {QuickPicks} from '.';

export default {
  component: QuickPicks,
};

const Template: StoryFn = () => {
  const recommended: DateRange[] = [
    {
      title: 'BFCM 2022',
      alias: 'bfcm-2022',
      period: {since: '2022-01-01', until: '2022-03-31'},
    },
  ];

  const options: DateRange[] = [
    {
      title: 'Today',
      alias: 'today',
      period: {since: '2022-09-29', until: '2022-09-29'},
    },
    {
      title: 'Yesterday',
      alias: 'yesterday',
      period: {since: '2022-01-28', until: '2022-09-28'},
    },
  ];

  const sections: SectionDescriptor[] = [
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
      ],
    },
    {
      title: 'BFCM',
      options: [
        {
          title: 'BFCM 2022',
          alias: 'bfcm-2022',
          period: {since: '2022-01-01', until: '2022-03-31'},
        },
        {
          title: 'BFCM 2021',
          alias: 'bfcm-2021',
          period: {since: '2022-04-01', until: '2022-06-30'},
        },
      ],
    },
  ];

  const [selected, setSelected] = useState<QuickPick>({
    value: 'bfcm-2022',
    source: 'recommended-option',
    period: {since: '2022-01-01', until: '2022-03-31'},
  });

  return (
    <QuickPicks
      recommended={recommended}
      options={options}
      sections={sections}
      selected={selected}
      onSelect={setSelected}
    />
  );
};

export const Default = Template.bind({});
