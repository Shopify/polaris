import React, {useMemo} from 'react';

import type {ComplexAction} from '../../types';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {buttonFrom} from '../Button';
import {Card} from '../Card';
import {SettingAction} from '../SettingAction';

export interface SettingToggleProps {
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to activated or deactivated */
  enabled?: boolean;
  /** Sets toggle state to intermediate / loading */
  loading?: boolean;
}

const getUniqueSettingToggleId = globalIdGeneratorFactory('SettingToggle');

export function SettingToggle({
  loading,
  enabled,
  action,
  children,
}: SettingToggleProps) {
  const id = useMemo(getUniqueSettingToggleId, []);

  const actionMarkup = action
    ? buttonFrom(action, {
        primary: !enabled,
        role: 'switch',
        id,
        loading,
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
