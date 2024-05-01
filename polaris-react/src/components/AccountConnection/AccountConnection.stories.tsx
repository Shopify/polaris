import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {AccountConnection, Box, Link, Text, BlockStack} from '@shopify/polaris';

export default {
  component: AccountConnection,
} as Meta<typeof AccountConnection>;

export const All = {
  render() {
    return (
      /* eslint-disable react/jsx-pascal-case */
      <>
        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            Default
          </Text>
          <Default.render />
          <Box paddingBlockEnd="300" />
        </BlockStack>
        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            With account connected
          </Text>
          <WithAccountConnected.render />
          <Box paddingBlockEnd="300" />
        </BlockStack>
      </>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export const Default = {
  render() {
    const [connected, setConnected] = useState(false);
    const accountName = connected ? 'Olive Eight' : '';

    const handleAction = useCallback(() => {
      setConnected((connected) => !connected);
    }, []);

    const buttonText = connected ? 'Disconnect' : 'Connect';
    const details = connected ? 'Account connected' : 'No account connected';

    const terms = connected ? null : (
      <Text as="p" variant="bodyMd">
        By clicking Connect, you agree to accept Sample App’s{' '}
        <Link url="Example App">terms and conditions</Link>. You’ll pay a
        commission rate of 15% on sales made through Sample App.
      </Text>
    );

    return (
      <AccountConnection
        accountName={accountName}
        connected={connected}
        title="Example App"
        action={{
          content: buttonText,
          onAction: handleAction,
        }}
        details={details}
        termsOfService={terms}
      />
    );
  },
};

export const WithAccountConnected = {
  render() {
    const [connected, setConnected] = useState(true);
    const accountName = connected ? 'Olive Eight' : '';

    const handleAction = useCallback(() => {
      setConnected((connected) => !connected);
    }, []);

    const buttonText = connected ? 'Disconnect' : 'Connect';
    const details = connected ? 'Account connected' : 'No account connected';

    return (
      <AccountConnection
        accountName={accountName}
        connected={connected}
        title="Example App"
        action={{
          content: buttonText,
          onAction: handleAction,
        }}
        details={details}
      />
    );
  },
};
