import React, {useState} from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import type {StringDatePeriod} from './types';
import {DateRangePicker} from './DateRangePicker';
import type {Props} from './DateRangePicker';

const meta: Meta = {
  component: DateRangePicker,
};

export default meta;

const Template: StoryFn<Props> = (args) => {
  const [selectedRange, setSelectedRange] = useState<StringDatePeriod | null>(
    null,
  );
  const [savedComparisonRange, setComparisonRange] =
    useState<StringDatePeriod | null>(null);
  const onChange = (selectedRange, comparisonRange) => {
    setSelectedRange(selectedRange);
    if (comparisonRange && savedComparisonRange !== comparisonRange) {
      setComparisonRange(comparisonRange);
    }
  };
  return <DateRangePicker {...args} showComparisonRange onChange={onChange} />;
};

const TemplateBlur: StoryFn<Props> = (args) => {
  const [selectedRange, setSelectedRange] = useState<StringDatePeriod | null>(
    null,
  );
  const [savedComparisonRange, setComparisonRange] =
    useState<StringDatePeriod | null>(null);
  const onChange = (selectedRange, comparisonRange) => {
    setSelectedRange(selectedRange);
    if (comparisonRange && savedComparisonRange !== comparisonRange) {
      setComparisonRange(comparisonRange);
    }
  };

  return (
    <>
      <DateRangePicker {...args} onChange={onChange} />
      <div>Value: {JSON.stringify(selectedRange, null, 2)}</div>
    </>
  );
};

const defaultArgs = {
  initialRange: {
    since: new Date('2023-03-01'),
    until: new Date('2023-03-08'),
  },
  onChange: () => {},
  timeZone: 'UTC',
};

export const Basic = Template.bind({});

Basic.args = {
  ...defaultArgs,
};
