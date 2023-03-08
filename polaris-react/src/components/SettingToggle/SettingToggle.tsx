import React, {useMemo} from 'react';

import type {ComplexAction} from '../../types';
import {buttonFrom} from '../Button';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {Text} from '../Text';
import {Badge} from '../Badge';
import {useMediaQuery} from '../../utilities/media-query';
import {AlphaCard} from '../AlphaCard';
import {AlphaStack} from '../AlphaStack';
import {Inline} from '../Inline';
import {Box} from '../Box';
import {useI18n} from '../../utilities/i18n';
import {WithinContentContext} from '../../utilities/within-content-context';

export interface SettingToggleProps {
  /** The action that toggles the setting on or off */
  action?: ComplexAction;
  /** Additional content informing merchants of the impact or requirements of the setting */
  children?: React.ReactNode;
  /** A description of what the setting controls */
  description?: string;
  /** Whether or not the setting is enabled */
  enabled?: boolean;
  /** The help link rendered in the setting */
  helpLink?: React.ReactNode;
  /** The name of the setting */
  title?: string;
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

  const badgeStatus = enabled ? 'success' : undefined;

  const badgeContent = enabled
    ? i18n.translate('Polaris.SettingToggle.status.enabled')
    : i18n.translate('Polaris.SettingToggle.status.disabled');

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
