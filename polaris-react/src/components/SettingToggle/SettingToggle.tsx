import React, {useMemo} from 'react';

import type {ComplexAction} from '../../types';
import {buttonFrom} from '../Button';
import {LegacyCard} from '../LegacyCard';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {Stack} from '../Stack';
import {Text} from '../Text';
import {Badge, Status} from '../Badge';
import {useMediaQuery} from '../../utilities/media-query';

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
  settingStatus?: SettingsToggleBadge;
}

const getUniqueSettingToggleId = globalIdGeneratorFactory('SettingToggle');

export function SettingToggle({
  enabled,
  action,
  children,
  title,
  description,
  helpLink,
  settingStatus,
}: SettingToggleProps) {
  const id = useMemo(getUniqueSettingToggleId, []);
  const {isNavigationCollapsed} = useMediaQuery();

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
                ? settingStatus?.enabled.status || 'success'
                : settingStatus?.disabled.status
            }
          >
            {enabled
              ? settingStatus?.enabled.content
              : settingStatus?.disabled.content}
          </Badge>
          {helpLink}
        </Stack>
      </Stack.Item>
      {!isNavigationCollapsed ? actionMarkup : null}
    </Stack>
  );

  return (
    <LegacyCard title={settingTitle} sectioned>
      <Stack spacing="loose" vertical>
        <Text variant="bodyMd" as="p" color="subdued">
          {description}
        </Text>
        {isNavigationCollapsed ? actionMarkup : null}
      </Stack>
      {children}
    </LegacyCard>
  );
}
