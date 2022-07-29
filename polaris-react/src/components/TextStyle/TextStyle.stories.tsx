import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {TextStyle} from '@shopify/polaris';

export default {
  component: TextStyle,
} as ComponentMeta<typeof TextStyle>;

export function Subdued() {
  return <TextStyle variation="subdued">No supplier listed</TextStyle>;
}

export function Strong() {
  return <TextStyle variation="strong">Total</TextStyle>;
}

export function Positive() {
  return <TextStyle variation="positive">Orders increased</TextStyle>;
}

export function Negative() {
  return <TextStyle variation="negative">Orders decreased</TextStyle>;
}

export function Warning() {
  return <TextStyle variation="warning">Scheduled maintenance</TextStyle>;
}

export function Code() {
  return (
    <p>
      New URL that visitors should be forwarded to. If you want your store’s
      homepage, enter <TextStyle variation="code"> / </TextStyle> (a forward
      slash).
    </p>
  );
}
