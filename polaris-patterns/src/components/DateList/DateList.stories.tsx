import React, {useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {DateList} from '@shopify/polaris-patterns';

export default {
  component: DateList,
} as ComponentMeta<typeof DateList>;

const ranges = [
  {
    label: 'No Date',
    value: 'no-date',
    period: null,
  },
  {
    label: 'Today',
    value: 'today',
    period: {
      since: Date.now().toString(),
      until: Date.now().toString(),
    },
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
    period: {
      since: Date.now().toString(),
      until: Date.now().toString(),
    },
  },
  {
    label: 'Last 7 days',
    value: 'last7days',
    period: {
      since: '-7d',
      until: '-1d',
    },
  },
];
export function Default() {
  const [selected, setSelected] = useState(ranges[0]);
  const handleOnChange = (value) => {
    const validRange = ranges.find((range) => range.value === value[0]);
    if (validRange) {
      setSelected(validRange);
    }
  };
  return (
    <DateList options={ranges} selected={selected} onChange={handleOnChange} />
  );
}
