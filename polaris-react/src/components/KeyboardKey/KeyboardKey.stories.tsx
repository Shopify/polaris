import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {KeyboardKey} from '@shopify/polaris';

export default {
  component: KeyboardKey,
} as ComponentMeta<typeof KeyboardKey>;

export function Default() {
  return <KeyboardKey>Ctrl</KeyboardKey>;
}
