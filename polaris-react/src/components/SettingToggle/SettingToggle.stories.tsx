import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {
  SettingToggle,
  Text,
  InlineStack,
  Box,
  Card,
  Button,
  Badge,
  BlockStack,
  useBreakpoints,
} from '@shopify/polaris';
import {InfoIcon} from '@shopify/polaris-icons';

export default {
  component: SettingToggle,
} as Meta<typeof SettingToggle>;

export const WithDeprecatedComponent = {
  render() {
    const [enabled, setEnabled] = useState(false);

    const contentStatus = enabled ? 'Turn off' : 'Turn on';

    const handleToggle = useCallback(
      () => setEnabled((enabled) => !enabled),
      [],
    );

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
  },
};

export const WithPrimitiveComponents = {
  render() {
    const [enabled, setEnabled] = useState(true);

    const handleToggle = useCallback(
      () => setEnabled((enabled) => !enabled),
      [],
    );

    const contentStatus = enabled ? 'Turn off' : 'Turn on';

    const toggleId = 'setting-toggle-uuid';
    const descriptionId = 'setting-toggle-description-uuid';

    const {mdDown} = useBreakpoints();

    const badgeTone = enabled ? 'success' : undefined;

    const badgeContent = enabled ? 'On' : 'Off';

    const title = 'Test mode';
    const description =
      'Simulate transactions to test your checkout and order flows. When test mode is on, checkout does not accept real credit cards.';

    const settingStatusMarkup = (
      <Badge
        tone={badgeTone}
        toneAndProgressLabelOverride={`Setting is ${badgeContent}`}
      >
        {badgeContent}
      </Badge>
    );

    const helpLink = (
      <Button variant="plain" icon={InfoIcon} accessibilityLabel="Learn more" />
    );

    const settingTitle = title ? (
      <InlineStack gap="200" wrap={false}>
        <InlineStack gap="200" align="start" blockAlign="baseline">
          <label htmlFor={toggleId}>
            <Text variant="headingMd" as="h6">
              {title}
            </Text>
          </label>
          <InlineStack gap="200" align="center" blockAlign="center">
            {settingStatusMarkup}
            {helpLink}
          </InlineStack>
        </InlineStack>
      </InlineStack>
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
        <InlineStack
          gap="1200"
          align="space-between"
          blockAlign="start"
          wrap={false}
        >
          {settingTitle}
          {!mdDown ? (
            <Box minWidth="fit-content">
              <InlineStack align="end">{actionMarkup}</InlineStack>
            </Box>
          ) : null}
        </InlineStack>
      </Box>
    );

    const descriptionMarkup = (
      <BlockStack gap="400">
        <Text id={descriptionId} variant="bodyMd" as="p" tone="subdued">
          {description}
        </Text>
        {mdDown ? (
          <Box width="100%">
            <InlineStack align="start">{actionMarkup}</InlineStack>
          </Box>
        ) : null}
      </BlockStack>
    );

    return (
      <Card>
        <BlockStack gap={{xs: '400', sm: '500'}}>
          <Box width="100%">
            <BlockStack gap={{xs: '200', sm: '400'}}>
              {headerMarkup}
              {descriptionMarkup}
            </BlockStack>
          </Box>
          <Text variant="bodyMd" as="p">
            Your checkout is only accepting test payments.
          </Text>
        </BlockStack>
      </Card>
    );
  },
};

export const WithPrimitiveComponentsAndLongTitle = {
  render() {
    const [enabled, setEnabled] = useState(true);

    const handleToggle = useCallback(
      () => setEnabled((enabled) => !enabled),
      [],
    );

    const contentStatus = enabled ? 'Turn off' : 'Turn on';

    const toggleId = 'setting-toggle-uuid';
    const descriptionId = 'setting-toggle-description-uuid';

    const {mdDown} = useBreakpoints();

    const badgeTone = enabled ? 'success' : undefined;

    const badgeContent = enabled ? 'On' : 'Off';

    const title =
      'Test mode but with very long mega title that wraps to demonstrate how layout changes';
    const description =
      'Simulate transactions to test your checkout and order flows. When test mode is on, checkout does not accept real credit cards.';

    const settingStatusMarkup = (
      <Badge
        tone={badgeTone}
        toneAndProgressLabelOverride={`Setting is ${badgeContent}`}
      >
        {badgeContent}
      </Badge>
    );

    const helpLink = (
      <Button variant="plain" icon={InfoIcon} accessibilityLabel="Learn more" />
    );

    const settingTitle = title ? (
      <InlineStack gap="200" wrap={false}>
        <InlineStack gap="200" align="start" blockAlign="baseline">
          <label htmlFor={toggleId}>
            <Text variant="headingMd" as="h6">
              {title}
            </Text>
          </label>
          <InlineStack gap="200" align="center" blockAlign="center">
            {settingStatusMarkup}
            {helpLink}
          </InlineStack>
        </InlineStack>
      </InlineStack>
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
        <InlineStack
          gap="1200"
          align="space-between"
          blockAlign="start"
          wrap={false}
        >
          {settingTitle}
          {!mdDown ? (
            <Box minWidth="fit-content">
              <InlineStack align="end">{actionMarkup}</InlineStack>
            </Box>
          ) : null}
        </InlineStack>
      </Box>
    );

    const descriptionMarkup = (
      <BlockStack gap="400">
        <Text id={descriptionId} variant="bodyMd" as="p" tone="subdued">
          {description}
        </Text>
        {mdDown ? (
          <Box width="100%">
            <InlineStack align="start">{actionMarkup}</InlineStack>
          </Box>
        ) : null}
      </BlockStack>
    );

    return (
      <Card>
        <BlockStack gap={{xs: '400', sm: '500'}}>
          <Box width="100%">
            <BlockStack gap={{xs: '200', sm: '400'}}>
              {headerMarkup}
              {descriptionMarkup}
            </BlockStack>
          </Box>
          <Text variant="bodyMd" as="p">
            Your checkout is only accepting test payments.
          </Text>
        </BlockStack>
      </Card>
    );
  },
};
