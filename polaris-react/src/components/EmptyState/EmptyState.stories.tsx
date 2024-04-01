import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {LegacyCard, EmptyState, Link, Text} from '@shopify/polaris';

export default {
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

export function Default() {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <Text as="p" variant="bodyMd">
          Track and receive your incoming inventory from suppliers.
        </Text>
      </EmptyState>
    </LegacyCard>
  );
}

export function WithSubduedFooterContext() {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        footerContent={
          <Text as="p" variant="bodyMd">
            If you don’t want to add a transfer, you can import your inventory
            from{' '}
            <Link monochrome url="/settings">
              settings
            </Link>
            .
          </Text>
        }
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <Text as="p" variant="bodyMd">
          Track and receive your incoming inventory from suppliers.
        </Text>
      </EmptyState>
    </LegacyCard>
  );
}

export function WithFullWidthLayout() {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="Upload a file to get started"
        action={{content: 'Upload files'}}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        fullWidth
      >
        <Text as="p" variant="bodyMd">
          You can use the Files section to upload images, videos, and other
          documents. This example shows the content with a centered layout and
          full width.
        </Text>
      </EmptyState>
    </LegacyCard>
  );
}

export function WithoutContentContainer() {
  return (
    <EmptyState
      heading="Manage your inventory transfers"
      action={{content: 'Add transfer'}}
      secondaryAction={{
        content: 'Learn more',
        url: 'https://help.shopify.com',
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <Text as="p" variant="bodyMd">
        Track and receive your incoming inventory from suppliers.
      </Text>
    </EmptyState>
  );
}
