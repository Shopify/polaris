import React from 'react';
import type {ComponentMeta} from '@storybook/react';

import {Box} from '../Box';
import {BlockStack} from '../BlockStack';
import {Text} from '../Text';

import {AppCardAction} from './AppCardAction';
import {AppCardActionEnum} from './types';

export default {
  component: AppCardAction,
} as ComponentMeta<typeof AppCardAction>;

export function Default() {
  return <AppCardAction />;
}

export function InstallAction() {
  return (
    <AppCardAction
      action={{
        type: AppCardActionEnum.Install,
      }}
    />
  );
}

export function OpenAction() {
  return (
    <AppCardAction
      action={{
        type: AppCardActionEnum.Open,
      }}
    />
  );
}

export function Variants() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Default
        </Text>
        <Box maxWidth="90px">
          <AppCardAction variant="default" />
        </Box>
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Narrow
        </Text>
        <Box maxWidth="90px">
          <AppCardAction variant="narrow" />
        </Box>
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Full
        </Text>
        <AppCardAction variant="full" />
      </BlockStack>
    </BlockStack>
  );
}

export function Sizes() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Micro
        </Text>
        <AppCardAction size="micro" />
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Slim
        </Text>
        <AppCardAction size="slim" />
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Medium
        </Text>
        <AppCardAction size="medium" />
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Large
        </Text>
        <AppCardAction size="large" />
      </BlockStack>
    </BlockStack>
  );
}

export function Disabled() {
  return (
    <AppCardAction action={{type: AppCardActionEnum.Install, disabled: true}} />
  );
}

export function Loading() {
  return (
    <AppCardAction action={{type: AppCardActionEnum.Install, loading: true}} />
  );
}
