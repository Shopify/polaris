import React from 'react';
import type {Meta} from '@storybook/react';
import {MediaCard, BlockStack, VideoThumbnail} from '@shopify/polaris';

export default {
  component: MediaCard,
} as Meta<typeof MediaCard>;

export const Default = {
  render() {
    return (
      <MediaCard
        title="Getting Started"
        primaryAction={{
          content: 'Learn about getting started',
          onAction: () => {},
        }}
        description="Discover how Shopify can power up your entrepreneurial journey."
        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        />
      </MediaCard>
    );
  },
};

export const WithSmallVisual = {
  render() {
    return (
      <MediaCard
        title="Getting Started"
        primaryAction={{
          content: 'Learn about getting started',
          onAction: () => {},
        }}
        description="Discover how Shopify can power up your entrepreneurial journey."
        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
        size="small"
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        />
      </MediaCard>
    );
  },
};

export const WithSecondaryAction = {
  render() {
    return (
      <MediaCard
        title="Get closer to launching your store"
        primaryAction={{
          content: 'Add a product',
          onAction: () => {},
        }}
        secondaryAction={{
          content: 'Learn more',
          onAction: () => {},
        }}
        description="Start your business with eye-catching inventory."
        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{objectFit: 'cover', objectPosition: 'center'}}
          src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        />
      </MediaCard>
    );
  },
};

export const WithNoActions = {
  render() {
    return (
      <MediaCard
        title="Getting Started"
        description="Discover how Shopify can power up your entrepreneurial journey."
        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{objectFit: 'cover', objectPosition: 'center'}}
          src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        />
      </MediaCard>
    );
  },
};

export const VideoCard = {
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
        />
      </MediaCard>
    );
  },
};

export const PortraitVideoCard = {
  render() {
    return (
      <MediaCard
        portrait
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
        />
      </MediaCard>
    );
  },
};

export const WithDismissButton = {
  render() {
    return (
      <MediaCard
        title="Getting Started"
        primaryAction={{
          content: 'Learn about getting started',
          onAction: () => {},
        }}
        description="Discover how Shopify can power up your entrepreneurial journey."
        onDismiss={() => console.log('clicked')}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        />
      </MediaCard>
    );
  },
};

export const WithDismissButtonAndPopoverActions = {
  render() {
    return (
      <MediaCard
        title="Getting Started"
        primaryAction={{
          content: 'Learn about getting started',
          onAction: () => {},
        }}
        description="Discover how Shopify can power up your entrepreneurial journey."
        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
        onDismiss={() => console.log('clicked')}
      >
        <img
          alt=""
          width="100%"
          height="100%"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        />
      </MediaCard>
    );
  },
};

export const All = {
  render() {
    const image = (
      <img
        alt=""
        width="100%"
        height="100%"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    );

    const MediaCardExample = (props) => (
      <MediaCard
        primaryAction={{
          content: 'Learn about getting started',
          onAction: () => {},
        }}
        secondaryAction={{
          content: 'Learn more',
          onAction: () => {},
        }}
        description="Discover how Shopify can power up your entrepreneurial journey."
        popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
        onDismiss={() => {}}
        {...props}
      >
        {image}
      </MediaCard>
    );

    return (
      <BlockStack gap="500">
        <MediaCardExample title="Default medium" />
        <MediaCardExample title="Default small" size="small" />
        <MediaCardExample title="Portrait medium" portrait />
        <MediaCardExample title="Portrait small" portrait size="small" />
      </BlockStack>
    );
  },
};
