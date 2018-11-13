import * as React from 'react';
import SettingAction from '../SettingAction';
import {buttonFrom, Card} from '..';
import {ComplexAction} from '../../types';

export interface Props {
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to enabled or disabled */
  enabled?: boolean;
}

export default function SettingToggle({enabled, action, children}: Props) {
  const actionMarkup = action ? buttonFrom(action, {primary: !enabled}) : null;

  return (
    <Card sectioned>
      <SettingAction action={actionMarkup}>{children}</SettingAction>
    </Card>
  );
}
