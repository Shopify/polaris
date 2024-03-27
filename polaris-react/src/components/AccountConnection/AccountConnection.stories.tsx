import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AccountConnection, Box, Link, Text, BlockStack} from '@shopify/polaris';

export default {
  component: AccountConnection,
} as ComponentMeta<typeof AccountConnection>;

export function All() {
  return (
    <>
      <BlockStack gap="400">
        <Text as="h2" variant="headingXl">
          Default
        </Text>
        <Default />
        <Box paddingBlockEnd="300" />
      </BlockStack>
      <BlockStack gap="400">
        <Text as="h2" variant="headingXl">
          With account connected
        </Text>
        <WithAccountConnected />
        <Box paddingBlockEnd="300" />
      </BlockStack>
    </>
  );
}

export function Default() {
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
}

export function WithAccountConnected() {
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
}
