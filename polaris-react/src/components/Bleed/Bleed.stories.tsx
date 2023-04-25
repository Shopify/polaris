import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Card, Bleed, Box, Divider, LegacyStack, Text} from '@shopify/polaris';

export default {
  component: Bleed,
} as ComponentMeta<typeof Bleed>;

const styles = {
  background: 'var(--p-color-bg-inverse)',
  borderRadius: 'var(--p-border-radius-05)',
  padding: 'var(--p-space-4)',
  height: 'var(--p-space-12)',
};

export function Default() {
  return (
    <Card>
      <Box paddingBlockEnd="5">
        <Text as="p" variant="bodySm">
          Section 01
        </Text>
      </Box>
      <Bleed>
        <Divider />
      </Bleed>
      <Box paddingBlockStart="5">
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
      background="bg"
      padding="4"
      borderColor="border-subdued"
      borderWidth="1"
    >
      <Bleed marginBlock="6">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithHorizontalDirection() {
  return (
    <Box
      background="bg"
      padding="4"
      borderColor="border-subdued"
      borderWidth="1"
    >
      <Bleed marginInline="6">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithSpecificDirection() {
  return (
    <LegacyStack vertical>
      <p>Block Start</p>
      <Box
        background="bg"
        padding="4"
        borderColor="border-subdued"
        borderWidth="1"
      >
        <Bleed marginInline="4" marginBlockStart="6">
          <div style={styles} />
        </Bleed>
      </Box>
      <p>Block End</p>
      <Box
        background="bg"
        padding="4"
        borderColor="border-subdued"
        borderWidth="1"
      >
        <Bleed marginInline="4" marginBlockEnd="6">
          <div style={styles} />
        </Bleed>
      </Box>
      <p>Inline Start</p>
      <Box
        background="bg"
        padding="4"
        borderColor="border-subdued"
        borderWidth="1"
      >
        <Bleed marginInline="0" marginInlineStart="6">
          <div style={styles} />
        </Bleed>
      </Box>
      <p>Inline End</p>
      <Box
        background="bg"
        padding="4"
        borderColor="border-subdued"
        borderWidth="1"
      >
        <Bleed marginInline="0" marginInlineEnd="6">
          <div style={styles} />
        </Bleed>
      </Box>
    </LegacyStack>
  );
}

export function WithAllDirection() {
  return (
    <Box
      background="bg"
      padding="4"
      borderColor="border-subdued"
      borderWidth="1"
    >
      <Bleed marginInline="6" marginBlock="6">
        <div style={styles} />
      </Bleed>
    </Box>
  );
}

export function WithResponsiveHorizontalDirection() {
  return (
    <Box
      background="bg"
      padding={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}
      borderColor="border-subdued"
      borderWidth="1"
    >
      <Bleed marginInline={{xs: '1', sm: '2', md: '3', lg: '4', xl: '5'}}>
        <div style={styles} />
      </Bleed>
    </Box>
  );
}
