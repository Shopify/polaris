import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ContextualSaveBar, Frame} from '@shopify/polaris';

export default {
  component: ContextualSaveBar,
  parameters: {layout: 'fullscreen'},
} as ComponentMeta<typeof ContextualSaveBar>;

export function Default() {
  return (
    <div style={{height: '250px'}}>
      <Frame
        logo={{
          width: 124,
          contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        }}
      >
        <ContextualSaveBar
          message="Unsaved changes"
          saveAction={{
            onAction: () => console.log('add form submit logic'),
            loading: false,
            disabled: false,
          }}
          discardAction={{
            onAction: () => console.log('add clear form logic'),
          }}
        />
      </Frame>
    </div>
  );
}

export function WithFlushContents() {
  return (
    <div style={{height: '250px'}}>
      <Frame
        logo={{
          width: 124,
          contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        }}
      >
        <ContextualSaveBar
          alignContentFlush
          message="Unsaved changes"
          saveAction={{
            onAction: () => console.log('add form submit logic'),
          }}
          discardAction={{
            onAction: () => console.log('add clear form logic'),
          }}
        />
      </Frame>
    </div>
  );
}

export function WithFullWidth() {
  return (
    <div style={{height: '250px'}}>
      <Frame
        logo={{
          width: 124,
          contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
        }}
      >
        <ContextualSaveBar
          fullWidth
          message="Unsaved changes"
          saveAction={{
            onAction: () => console.log('add form submit logic'),
            loading: false,
            disabled: false,
          }}
          discardAction={{
            onAction: () => console.log('add clear form logic'),
          }}
        />
      </Frame>
    </div>
  );
}
