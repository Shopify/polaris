import React, {useMemo} from 'react';

import type {ComplexAction} from '../../types';
import {SettingAction} from '../SettingAction';
import {buttonFrom} from '../Button';
import {Card} from 'components';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';

export interface SettingToggleProps {
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to activated or deactivated */
  enabled?: boolean;
}

const getUniqueSettingToggleId = globalIdGeneratorFactory('SettingToggle');

export function SettingToggle({enabled, action, children}: SettingToggleProps) {
  const id = useMemo(getUniqueSettingToggleId, []);

  const actionMarkup = action
    ? buttonFrom(action, {
        primary: !enabled,
        role: 'switch',
        id,
        ariaChecked: enabled ? 'true' : 'false',
      })
    : null;

  return (
    <Card sectioned>
      <SettingAction action={actionMarkup}>
        <label htmlFor={id}>{children}</label>
      </SettingAction>
    </Card>
  );
}
