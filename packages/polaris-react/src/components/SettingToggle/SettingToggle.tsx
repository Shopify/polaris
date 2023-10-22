import React, {useId} from 'react';

import type {ComplexAction} from '../../types';
import {SettingAction} from '../SettingAction';
import {buttonFrom} from '../Button';
// eslint-disable-next-line import/no-deprecated
import {LegacyCard} from '../LegacyCard';

export interface SettingToggleProps {
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to activated or deactivated */
  enabled?: boolean;
}

/**
 * @deprecated The SettingToggle component will be removed in v12
 * See the "With primitive components" example to learn how to compose
 * setting toggles with layout and typography primitives.
 * https://polaris.shopify.com/components/deprecated/setting-toggle
 */
export function SettingToggle({enabled, action, children}: SettingToggleProps) {
  const id = useId();

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
