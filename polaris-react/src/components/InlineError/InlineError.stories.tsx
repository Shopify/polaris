import React from 'react';
import type {Meta} from '@storybook/react';
import {InlineError} from '@shopify/polaris';

export default {
  component: InlineError,
} as Meta<typeof InlineError>;

export const Default = {
  render() {
    return <InlineError message="Store name is required" fieldID="myFieldID" />;
  },
};
