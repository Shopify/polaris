import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Banner,
  SettingToggle,
  Text,
  Inline,
  Box,
  AlphaCard,
  Button,
  Badge,
  AlphaStack,
} from '@shopify/polaris';

import {WithinContentContext} from '../../utilities/within-content-context';

export default {
  component: SettingToggle,
} as ComponentMeta<typeof SettingToggle>;

export function WithOnlyChildContent() {
  const [enabled, setEnabled] = useState(false);

  const toggleId = 'setting-toggle-uuid';

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  return (
    <AlphaCard>
      <WithinContentContext.Provider value>
        <Box width="100%">
          <Inline wrap gap="5" align="space-between" blockAlign="center">
            <label htmlFor={toggleId}>
              <Text as="p">
                Simulate transactions to test your checkout and order flows.
                When test mode is on, checkout does not accept real credit
                cards.
              </Text>
            </label>
            <Button
              role="switch"
              id={toggleId}
              ariaChecked={enabled ? 'true' : 'false'}
              onClick={handleToggle}
            >
              {contentStatus}
            </Button>
          </Inline>
        </Box>
      </WithinContentContext.Provider>
    </AlphaCard>
  );
}

export function WithTitleAndDescription() {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const toggleId = 'setting-toggle-uuid';
  const descriptionId = 'setting-toggle-description-uuid';

  function navigationBarCollapsed() {
    return typeof window === 'undefined'
      ? false
      : window.matchMedia(`(max-width: 767.95px)`).matches;
  }

  const isNavigationCollapsed = navigationBarCollapsed();

  const badgeStatus = enabled ? 'success' : undefined;

  const badgeContent = enabled ? 'On' : 'Off';

  const title = 'Test mode';
  const description =
    'Simulate transactions to test your checkout and order flows. When test mode is on, checkout does not accept real credit cards.';

  const settingStatusMarkup = (
    <Badge
      status={badgeStatus}
      statusAndProgressLabelOverride={`Setting is ${badgeContent}`}
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
    </Inline>
  ) : null;

  const actionMarkup = (
    <Button
      role="switch"
      id={toggleId}
      ariaChecked={enabled ? 'true' : 'false'}
      onClick={handleToggle}
    >
      {contentStatus}
    </Button>
  );

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
      </AlphaStack>
    </AlphaCard>
  );
}

export function WithLongTitleAndDescription() {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const toggleId = 'setting-toggle-uuid';
  const descriptionId = 'setting-toggle-description-uuid';

  function navigationBarCollapsed() {
    return typeof window === 'undefined'
      ? false
      : window.matchMedia(`(max-width: 767.95px)`).matches;
  }

  const isNavigationCollapsed = navigationBarCollapsed();

  const badgeStatus = enabled ? 'success' : undefined;

  const badgeContent = enabled ? 'On' : 'Off';

  const title =
    'Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode Test mode';
  const description =
    'Simulate transactions to test your checkout and order flows. When test mode is on, checkout does not accept real credit cards. Simulate transactions to test your checkout and order flows. When test mode is on, checkout does not accept real credit cards.';

  const settingStatusMarkup = (
    <Badge
      status={badgeStatus}
      statusAndProgressLabelOverride={`Setting is ${badgeContent}`}
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
    </Inline>
  ) : null;

  const actionMarkup = (
    <Button
      role="switch"
      id={toggleId}
      ariaChecked={enabled ? 'true' : 'false'}
      onClick={handleToggle}
    >
      {contentStatus}
    </Button>
  );

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
      </AlphaStack>
    </AlphaCard>
  );
}

export function WithAllOfItsElements() {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const toggleId = 'setting-toggle-uuid';
  const descriptionId = 'setting-toggle-description-uuid';

  function navigationBarCollapsed() {
    return typeof window === 'undefined'
      ? false
      : window.matchMedia(`(max-width: 767.95px)`).matches;
  }

  const isNavigationCollapsed = navigationBarCollapsed();

  const badgeStatus = enabled ? 'success' : undefined;

  const badgeContent = enabled ? 'On' : 'Off';

  const title = 'Test mode';
  const description =
    'Simulate transactions to test your checkout and order flows. When test mode is on, checkout does not accept real credit cards.';

  const settingStatusMarkup = (
    <Badge
      status={badgeStatus}
      statusAndProgressLabelOverride={`Setting is ${badgeContent}`}
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
    </Inline>
  ) : null;

  const actionMarkup = (
    <Button
      role="switch"
      id={toggleId}
      ariaChecked={enabled ? 'true' : 'false'}
      onClick={handleToggle}
    >
      {contentStatus}
    </Button>
  );

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
        Your checkout is only accepting test payments.
      </AlphaStack>
    </AlphaCard>
  );
}
