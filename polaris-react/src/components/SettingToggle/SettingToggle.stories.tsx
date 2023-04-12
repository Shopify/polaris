import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  SettingToggle,
  Text,
  HorizontalStack,
  Box,
  AlphaCard,
  Button,
  Badge,
  VerticalStack,
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
    <HorizontalStack gap="2" wrap={false}>
      <HorizontalStack gap="2" align="start" blockAlign="baseline">
        <label htmlFor={toggleId}>
          <Text variant="headingMd" as="h6">
            {title}
          </Text>
        </label>
        <HorizontalStack gap="2" align="center" blockAlign="center">
          {settingStatusMarkup}
          {helpLink}
        </HorizontalStack>
      </HorizontalStack>
    </HorizontalStack>
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
      <HorizontalStack
        gap="12"
        align="space-between"
        blockAlign="start"
        wrap={false}
      >
        {settingTitle}
        {!mdDown ? (
          <Box minWidth="fit-content">
            <HorizontalStack align="end">{actionMarkup}</HorizontalStack>
          </Box>
        ) : null}
      </HorizontalStack>
    </Box>
  );

  const descriptionMarkup = (
    <VerticalStack gap="4">
      <Text id={descriptionId} variant="bodyMd" as="p" color="subdued">
        {description}
      </Text>
      {mdDown ? (
        <Box width="100%">
          <HorizontalStack align="start">{actionMarkup}</HorizontalStack>
        </Box>
      ) : null}
    </VerticalStack>
  );

  return (
    <AlphaCard>
      <VerticalStack gap={{xs: '4', sm: '5'}}>
        <Box width="100%">
          <VerticalStack gap={{xs: '2', sm: '4'}}>
            {headerMarkup}
            {descriptionMarkup}
          </VerticalStack>
        </Box>
        <Text variant="bodyMd" as="p">
          Your checkout is only accepting test payments.
        </Text>
      </VerticalStack>
    </AlphaCard>
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
    <HorizontalStack gap="2" wrap={false}>
      <HorizontalStack gap="2" align="start" blockAlign="baseline">
        <label htmlFor={toggleId}>
          <Text variant="headingMd" as="h6">
            {title}
          </Text>
        </label>
        <HorizontalStack gap="2" align="center" blockAlign="center">
          {settingStatusMarkup}
          {helpLink}
        </HorizontalStack>
      </HorizontalStack>
    </HorizontalStack>
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
      <HorizontalStack
        gap="12"
        align="space-between"
        blockAlign="start"
        wrap={false}
      >
        {settingTitle}
        {!mdDown ? (
          <Box minWidth="fit-content">
            <HorizontalStack align="end">{actionMarkup}</HorizontalStack>
          </Box>
        ) : null}
      </HorizontalStack>
    </Box>
  );

  const descriptionMarkup = (
    <VerticalStack gap="4">
      <Text id={descriptionId} variant="bodyMd" as="p" color="subdued">
        {description}
      </Text>
      {mdDown ? (
        <Box width="100%">
          <HorizontalStack align="start">{actionMarkup}</HorizontalStack>
        </Box>
      ) : null}
    </VerticalStack>
  );

  return (
    <AlphaCard>
      <VerticalStack gap={{xs: '4', sm: '5'}}>
        <Box width="100%">
          <VerticalStack gap={{xs: '2', sm: '4'}}>
            {headerMarkup}
            {descriptionMarkup}
          </VerticalStack>
        </Box>
        <Text variant="bodyMd" as="p">
          Your checkout is only accepting test payments.
        </Text>
      </VerticalStack>
    </AlphaCard>
  );
}
