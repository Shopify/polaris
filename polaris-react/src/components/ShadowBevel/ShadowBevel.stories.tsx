import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import type {BoxProps} from '@shopify/polaris';
import {Box, BlockStack, InlineCode} from '@shopify/polaris';

import {ShadowBevel} from './ShadowBevel';

export default {
  component: ShadowBevel,
} as ComponentMeta<typeof ShadowBevel>;

export function Default() {
  const colors: BoxProps[] = [
    {
      background: 'bg-success-strong',
      color: 'text-on-color',
    },
    {
      background: 'bg-info-strong',
      color: 'text-info-strong',
    },
    {
      background: 'bg-warning-strong-experimental',
      color: 'text-warning-strong',
    },
    {
      background: 'bg-critical-strong',
      color: 'text-on-color',
    },
  ];

  return (
    <BlockStack gap="500">
      <ShadowBevel boxShadow="md" borderRadius="300">
        <Box background="bg" padding="400">
          Default
        </Box>
      </ShadowBevel>

      <ShadowBevel boxShadow="md" borderRadius="300" bevel={false}>
        <Box background="bg" padding="400">
          With <InlineCode>bevel: false</InlineCode>
        </Box>
      </ShadowBevel>

      <ShadowBevel
        boxShadow="md"
        borderRadius="300"
        bevel={{xs: false, sm: true}}
      >
        <Box background="bg" padding="400">
          With <InlineCode>bevel: {'{xs: false, sm: true}'}</InlineCode>
        </Box>
      </ShadowBevel>

      <ShadowBevel
        boxShadow="md"
        borderRadius="300"
        bevel={{xs: false, sm: true, lg: false}}
      >
        <Box background="bg" padding="400">
          With{' '}
          <InlineCode>bevel: {'{xs: false, sm: true, lg: false}'}</InlineCode>
        </Box>
      </ShadowBevel>

      <ShadowBevel as="article" boxShadow="md" borderRadius="300">
        <Box background="bg" padding="400">
          With <InlineCode>as: article</InlineCode>
        </Box>
      </ShadowBevel>

      {colors.map(({background, color}) => (
        <ShadowBevel
          key={`${background}-${color}`}
          boxShadow="md"
          borderRadius="300"
        >
          <Box background={background} color={color} padding="400">
            {background}
          </Box>
        </ShadowBevel>
      ))}

      <br />
    </BlockStack>
  );
}
