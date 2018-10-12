import * as React from 'react';
import {buttonFrom, Card} from 'components';
// eslint-disable-next-line shopify/strict-component-boundaries
import SettingAction from 'components/SettingAction';
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
