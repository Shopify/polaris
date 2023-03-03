import React, {useMemo} from 'react';

import type {ComplexAction} from '../../types';
import {buttonFrom} from '../Button';
import {LegacyCard} from '../LegacyCard';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {Stack} from '../Stack';
import {Text} from '../Text';
import {Badge, Status} from '../Badge';

interface SettingsToggleBadge {
  enabled: {content: string; status?: Status};
  disabled: {content: string; status?: Status};
}

export interface SettingToggleProps {
  /** Inner content of the card */
  children?: React.ReactNode;
  /** The title in the header of the settings toggle */
  title?: string;
  /** The description of the settings toggle */
  description?: string;
  /** The help link rendered in the settings toggle */
  helpLink?: React.ReactNode;
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to activated or deactivated */
  enabled?: boolean;
  /** The content that should be rendered in the badge for setting status */
  headerBadge?: SettingsToggleBadge;
}

const getUniqueSettingToggleId = globalIdGeneratorFactory('SettingToggle');

export function SettingToggle({
  enabled,
  action,
  children,
  title,
  description,
  helpLink,
  headerBadge,
}: SettingToggleProps) {
  const id = useMemo(getUniqueSettingToggleId, []);

  const actionMarkup = action
    ? buttonFrom(action, {
        role: 'switch',
        id,
        ariaChecked: enabled ? 'true' : 'false',
      })
    : null;

  const settingTitle = (
    <Stack alignment="center" wrap={false}>
      <Stack.Item fill>
        <Stack spacing="tight" alignment="center">
          <Text variant="headingMd" as="h6">
            {title}
          </Text>
          <Badge
            status={
              enabled
                ? headerBadge?.enabled.status || 'success'
                : headerBadge?.disabled.status
            }
          >
            {enabled
              ? headerBadge?.enabled.content
              : headerBadge?.disabled.content}
          </Badge>
          {helpLink}
        </Stack>
      </Stack.Item>
      {actionMarkup}
    </Stack>
  );

  return (
    <LegacyCard title={settingTitle} sectioned>
      <Stack spacing="loose" vertical>
        <Text variant="bodyMd" as="p">
          {description}
        </Text>
      </Stack>
      {children}
      {/* <SettingAction action={actionMarkup}>
        <label htmlFor={id}>{children}</label>
      </SettingAction> */}
    </LegacyCard>
  );
}
