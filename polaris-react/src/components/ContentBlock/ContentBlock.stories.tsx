import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ContentBlock, Box, Text} from '@shopify/polaris';

export default {
  component: ContentBlock,
} as ComponentMeta<typeof ContentBlock>;

export function Medium() {
  return (
    <ContentBlock width="md">
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
    <ContentBlock width="lg">
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text variant="bodySm" as="h3" alignment="center">
          large
        </Text>
      </Box>
    </ContentBlock>
  );
}
