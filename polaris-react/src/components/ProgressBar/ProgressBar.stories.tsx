import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {ProgressBar} from '@shopify/polaris';

export default {
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

export function Default() {
  return <ProgressBar progress={75} />;
}

export function Small() {
  return <ProgressBar progress={40} size="small" />;
}

export function WithColors() {
  return (
    <div>
      <ProgressBar progress={70} tone="primary" />
      <br />
      <ProgressBar progress={30} tone="success" />
      <br />
      <ProgressBar progress={30} tone="critical" />
      <br />
      <ProgressBar progress={30} tone="info" />
      <br />
      <ProgressBar progress={30} tone="warning" />
    </div>
  );
}

export function WithNoAnimation() {
  return <ProgressBar progress={80} animated={false} />;
}
