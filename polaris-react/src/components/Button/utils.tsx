import React from 'react';

import type {ComplexAction} from '../../types';

import {Button} from './Button';
import type {ButtonProps} from './Button';

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
  {content, onAction, plain, destructive, ...action}: ComplexAction,
  overrides?: Partial<ButtonProps>,
  key?: any,
) {
  const plainVariant = plain ? 'plain' : undefined;
  const destructiveVariant = destructive ? 'primary' : undefined;
  const tone = !overrides?.tone && destructive ? 'critical' : overrides?.tone;

  return (
    <Button
      key={key}
      onClick={onAction}
      tone={tone}
      variant={plainVariant || destructiveVariant}
      {...action}
      {...overrides}
    >
      {content}
    </Button>
  );
}
