import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Bleed, Box} from '@shopify/polaris';

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
    <Box background="surface" padding="4">
      <Bleed>
        <div style={styles} />
      </Bleed>
    </Box>
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
      <Bleed space="6">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}
