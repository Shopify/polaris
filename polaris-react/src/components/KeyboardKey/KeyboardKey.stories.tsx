import React from 'react';
import type {Meta} from '@storybook/react';
import {KeyboardKey, Card, Text, BlockStack} from '@shopify/polaris';

export default {
  component: KeyboardKey,
} as Meta<typeof KeyboardKey>;

export const Default = {
  render() {
    return (
      <Card>
        <div style={{display: 'flex', gap: '20px'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <KeyboardKey>⌘</KeyboardKey>
              <KeyboardKey>s</KeyboardKey>
            </div>
            <div style={{display: 'flex'}}>
              <KeyboardKey>ctrl</KeyboardKey>
              <KeyboardKey>s</KeyboardKey>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <KeyboardKey>⌘</KeyboardKey>
              <KeyboardKey>/</KeyboardKey>
            </div>
            <div style={{display: 'flex'}}>
              <KeyboardKey>ctrl</KeyboardKey>
              <KeyboardKey>/</KeyboardKey>
            </div>
          </div>
        </div>
      </Card>
    );
  },
};

export const Small = {
  render() {
    return (
      <Card>
        <div style={{display: 'flex', gap: '20px'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <KeyboardKey size="small">⌘</KeyboardKey>
              <KeyboardKey size="small">d</KeyboardKey>
            </div>
            <div style={{display: 'flex'}}>
              <KeyboardKey size="small">⌘</KeyboardKey>
              <KeyboardKey size="small">h</KeyboardKey>
            </div>
            <div style={{display: 'flex'}}>
              <KeyboardKey size="small">⌘</KeyboardKey>
              <KeyboardKey size="small">⌫</KeyboardKey>
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <KeyboardKey size="small">ctrl</KeyboardKey>
              <KeyboardKey size="small">d</KeyboardKey>
            </div>
            <div style={{display: 'flex'}}>
              <KeyboardKey size="small">ctrl</KeyboardKey>
              <KeyboardKey size="small">h</KeyboardKey>
            </div>
            <div style={{display: 'flex'}}>
              <KeyboardKey size="small">ctrl</KeyboardKey>
              <KeyboardKey size="small">⌫</KeyboardKey>
            </div>
          </div>
        </div>
      </Card>
    );
  },
};

export const All = {
  render() {
    return (
      <BlockStack gap="200">
        <Text as="h2" variant="headingMd">
          Default
        </Text>
        <Card>
          <KeyboardKey>ctrl</KeyboardKey>
          <KeyboardKey>⌘</KeyboardKey>
          <KeyboardKey>h</KeyboardKey>
        </Card>
        <Text as="h2" variant="headingMd">
          Small
        </Text>
        <Card>
          <KeyboardKey size="small">ctrl</KeyboardKey>
          <KeyboardKey size="small">⌘</KeyboardKey>
          <KeyboardKey size="small">h</KeyboardKey>
        </Card>
      </BlockStack>
    );
  },
};
