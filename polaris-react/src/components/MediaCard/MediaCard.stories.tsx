import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {MediaCard, VerticalStack, VideoThumbnail} from '@shopify/polaris';

export default {
  component: MediaCard,
} as ComponentMeta<typeof MediaCard>;

export function Default() {
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
}

export function WithSmallVisual() {
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
}

export function WithSecondaryAction() {
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
}

export function WithNoActions() {
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
}

export function VideoCard() {
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
}

export function PortraitVideoCard() {
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
}

export function WithDismissButton() {
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
}

export function WithDismissButtonAndPopoverActions() {
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
}

export function All() {
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
    <VerticalStack gap="5">
      <MediaCardExample title="Default medium" />
      <MediaCardExample title="Default small" size="small" />
      <MediaCardExample title="Portrait medium" portrait />
      <MediaCardExample title="Portrait small" portrait size="small" />
    </VerticalStack>
  );
}
