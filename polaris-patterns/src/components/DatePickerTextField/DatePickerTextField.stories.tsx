import React, {useState} from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import {DatePickerTextField} from './DatePickerTextField';
import type {Props} from './DatePickerTextField';

const meta: Meta = {
  component: DatePickerTextField,
};

export default meta;

const Template: StoryFn<Props> = (args) => {
  const [value, setValue] = useState(args.value);

  return <DatePickerTextField {...args} value={value} onChange={setValue} />;
};

const TemplateBlur: StoryFn<Props> = (args) => {
  const [value, setValue] = useState(args.value);
  const [result, setResult] = useState('');

  return (
    <>
      <DatePickerTextField
        {...args}
        value={value}
        onChange={setValue}
        onBlur={setResult}
      />
      <div>Value: {result}</div>
    </>
  );
};

const defaultArgs = {
  value: '2022-07-15',
  label: 'Date',
  onChange: () => {},
  onBlur: () => {},
};

export const Basic = Template.bind({});
export const FormatOnBlur = Template.bind({});
export const HelpText = Template.bind({});
export const NoDatePicker = Template.bind({});
export const ReturnOnBlur = TemplateBlur.bind({});

Basic.args = {
  ...defaultArgs,
};
FormatOnBlur.args = {
  ...defaultArgs,
  formatDateOnBlur: true,
};
HelpText.args = {
  ...defaultArgs,
  helpText: 'Please enter a date in YYYY-MM-DD format',
};
NoDatePicker.args = {
  ...defaultArgs,
  hideDatePicker: true,
};
ReturnOnBlur.args = {
  ...defaultArgs,
  formatDateOnBlur: true,
};
