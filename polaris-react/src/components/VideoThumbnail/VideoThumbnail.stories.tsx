import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {MediaCard, Text, BlockStack, VideoThumbnail} from '@shopify/polaris';

export default {
  component: VideoThumbnail,
} as ComponentMeta<typeof VideoThumbnail>;

export function All() {
  return (
    <BlockStack gap="800">
      <BlockStack gap="400">
        <Text as="h2" variant="headingXl">
          Default
        </Text>
        <Default />
      </BlockStack>

      <BlockStack gap="400">
        <Text as="h2" variant="headingXl">
          With progress
        </Text>
        <WithProgress />
      </BlockStack>

      <BlockStack gap="400">
        <Text as="h2" variant="headingXl">
          Outside media card
        </Text>
        <OutsideMediaCard />
      </BlockStack>
    </BlockStack>
  );
}

export function Default() {
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
}

export function WithProgress() {
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
}

export function OutsideMediaCard() {
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
}
