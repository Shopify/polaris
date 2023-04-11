import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';
import type {DatePickerProps as Props} from '@shopify/polaris';

import {DatePicker} from './DatePicker';

const meta: Meta = {
  component: DatePicker,
};

export default meta;

const Template: StoryFn<Props> = (args) => <DatePicker {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  month: 6,
  year: 2020,
};
