import React from 'react';
import type {Meta, StoryFn} from '@storybook/react';

import type {DisabledInfo} from './DisabledTooltipWrapper';
import {DisabledTooltipWrapper} from './DisabledTooltipWrapper';

const meta: Meta = {
  component: DisabledTooltipWrapper,
};

export default meta;

const Template: StoryFn<DisabledInfo> = () => (
  <div style={{width: '150px'}}>
    <DisabledTooltipWrapper
      disabled={{isDisabled: true, tooltipMessage: 'Tooltip message'}}
    >
      <div>I am content with a tooltip around me</div>
    </DisabledTooltipWrapper>
  </div>
);

export const Basic = Template.bind({});
