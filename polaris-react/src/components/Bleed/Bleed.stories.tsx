import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {AlphaCard, Bleed, Box, Text} from '@shopify/polaris';

export default {
  component: Bleed,
} as ComponentMeta<typeof Bleed>;

const styles = {
  background: 'var(--p-surface-neutral-subdued-dark)',
  borderRadius: 'var(--p-border-radius-05)',
  padding: 'var(--p-space-4)',
  height: 'var(--p-space-12)',
};

export function Default() {
  return (
    <AlphaCard>
      <Text as="p" variant="bodySm">
        Section 01
      </Text>
      <Bleed>
        <Box paddingBlockStart="2" paddingBlockEnd="2">
          <Box borderBlockStart="base" />
        </Box>
      </Bleed>
      <Text as="p" variant="bodySm">
        Section 02
      </Text>
    </AlphaCard>
  );
}

export function WithVerticalDirection() {
  return (
    <Box background="surface" padding="4">
      <Bleed vertical="6">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithHorizontalDirection() {
  return (
    <Box background="surface" padding="4">
      <Bleed horizontal="6">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithSpecificDirection() {
  return (
    <Box background="surface" padding="4">
      <Bleed top="6">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithAllDirection() {
  return (
    <Box background="surface" padding="4">
      <Bleed horizontal="6" vertical="6">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}
