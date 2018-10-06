import * as React from 'react';
import {buttonFrom, Card} from 'src/components';
import {ComplexAction} from 'src/types';
// eslint-disable-next-line shopify/strict-component-boundaries
import SettingAction from 'src/components/SettingAction';

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
