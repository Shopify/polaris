import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ContentBlock} from '@shopify/polaris';

export default {
  component: ContentBlock,
} as ComponentMeta<typeof ContentBlock>;

const placeHolder = {
  background: 'var(--p-background-selected)',
  borderRadius: 'var(--p-border-radius-05)',
  border: '1px solid var(--p-surface-dark)',
  padding: 'var(--p-space-4)',
  width: '100%',
  height: 'var(--p-space-32)',
};

export function ExtraSmall() {
  return (
    <ContentBlock width="xs">
      <div style={placeHolder}>{}</div>
    </ContentBlock>
  );
}

export function Small() {
  return (
    <ContentBlock width="sm">
      <div style={placeHolder}>{}</div>
    </ContentBlock>
  );
}

export function Medium() {
  return (
    <ContentBlock width="md">
      <div style={placeHolder}>{}</div>
    </ContentBlock>
  );
}

export function Large() {
  return (
    <ContentBlock width="lg">
      <div style={placeHolder}>{}</div>
    </ContentBlock>
  );
}

export function ExtraLarge() {
  return (
    <ContentBlock width="xl">
      <div style={placeHolder}>{}</div>
    </ContentBlock>
  );
}
