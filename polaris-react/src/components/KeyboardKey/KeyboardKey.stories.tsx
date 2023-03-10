import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {KeyboardKey} from '@shopify/polaris';

export default {
  component: KeyboardKey,
} as ComponentMeta<typeof KeyboardKey>;

export function Default() {
  return (
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
  );
}

export function Small() {
  return (
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
  );
}
