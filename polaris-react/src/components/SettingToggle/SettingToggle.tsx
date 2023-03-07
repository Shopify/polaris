import React, {useMemo} from 'react';

import type {ComplexAction} from '../../types';
import {buttonFrom} from '../Button';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {Text} from '../Text';
import {Badge, Status, StatusValue} from '../Badge';
import {useMediaQuery} from '../../utilities/media-query';
import {AlphaCard} from '../AlphaCard';
import {AlphaStack} from '../AlphaStack';
import {Inline} from '../Inline';
import {Box} from '../Box';
import {useI18n} from '../../utilities/i18n';
import {WithinContentContext} from '../../utilities/within-content-context';

interface SettingsToggleBadge {
  enabled: {content: string; status?: Status};
  disabled: {content: string; status?: Status};
}

export interface SettingToggleProps {
  /** Inner content of the card */
  children?: React.ReactNode;
  /** Card header actions */
  action?: ComplexAction;
  /** Sets toggle state to on or off */
  enabled?: boolean;
  /** The title in the header of the settings toggle */
  title?: string;
  /** The description of the settings toggle */
  description?: string;
  /** The help link rendered in the settings toggle */
  helpLink?: React.ReactNode;
  /** The content that should be rendered in the badge for setting status */
  settingStatus?: SettingsToggleBadge;
}

const getUniqueSettingToggleId = globalIdGeneratorFactory('SettingToggle');
const getUniqueDescriptionId = globalIdGeneratorFactory(
  'SettingToggleDescription',
);

export function SettingToggle({
  enabled,
  action,
  children,
  title,
  description,
  helpLink,
  settingStatus,
}: SettingToggleProps) {
  const toggleId = useMemo(getUniqueSettingToggleId, []);
  const descriptionId = useMemo(getUniqueDescriptionId, []);

  const {isNavigationCollapsed} = useMediaQuery();

  const i18n = useI18n();

  const actionMarkup = action
    ? buttonFrom(action, {
        role: 'switch',
        id: toggleId,
        ariaChecked: enabled ? 'true' : 'false',
        ariaDescribedBy: description ? descriptionId : undefined,
      })
    : null;

  // Accounts for the old API where the description was passed as a child
  if (!title && !description) {
    return (
      <AlphaCard>
        <WithinContentContext.Provider value>
          <Box width="100%">
            <Inline wrap gap="5" align="space-between" blockAlign="center">
              <label htmlFor={toggleId}>{children}</label>
              {actionMarkup}
            </Inline>
          </Box>
        </WithinContentContext.Provider>
      </AlphaCard>
    );
  }

  const defaultSettingStatus = {
    enabled: {
      status: StatusValue.Success,
      content: i18n.translate('Polaris.SettingToggle.status.enabled'),
    },
    disabled: {
      content: i18n.translate('Polaris.SettingToggle.status.disabled'),
    },
  };

  const badgeStatus: Status = enabled
    ? settingStatus?.enabled.status || defaultSettingStatus.enabled.status
    : settingStatus?.disabled.status;

  const badgeContent = enabled
    ? settingStatus?.enabled.content || defaultSettingStatus.enabled.content
    : settingStatus?.disabled.content || defaultSettingStatus.disabled.content;

  const settingStatusMarkup = (
    <Badge
      status={badgeStatus}
      statusAndProgressLabelOverride={i18n.translate(
        'Polaris.SettingToggle.status.accessibilityLabel',
        {status: badgeContent},
      )}
    >
      {badgeContent}
    </Badge>
  );

  const settingTitle = title ? (
    <Inline gap="2" wrap={false}>
      <label htmlFor={toggleId}>
        <Inline gap="2" align="start" blockAlign="baseline" wrap={false}>
          <Text variant="headingMd" as="h6">
            {title}
          </Text>
          {settingStatusMarkup}
        </Inline>
      </label>
      {helpLink}
    </Inline>
  ) : null;

  const headerMarkup = (
    <Box width="100%">
      <Inline gap="12" align="space-between" blockAlign="start" wrap={false}>
        {settingTitle}
        {!isNavigationCollapsed ? (
          <Box minWidth="fit-content">
            <Inline align="end">{actionMarkup}</Inline>
          </Box>
        ) : null}
      </Inline>
    </Box>
  );

  const descriptionMarkup = (
    <AlphaStack gap="4">
      <Text id={descriptionId} variant="bodyMd" as="p" color="subdued">
        {description}
      </Text>
      {isNavigationCollapsed ? (
        <Box width="100%">
          <Inline align="start">{actionMarkup}</Inline>
        </Box>
      ) : null}
    </AlphaStack>
  );

  return (
    <AlphaCard>
      <AlphaStack gap={{xs: '4', sm: '5'}}>
        <Box width="100%">
          <AlphaStack gap={{xs: '2', sm: '4'}}>
            {headerMarkup}
            {descriptionMarkup}
          </AlphaStack>
        </Box>

        <WithinContentContext.Provider value>
          {children}
        </WithinContentContext.Provider>
      </AlphaStack>
    </AlphaCard>
  );
}
