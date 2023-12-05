import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {InlineStack, Thumbnail, BlockStack} from '@shopify/polaris';
import {NoteMinor} from '@shopify/polaris-icons';

export default {
  component: Thumbnail,
} as ComponentMeta<typeof Thumbnail>;

export function All() {
  return (
    <BlockStack gap="400">
      <InlineStack gap="400" blockAlign="center">
        <ExtraSmall />
        <Small />
        <Default />
        <Large />
      </InlineStack>
      <WithComponentSource />
    </BlockStack>
  );
}

export function Default() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/light-up-sneakers-women.jpg"
      alt="Light up sneakers women"
    />
  );
}

export function ExtraSmall() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/light-up-sneakers-women.jpg"
      size="extraSmall"
      alt="Light up sneakers women"
    />
  );
}

export function Small() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/light-up-sneakers-women.jpg"
      size="small"
      alt="Light up sneakers women"
    />
  );
}

export function Large() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/light-up-sneakers-women.jpg"
      size="large"
      alt="Light up sneakers women"
    />
  );
}

export function WithComponentSource() {
  return <Thumbnail source={NoteMinor} size="large" alt="Small document" />;
}
