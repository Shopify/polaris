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
      <Box sx={{paddingBlockEnd: '500'}}>
        <Text as="p" variant="bodySm">
          Section 01
        </Text>
      </Box>
      <Bleed>
        <Divider />
      </Bleed>
      <Box sx={{paddingBlockStart: '500'}}>
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
      sx={{
        background: 'bg-surface',
        padding: '400',
        borderColor: 'border-secondary',
        borderWidth: '025',
      }}
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
      sx={{
        background: 'bg-surface',
        padding: '400',
        borderColor: 'border-secondary',
        borderWidth: '025',
      }}
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
      <p>Block Start</p>
      <Box
        sx={{
          background: 'bg-surface',
          padding: '400',
          borderColor: 'border-secondary',
          borderWidth: '025',
        }}
      >
        <Bleed marginInline="400" marginBlockStart="600">
          <div style={styles} />
        </Bleed>
      </Box>
      <p>Block End</p>
      <Box
        sx={{
          background: 'bg-surface',
          padding: '400',
          borderColor: 'border-secondary',
          borderWidth: '025',
        }}
      >
        <Bleed marginInline="400" marginBlockEnd="600">
          <div style={styles} />
        </Bleed>
      </Box>
      <p>Inline Start</p>
      <Box
        sx={{
          background: 'bg-surface',
          padding: '400',
          borderColor: 'border-secondary',
          borderWidth: '025',
        }}
      >
        <Bleed marginInline="0" marginInlineStart="600">
          <div style={styles} />
        </Bleed>
      </Box>
      <p>Inline End</p>
      <Box
        sx={{
          background: 'bg-surface',
          padding: '400',
          borderColor: 'border-secondary',
          borderWidth: '025',
        }}
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
      sx={{
        background: 'bg-surface',
        padding: '400',
        borderColor: 'border-secondary',
        borderWidth: '025',
      }}
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
      sx={{
        background: 'bg-surface',
        padding: {xs: '100', sm: '200', md: '300', lg: '400', xl: '500'},
        borderColor: 'border-secondary',
        borderWidth: '025',
      }}
    >
      <Bleed
        marginInline={{xs: '100', sm: '200', md: '300', lg: '400', xl: '500'}}
      >
        <div style={styles} />
      </Bleed>
    </Box>
  );
}
