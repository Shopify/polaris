import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Thumbnail} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';

export default {
  component: Thumbnail,
} as ComponentMeta<typeof Thumbnail>;

export function Default() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
      alt="Black choker necklace"
    />
  );
}

export function ExtraSmall() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
      size="extraSmall"
      alt="Black choker necklace"
    />
  );
}

export function Small() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
      size="small"
      alt="Black choker necklace"
    />
  );
}

export function Large() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
      size="large"
      alt="Black choker necklace"
    />
  );
}

export function WithComponentSource() {
  return <Thumbnail source={NoteMinor} size="large" alt="Small document" />;
}
