import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Tooltip} from '../../Tooltip';
import {Card} from '../../Card';
import {DisabledTooltipWrapper} from '../DisabledTooltipWrapper';
import type {DisabledInfo} from '../DisabledTooltipWrapper';

describe('<DisabledTooltipWrapper />', () => {
  const defaultProps: DisabledInfo = {
    isDisabled: true,
    tooltipMessage: 'Tooltip message',
  };

  const mockChildren = <Card>Mock children</Card>;

  it('does not render a Tooltip if the disabled prop is undefined', () => {
    const component = mountWithApp(
      <DisabledTooltipWrapper disabled={undefined}>
        {mockChildren}
      </DisabledTooltipWrapper>,
    );

    expect(component).not.toContainReactComponent(Tooltip);
  });

  it('does not render a Tooltip if isDisabled is undefined', () => {
    const component = mountWithApp(
      <DisabledTooltipWrapper
        disabled={{...defaultProps, isDisabled: undefined}}
      >
        {mockChildren}
      </DisabledTooltipWrapper>,
    );

    expect(component).not.toContainReactComponent(Tooltip);
  });

  it('does not render a Tooltip if isDisabled is false', () => {
    const component = mountWithApp(
      <DisabledTooltipWrapper disabled={{...defaultProps, isDisabled: false}}>
        {mockChildren}
      </DisabledTooltipWrapper>,
    );

    expect(component).not.toContainReactComponent(Tooltip);
  });

  it('does not render a Tooltip if tooltipMessage is undefined', () => {
    const component = mountWithApp(
      <DisabledTooltipWrapper
        disabled={{...defaultProps, tooltipMessage: undefined}}
      >
        {mockChildren}
      </DisabledTooltipWrapper>,
    );

    expect(component).not.toContainReactComponent(Tooltip);
  });

  it('renders a Tooltip if isDisabled is true', () => {
    const component = mountWithApp(
      <DisabledTooltipWrapper disabled={{...defaultProps}}>
        {mockChildren}
      </DisabledTooltipWrapper>,
    );

    expect(component).toContainReactComponent(Tooltip, {
      content: defaultProps.tooltipMessage,
      children: mockChildren,
    });
  });
});
