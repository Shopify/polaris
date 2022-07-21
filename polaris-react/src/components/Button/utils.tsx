import React from 'react';

import type {ComplexAction} from '../../types';
import {tooltipFrom} from '../Tooltip';

import {Button, ButtonProps} from './Button';

export function buttonsFrom(
  action: ComplexAction,
  overrides?: Partial<ButtonProps>,
): React.ReactElement<ButtonProps>;
export function buttonsFrom(
  actions: ComplexAction[],
  overrides?: Partial<ButtonProps>,
): React.ReactElement<ButtonProps>[];
export function buttonsFrom(
  actions: ComplexAction[] | ComplexAction,
  overrides: Partial<ButtonProps> = {},
) {
  if (Array.isArray(actions)) {
    return actions.map((action, index) => buttonFrom(action, overrides, index));
  } else {
    const action = actions;
    return buttonFrom(action, overrides);
  }
}

export function buttonFrom(
  {content, onAction, tooltip, ...action}: ComplexAction,
  overrides?: Partial<ButtonProps>,
  key?: any,
) {
  const button = (
    <Button key={key} onClick={onAction} {...action} {...overrides}>
      {content}
    </Button>
  );

  return tooltip ? tooltipFrom(tooltip, button) : button;
}
