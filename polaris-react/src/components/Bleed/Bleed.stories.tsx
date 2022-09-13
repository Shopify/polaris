import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Bleed, Box} from '@shopify/polaris';

export default {
  component: Bleed,
} as ComponentMeta<typeof Bleed>;

export function Default() {
  return (
    <Box background="surface" padding="5">
      <Bleed>
        <Box background="surface-dark" padding="5">
          Bleed
        </Box>
      </Bleed>
    </Box>
  );
}
