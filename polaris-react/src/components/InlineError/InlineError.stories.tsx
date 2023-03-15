import type {ComponentMeta} from '@storybook/react';
import {InlineError} from '@shopify/polaris';

export default {
  component: InlineError,
} as ComponentMeta<typeof InlineError>;

export function Default() {
  return <InlineError message="Store name is required" fieldID="myFieldID" />;
}
