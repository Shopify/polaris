import React from 'react';
import type {Meta} from '@storybook/react';
import {Frame, Loading} from '@shopify/polaris';

export default {
  component: Loading,
} as Meta<typeof Loading>;

export const Default = {
  render() {
    return (
      <div style={{height: '100px'}}>
        <Frame>
          <Loading />
        </Frame>
      </div>
    );
  },
};
