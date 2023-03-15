import {useId} from 'react';

import type {ComplexAction} from '../../types';
import {SettingAction} from '../SettingAction';
import {buttonFrom} from '../Button';
import {LegacyCard} from '../LegacyCard';

export interface SettingToggleProps {
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to activated or deactivated */
  enabled?: boolean;
}

export function SettingToggle({enabled, action, children}: SettingToggleProps) {
  const id = useId();

  const actionMarkup = action
    ? buttonFrom(action, {
        primary: !enabled,
        role: 'switch',
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
