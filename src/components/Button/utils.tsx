import * as React from 'react';
import Button, {Props} from './Button';
import {ComplexAction} from '../../types';

export function buttonsFrom(
  action: ComplexAction,
  overrides?: Partial<Props>,
): React.ReactElement<Props>;
export function buttonsFrom(
  actions: ComplexAction[],
  overrides?: Partial<Props>,
): React.ReactElement<Props>[];
export function buttonsFrom(
  actions: ComplexAction[] | ComplexAction,
  overrides: Partial<Props> = {},
) {
  if (Array.isArray(actions)) {
    return actions.map((action, index) => buttonFrom(action, overrides, index));
  } else {
    const action = actions;
    return buttonFrom(action, overrides);
  }
}

export function buttonFrom(
  {content, onAction, ...action}: ComplexAction,
  overrides?: Partial<Props>,
  key?: any,
) {
  return (
    <Button key={key} onClick={onAction} {...action} {...overrides}>
      {content}
    </Button>
  );
}
