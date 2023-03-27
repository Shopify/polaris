import React from 'react';

import type {ComplexAction} from '../../types';

import {UnstyledButton} from './UnstyledButton';
import type {UnstyledButtonProps} from './UnstyledButton';

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
