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
      <ProgressBar progress={70} color="primary" />
      <br />
      <ProgressBar progress={30} color="success" />
      <br />
      <ProgressBar progress={30} color="critical" />
      <br />
      <ProgressBar progress={30} color="highlight" />
    </div>
  );
}

export function WithNoAnimation() {
  return <ProgressBar progress={80} animated={false} />;
}
