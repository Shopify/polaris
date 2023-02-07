import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {KeyboardKey} from '@shopify/polaris';

export default {
  component: KeyboardKey,
} as ComponentMeta<typeof KeyboardKey>;

export function Default() {
  return (
    <div>
      <div>
        <p>Current:</p>
        <KeyboardKey>⌘</KeyboardKey>
      </div>
      <div>
        <p>Proposed default:</p>
        <KeyboardKey color="dark">⌘</KeyboardKey>
      </div>

      <div>
        <p>Proposed small:</p>
        <KeyboardKey variant="small">⌘</KeyboardKey>
      </div>
    </div>
  );
}
