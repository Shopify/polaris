import React from 'react';
import type {Meta} from '@storybook/react';
import {ContextualSaveBar, Frame} from '@shopify/polaris';

export default {
  component: ContextualSaveBar,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof ContextualSaveBar>;

export const Default = {
  render() {
    return (
      <div style={{height: '250px'}}>
        <Frame
          logo={{
            width: 86,
            contextualSaveBarSource:
              'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
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
  },
};

export const Disabled = {
  render() {
    return (
      <div style={{height: '250px'}}>
        <Frame
          logo={{
            width: 86,
            contextualSaveBarSource:
              'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
          }}
        >
          <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              onAction: () => console.log('add form submit logic'),
              loading: false,
              disabled: true,
            }}
            discardAction={{
              onAction: () => console.log('add clear form logic'),
            }}
          />
        </Frame>
      </div>
    );
  },
};

export const WithFlushContents = {
  render() {
    return (
      <div style={{height: '250px'}}>
        <Frame
          logo={{
            width: 86,
            contextualSaveBarSource:
              'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
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
  },
};

export const WithFullWidth = {
  render() {
    return (
      <div style={{height: '250px'}}>
        <Frame
          logo={{
            width: 86,
            contextualSaveBarSource:
              'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
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
  },
};
