import React from 'react';
import type {Meta} from '@storybook/react';
import {ProgressBar} from '@shopify/polaris';

export default {
  component: ProgressBar,
} as Meta<typeof ProgressBar>;

export const Default = {
  render() {
    return <ProgressBar progress={75} />;
  },
};

export const Small = {
  render() {
    return <ProgressBar progress={40} size="small" />;
  },
};

export const WithColors = {
  render() {
    return (
      <div>
        <ProgressBar progress={70} tone="primary" />
        <br />
        <ProgressBar progress={30} tone="success" />
        <br />
        <ProgressBar progress={30} tone="critical" />
        <br />
        <ProgressBar progress={30} tone="info" />
      </div>
    );
  },
};

export const WithNoAnimation = {
  render() {
    return <ProgressBar progress={80} animated={false} />;
  },
};
