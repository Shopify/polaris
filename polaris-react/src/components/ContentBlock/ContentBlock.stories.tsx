import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ContentBlock, Box, Text} from '@shopify/polaris';

export default {
  component: ContentBlock,
} as ComponentMeta<typeof ContentBlock>;

const placeHolder = {
  background: 'var(--p-background-selected)',
  borderRadius: 'var(--p-border-radius-05)',
  border: '1px solid var(--p-surface-dark)',
  padding: 'var(--p-space-4)',
  width: '100%',
  height: 'var(--p-space-32)',
};

export function Medium() {
  return (
    <ContentBlock width="medium">
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text variant="bodySm" as="h3" alignment="center">
          medium
        </Text>
      </Box>
    </ContentBlock>
  );
}

export function Large() {
  return (
    <ContentBlock width="large">
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text variant="bodySm" as="h3" alignment="center">
          large
        </Text>
      </Box>
    </ContentBlock>
  );
}
