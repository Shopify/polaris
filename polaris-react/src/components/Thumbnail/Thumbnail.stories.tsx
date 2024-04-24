import React from 'react';
import type {Meta} from '@storybook/react';
import {InlineStack, Thumbnail, BlockStack} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';

export default {
  component: Thumbnail,
} as Meta<typeof Thumbnail>;

export const All = {
  render() {
    return (
      /* eslint-disable react/jsx-pascal-case */
      <BlockStack gap="400">
        <InlineStack gap="400" blockAlign="center">
          <ExtraSmall.render />
          <Small.render />
          <Default.render />
          <Large.render />
        </InlineStack>
        <WithComponentSource.render />
      </BlockStack>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export const Default = {
  render() {
    return (
      <Thumbnail
        source="https://burst.shopifycdn.com/photos/light-up-sneakers-women.jpg"
        alt="Light up sneakers women"
      />
    );
  },
};

export const ExtraSmall = {
  render() {
    return (
      <Thumbnail
        source="https://burst.shopifycdn.com/photos/light-up-sneakers-women.jpg"
        size="extraSmall"
        alt="Light up sneakers women"
      />
    );
  },
};

export const Small = {
  render() {
    return (
      <Thumbnail
        source="https://burst.shopifycdn.com/photos/light-up-sneakers-women.jpg"
        size="small"
        alt="Light up sneakers women"
      />
    );
  },
};

export const Large = {
  render() {
    return (
      <Thumbnail
        source="https://burst.shopifycdn.com/photos/light-up-sneakers-women.jpg"
        size="large"
        alt="Light up sneakers women"
      />
    );
  },
};

export const WithComponentSource = {
  render() {
    return <Thumbnail source={NoteIcon} size="large" alt="Small document" />;
  },
};
