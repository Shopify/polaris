import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Card, Bleed, Box, Divider, LegacyStack, Text} from '@shopify/polaris';

export default {
  component: Bleed,
} as ComponentMeta<typeof Bleed>;

const styles = {
  background: 'var(--p-color-bg-inverse)',
  borderRadius: 'var(--p-border-radius-050)',
  padding: 'var(--p-space-400)',
  height: 'var(--p-space-1200)',
};

export function Default() {
  return (
    <Card>
      <Box paddingBlockEnd="500">
        <Text as="p" variant="bodySm">
          Section 01
        </Text>
      </Box>
      <Bleed>
        <Divider />
      </Bleed>
      <Box paddingBlockStart="500">
        <Text as="p" variant="bodySm">
          Section 02
        </Text>
      </Box>
    </Card>
  );
}

export function WithVerticalDirection() {
  return (
    <Box
      background="bg-surface"
      padding="400"
      borderColor="border-secondary"
      borderWidth="025"
    >
      <Bleed marginBlock="600">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithHorizontalDirection() {
  return (
    <Box
      background="bg-surface"
      padding="400"
      borderColor="border-secondary"
      borderWidth="025"
    >
      <Bleed marginInline="600">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithSpecificDirection() {
  return (
    <LegacyStack vertical>
      <Text as="p" variant="bodyMd">
        Block Start
      </Text>
      <Box
        background="bg-surface"
        padding="400"
        borderColor="border-secondary"
        borderWidth="025"
      >
        <Bleed marginInline="400" marginBlockStart="600">
          <div style={styles} />
        </Bleed>
      </Box>
      <Text as="p" variant="bodyMd">
        Block End
      </Text>
      <Box
        background="bg-surface"
        padding="400"
        borderColor="border-secondary"
        borderWidth="025"
      >
        <Bleed marginInline="400" marginBlockEnd="600">
          <div style={styles} />
        </Bleed>
      </Box>
      <Text as="p" variant="bodyMd">
        Inline Start
      </Text>
      <Box
        background="bg-surface"
        padding="400"
        borderColor="border-secondary"
        borderWidth="025"
      >
        <Bleed marginInline="0" marginInlineStart="600">
          <div style={styles} />
        </Bleed>
      </Box>
      <Text as="p" variant="bodyMd">
        Inline End
      </Text>
      <Box
        background="bg-surface"
        padding="400"
        borderColor="border-secondary"
        borderWidth="025"
      >
        <Bleed marginInline="0" marginInlineEnd="600">
          <div style={styles} />
        </Bleed>
      </Box>
    </LegacyStack>
  );
}

export function WithAllDirection() {
  return (
    <Box
      background="bg-surface"
      padding="400"
      borderColor="border-secondary"
      borderWidth="025"
    >
      <Bleed marginInline="600" marginBlock="600">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithResponsiveHorizontalDirection() {
  return (
    <Box
      background="bg-surface"
      padding={{xs: '100', sm: '200', md: '300', lg: '400', xl: '500'}}
      borderColor="border-secondary"
      borderWidth="025"
    >
      <Bleed
        marginInline={{xs: '100', sm: '200', md: '300', lg: '400', xl: '500'}}
      >
        <div style={styles} />
      </Bleed>
    </Box>
  );
}
