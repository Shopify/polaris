/* eslint-disable no-alert */
import React from 'react';
import type {ComponentMeta} from '@storybook/react';

import {AppIcon} from './AppIcon';

const source =
  'https://cdn.shopify.com/app-store/listing_images/532861601aa89a5e70f5d56d075e82ac/icon/CLq7q92-4_0CEAE=.png';

export default {
  component: AppIcon,
} as ComponentMeta<typeof AppIcon>;

export function Default() {
  return <AppIcon source={source} onClick={() => alert('clicked')} />;
}

export function NoSource() {
  return <AppIcon onClick={() => alert('clicked')} />;
}

export function Small() {
  return <AppIcon source={source} size="sm" onClick={() => alert('clicked')} />;
}

export function Medium() {
  return <AppIcon source={source} size="md" onClick={() => alert('clicked')} />;
}

export function Large() {
  return <AppIcon source={source} size="lg" onClick={() => alert('clicked')} />;
}

export function XLarge() {
  return <AppIcon source={source} size="xl" onClick={() => alert('clicked')} />;
}

export function Disabled() {
  return <AppIcon source={source} size="xl" />;
}
