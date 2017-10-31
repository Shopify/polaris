import * as React from 'react';

import {buttonFrom} from '../Button';
import Card from '../Card';
import SettingAction from '../SettingAction';
import {ComplexAction} from '../../types';

export interface Props {
  enabled?: boolean,
  action?: ComplexAction,
  children?: React.ReactNode,
}

export default function SettingToggle({enabled, action, children}: Props) {
  const actionMarkup = action
    ? buttonFrom(action, {primary: !enabled})
    : null;

  return (
    <Card sectioned>
      <SettingAction action={actionMarkup}>
        {children}
      </SettingAction>
    </Card>
  );
}
