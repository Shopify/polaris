import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Card, EmptyState, Link} from '@shopify/polaris';

export default {
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

export function Default() {
  return (
    <Card sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>
    </Card>
  );
}

export function WithSubduedFooterContext() {
  return (
    <Card sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        footerContent={
          <p>
            If you don’t want to add a transfer, you can import your inventory
            from{' '}
            <Link monochrome url="/settings">
              settings
            </Link>
            .
          </p>
        }
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>
    </Card>
  );
}

export function WithFullWidthLayout() {
  return (
    <Card sectioned>
      <EmptyState
        heading="Upload a file to get started"
        action={{content: 'Upload files'}}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        fullWidth
      >
        <p>
          You can use the Files section to upload images, videos, and other
          documents. This example shows the content with a centered layout and
          full width.
        </p>
      </EmptyState>
    </Card>
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
      <p>Track and receive your incoming inventory from suppliers.</p>
    </EmptyState>
  );
}
