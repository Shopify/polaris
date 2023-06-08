import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  AccountConnection,
  Box,
  Link,
  Text,
  VerticalStack,
} from '@shopify/polaris';

import {useFeatures} from '../../utilities/features';

export default {
  component: AccountConnection,
} as ComponentMeta<typeof AccountConnection>;

export function All() {
  return (
    <>
      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          Default
        </Text>
        <Default />
        <Box paddingBlockEnd="3" />
      </VerticalStack>
      <VerticalStack gap="4">
        <Text as="h2" variant="headingXl">
          With account connected
        </Text>
        <WithAccountConnected />
        <Box paddingBlockEnd="3" />
      </VerticalStack>
    </>
  );
}

export function Default() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? 'Olive Eight' : '';

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, []);

  const {polarisSummerEditions2023} = useFeatures();

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const connectText = polarisSummerEditions2023 ? (
    'Connect'
  ) : (
    <strong>Connect</strong>
  );
  const terms = connected ? null : (
    <p>
      By clicking {connectText}, you agree to accept Sample App’s{' '}
      <Link url="Example App">terms and conditions</Link>. You’ll pay a
      commission rate of 15% on sales made through Sample App.
    </p>
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
