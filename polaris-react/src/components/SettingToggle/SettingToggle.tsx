import React from 'react';

import type {ComplexAction} from '../../types';
import {SettingAction} from '../SettingAction';
import {buttonFrom} from '../Button';
import {Card} from '../Card';

export interface SettingToggleProps {
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to activated or deactivated */
  enabled?: boolean;
}

export function SettingToggle({enabled, action, children}: SettingToggleProps) {
  const actionMarkup = action ? buttonFrom(action, {primary: !enabled}) : null;

  return (
    <Card sectioned>
      <SettingAction action={actionMarkup}>{children}</SettingAction>
    </Card>
  );
}
