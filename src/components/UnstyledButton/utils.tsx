import type {ComplexAction} from '../../types';

import {UnstyledButton, UnstyledButtonProps} from './UnstyledButton';

export function unstyledButtonFrom(
  {content, onAction, ...action}: ComplexAction,
  overrides?: Partial<UnstyledButtonProps>,
  key?: any,
) {
  return (
    <UnstyledButton key={key} onClick={onAction} {...action} {...overrides}>
      {content}
    </UnstyledButton>
  );
}
