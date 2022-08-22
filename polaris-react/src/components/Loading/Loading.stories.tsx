import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Frame, Loading} from '@shopify/polaris';

export default {
  component: Loading,
} as ComponentMeta<typeof Loading>;

export function Default() {
  return (
    <div style={{height: '100px'}}>
      <Frame>
        <Loading />
      </Frame>
    </div>
  );
}
