import * as React from 'react';

import {ComplexAction} from '../../types';
import SettingAction from '../SettingAction';
import {buttonFrom} from '../Button';
import Card from '../Card';

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
