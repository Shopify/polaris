import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  SettingToggle,
  Text,
  Inline,
  Box,
  Card,
  Button,
  Badge,
  Stack,
  useBreakpoints,
} from '@shopify/polaris';
import {CircleInformationMajor} from '@shopify/polaris-icons';

export default {
  component: SettingToggle,
} as ComponentMeta<typeof SettingToggle>;

export function WithDeprecatedComponent() {
  const [enabled, setEnabled] = useState(false);

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  return (
    <SettingToggle
      enabled={enabled}
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
    >
      <Text as="p">
        Simulate transactions to test your checkout and order flows. When test
        mode is on, checkout does not accept real credit cards.
      </Text>
    </SettingToggle>
  );
}

export function WithPrimitiveComponents() {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const toggleId = 'setting-toggle-uuid';
  const descriptionId = 'setting-toggle-description-uuid';

  const {mdDown} = useBreakpoints();

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

  const helpLink = (
    <Button
      plain
      icon={CircleInformationMajor}
      accessibilityLabel="Learn more"
    />
  );

  const settingTitle = title ? (
    <Inline gap="2" wrap={false}>
      <Inline gap="2" align="start" blockAlign="baseline">
        <label htmlFor={toggleId}>
          <Text variant="headingMd" as="h6">
            {title}
          </Text>
        </label>
        <Inline gap="2" align="center" blockAlign="center">
          {settingStatusMarkup}
          {helpLink}
        </Inline>
      </Inline>
    </Inline>
  ) : null;

  const actionMarkup = (
    <Button
      role="switch"
      id={toggleId}
      ariaChecked={enabled ? 'true' : 'false'}
      onClick={handleToggle}
      size="slim"
    >
      {contentStatus}
    </Button>
  );

  const headerMarkup = (
    <Box width="100%">
      <Inline gap="12" align="space-between" blockAlign="start" wrap={false}>
        {settingTitle}
        {!mdDown ? (
          <Box minWidth="fit-content">
            <Inline align="end">{actionMarkup}</Inline>
          </Box>
        ) : null}
      </Inline>
    </Box>
  );

  const descriptionMarkup = (
    <Stack gap="4">
      <Text id={descriptionId} variant="bodyMd" as="p" color="subdued">
        {description}
      </Text>
      {mdDown ? (
        <Box width="100%">
          <Inline align="start">{actionMarkup}</Inline>
        </Box>
      ) : null}
    </Stack>
  );

  return (
    <Card>
      <Stack gap={{xs: '4', sm: '5'}}>
        <Box width="100%">
          <Stack gap={{xs: '2', sm: '4'}}>
            {headerMarkup}
            {descriptionMarkup}
          </Stack>
        </Box>
        <Text variant="bodyMd" as="p">
          Your checkout is only accepting test payments.
        </Text>
      </Stack>
    </Card>
  );
}

export function WithPrimitiveComponentsAndLongTitle() {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  const contentStatus = enabled ? 'Turn off' : 'Turn on';

  const toggleId = 'setting-toggle-uuid';
  const descriptionId = 'setting-toggle-description-uuid';

  const {mdDown} = useBreakpoints();

  const badgeStatus = enabled ? 'success' : undefined;

  const badgeContent = enabled ? 'On' : 'Off';

  const title =
    'Test mode but with very long mega title that wraps to demonstrate how layout changes';
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

  const helpLink = (
    <Button
      plain
      icon={CircleInformationMajor}
      accessibilityLabel="Learn more"
    />
  );

  const settingTitle = title ? (
    <Inline gap="2" wrap={false}>
      <Inline gap="2" align="start" blockAlign="baseline">
        <label htmlFor={toggleId}>
          <Text variant="headingMd" as="h6">
            {title}
          </Text>
        </label>
        <Inline gap="2" align="center" blockAlign="center">
          {settingStatusMarkup}
          {helpLink}
        </Inline>
      </Inline>
    </Inline>
  ) : null;

  const actionMarkup = (
    <Button
      role="switch"
      id={toggleId}
      ariaChecked={enabled ? 'true' : 'false'}
      onClick={handleToggle}
      size="slim"
    >
      {contentStatus}
    </Button>
  );

  const headerMarkup = (
    <Box width="100%">
      <Inline gap="12" align="space-between" blockAlign="start" wrap={false}>
        {settingTitle}
        {!mdDown ? (
          <Box minWidth="fit-content">
            <Inline align="end">{actionMarkup}</Inline>
          </Box>
        ) : null}
      </Inline>
    </Box>
  );

  const descriptionMarkup = (
    <Stack gap="4">
      <Text id={descriptionId} variant="bodyMd" as="p" color="subdued">
        {description}
      </Text>
      {mdDown ? (
        <Box width="100%">
          <Inline align="start">{actionMarkup}</Inline>
        </Box>
      ) : null}
    </Stack>
  );

  return (
    <Card>
      <Stack gap={{xs: '4', sm: '5'}}>
        <Box width="100%">
          <Stack gap={{xs: '2', sm: '4'}}>
            {headerMarkup}
            {descriptionMarkup}
          </Stack>
        </Box>
        <Text variant="bodyMd" as="p">
          Your checkout is only accepting test payments.
        </Text>
      </Stack>
    </Card>
  );
}
