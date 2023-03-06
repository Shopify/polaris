import React, {useMemo} from 'react';

import type {ComplexAction} from '../../types';
import {buttonFrom} from '../Button';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {Text} from '../Text';
import {Badge, Status} from '../Badge';
import {useMediaQuery} from '../../utilities/media-query';
import {AlphaCard} from '../AlphaCard';
import {AlphaStack} from '../AlphaStack';
import {Inline} from '../Inline';

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
    <Inline align="space-between" wrap={false} fill>
      <Inline gap="2">
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
      </Inline>
      <Inline align="end">
        {!isNavigationCollapsed ? actionMarkup : null}
      </Inline>
    </Inline>
  );

  return (
    <AlphaCard>
      <AlphaStack gap="5">
        {settingTitle}
        <AlphaStack gap="5">
          <Text variant="bodyMd" as="p" color="subdued">
            {description}
          </Text>
          {isNavigationCollapsed ? actionMarkup : null}
        </AlphaStack>
        {children}
      </AlphaStack>
    </AlphaCard>
  );
}
