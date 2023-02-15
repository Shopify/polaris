import React, {useMemo} from 'react';

import type {ComplexAction} from '../../types';
import {SettingAction} from '../SettingAction';
import {buttonFrom} from '../Button';
import {LegacyCard} from '../LegacyCard';
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
        role: 'switch',
        id,
        ariaChecked: enabled ? 'true' : 'false',
      })
    : null;

  return (
    <LegacyCard sectioned>
      <SettingAction action={actionMarkup}>
        <label htmlFor={id}>{children}</label>
      </SettingAction>
    </LegacyCard>
  );
}
