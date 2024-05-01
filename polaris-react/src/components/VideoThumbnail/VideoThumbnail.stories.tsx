import React from 'react';
import type {Meta} from '@storybook/react';
import {MediaCard, Text, BlockStack, VideoThumbnail} from '@shopify/polaris';

export default {
  component: VideoThumbnail,
} as Meta<typeof VideoThumbnail>;

export const All = {
  render() {
    return (
      /* eslint-disable react/jsx-pascal-case */
      <BlockStack gap="800">
        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            Default
          </Text>
          <Default.render />
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            With progress
          </Text>
          <WithProgress.render />
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h2" variant="headingXl">
            Outside media card
          </Text>
          <OutsideMediaCard.render />
        </BlockStack>
      </BlockStack>
      /* eslint-enable react/jsx-pascal-case */
    );
  },
};

export const Default = {
  render() {
    return (
      <MediaCard
        title="Turn your side-project into a business"
        primaryAction={{
          content: 'Learn more',
          onAction: () => {},
        }}
        description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
      >
        <VideoThumbnail
          videoLength={80}
          thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
          onClick={() => {}}
        />
      </MediaCard>
    );
  },
};

export const WithProgress = {
  render() {
    return (
      <MediaCard
        title="Turn your side-project into a business"
        primaryAction={{
          content: 'Learn more',
          onAction: () => {},
        }}
        description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
      >
        <VideoThumbnail
          videoLength={80}
          videoProgress={45}
          showVideoProgress
          thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
          onClick={() => {}}
        />
      </MediaCard>
    );
  },
};

export const OutsideMediaCard = {
  render() {
    return (
      <div style={{height: '254px', width: '450px'}}>
        <VideoThumbnail
          videoLength={80}
          videoProgress={45}
          showVideoProgress
          thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
          onClick={() => {}}
        />
      </div>
    );
  },
};
