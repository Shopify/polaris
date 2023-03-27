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

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      `Deprecation: <SettingToggle /> is deprecated. This component will be removed in a future major version of Polaris. Use the primitive layout and typography components to compose a setting toggle card.
      See the "With primitive components" example in https://polaris.shopify.com/components/deprecated/setting-toggle`,
    );
  }

  const actionMarkup = action
    ? buttonFrom(action, {
        role: 'switch',
        id,
        ariaChecked: enabled ? 'true' : 'false',
        size: 'slim',
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
