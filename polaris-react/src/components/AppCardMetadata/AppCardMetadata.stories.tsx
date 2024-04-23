import React from 'react';
import type {ComponentMeta} from '@storybook/react';

import {BlockStack} from '../BlockStack';

import {AppCardMetadata} from './AppCardMetadata';

export default {
  component: AppCardMetadata,
} as ComponentMeta<typeof AppCardMetadata>;

const defaultProps = {
  pricingInfo: 'Free plan available',
  starRating: 4.5,
  appTitle: 'Shop',
  appDescription:
    'The Shop channel is your control center for managing and optimizing your brand presence on Shop.',
};

export function Default() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCardMetadata {...defaultProps} />
      </BlockStack>
    </BlockStack>
  );
}

export function NoDescription() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCardMetadata {...defaultProps} appDescription={undefined} />
      </BlockStack>
    </BlockStack>
  );
}

export function NoPricing() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCardMetadata {...defaultProps} pricingInfo={undefined} />
      </BlockStack>
    </BlockStack>
  );
}

export function NoStarRating() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCardMetadata {...defaultProps} starRating={undefined} />
      </BlockStack>
    </BlockStack>
  );
}

export function Truncated() {
  return (
    <div style={{maxWidth: '300px'}}>
      <BlockStack gap="400">
        <BlockStack gap="200">
          <AppCardMetadata
            {...defaultProps}
            appTitle="Shop - a longer title on app should truncate with ellipsis"
            truncate
          />
        </BlockStack>
      </BlockStack>
    </div>
  );
}

export function BuiltForShopifySignifier() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCardMetadata {...defaultProps} signifiers={['built_for_shopify']} />
      </BlockStack>
    </BlockStack>
  );
}

export function LargeTitleVariant() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCardMetadata
          {...defaultProps}
          signifiers={['built_for_shopify']}
          titleVariant="large"
        />
      </BlockStack>
    </BlockStack>
  );
}
