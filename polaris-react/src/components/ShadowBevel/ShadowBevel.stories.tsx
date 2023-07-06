import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Box, ShadowBevel, VerticalStack, InlineCode} from '@shopify/polaris';

export default {
  component: ShadowBevel,
} as ComponentMeta<typeof ShadowBevel>;

export function Default() {
  return (
    <VerticalStack gap="5">
      <ShadowBevel boxShadow="md" borderRadius="3">
        <Box background="bg" padding="4">
          Default
        </Box>
      </ShadowBevel>

      <ShadowBevel boxShadow="md" borderRadius="3" bevel={false}>
        <Box background="bg" padding="4">
          With <InlineCode>bevel: false</InlineCode>
        </Box>
      </ShadowBevel>

      <ShadowBevel
        boxShadow="md"
        borderRadius="3"
        bevel={{xs: false, sm: true}}
      >
        <Box background="bg" padding="4">
          With <InlineCode>bevel: {'{xs: false, sm: true}'}</InlineCode>
        </Box>
      </ShadowBevel>

      <ShadowBevel
        boxShadow="md"
        borderRadius="3"
        bevel={{xs: false, sm: true, lg: false}}
      >
        <Box background="bg" padding="4">
          With{' '}
          <InlineCode>bevel: {'{xs: false, sm: true, lg: false}'}</InlineCode>
        </Box>
      </ShadowBevel>

      <ShadowBevel as="article" boxShadow="md" borderRadius="3">
        <Box background="bg" padding="4">
          With <InlineCode>as: article</InlineCode>
        </Box>
      </ShadowBevel>
    </VerticalStack>
  );
}
