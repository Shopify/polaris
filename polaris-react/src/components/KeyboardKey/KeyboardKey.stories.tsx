import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {KeyboardKey, Card} from '@shopify/polaris';

export default {
  component: KeyboardKey,
} as ComponentMeta<typeof KeyboardKey>;

export function Default() {
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
}

export function Small() {
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
}
