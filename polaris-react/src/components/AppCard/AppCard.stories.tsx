import React from 'react';
import type {ComponentMeta} from '@storybook/react';

import {BlockStack} from '../BlockStack';
import {Text} from '../Text';
import {AppCardActionEnum} from '../AppCardAction';

import {AppCard} from './AppCard';
import type {AppCardProps} from './AppCard';
import {AppCardSizingMode} from './types';

const iconUrl =
  'https://cdn.shopify.com/app-store/listing_images/532861601aa89a5e70f5d56d075e82ac/icon/CLq7q92-4_0CEAE=.png';

const appCardProps: AppCardProps = {
  action: {type: AppCardActionEnum.Install},
  iconUrl,
  title: 'Shop',
  starRating: 4.8,
  description:
    'The Shop channel is your control center for managing and optimizing your brand presence on Shop.',
  signifiers: ['built_for_shopify'],
  pricingInfo: 'Free plan available',
  onIconClick: () => {},
  onTitleClick: () => {},
};

export default {
  component: AppCard,
} as ComponentMeta<typeof AppCard>;

export function Default() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCard {...appCardProps} iconUrl={undefined} />
      </BlockStack>
    </BlockStack>
  );
}

export function OpenAction() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCard {...appCardProps} action={{type: AppCardActionEnum.Open}} />
      </BlockStack>
    </BlockStack>
  );
}

export function DisabledAction() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCard
          {...appCardProps}
          action={{type: AppCardActionEnum.Install, disabled: true}}
        />
      </BlockStack>
    </BlockStack>
  );
}

export function LoadingAction() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <AppCard
          {...appCardProps}
          action={{type: AppCardActionEnum.Install, loading: true}}
        />
      </BlockStack>
    </BlockStack>
  );
}

export function Card_Sizes() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Small Card
        </Text>
        <AppCard {...appCardProps} size="sm" />
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Medium Card
        </Text>
        <AppCard {...appCardProps} size="md" />
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Large Card
        </Text>
        <AppCard {...appCardProps} size="lg" />
      </BlockStack>
    </BlockStack>
  );
}

export function Card_Variants() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary
        </Text>
        <AppCard {...appCardProps} variant="primary" />
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Secondary
        </Text>
        <AppCard {...appCardProps} variant="secondary" />
      </BlockStack>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          No Background
        </Text>
        <AppCard {...appCardProps} variant="noBackground" />
      </BlockStack>
    </BlockStack>
  );
}

export function OptionalMetadata() {
  return (
    <div style={{maxWidth: 500}}>
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            No Description
          </Text>
          <AppCard {...appCardProps} description={undefined} />
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            No Star Rating
          </Text>
          <AppCard {...appCardProps} starRating={undefined} />
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            No Pricing Info
          </Text>
          <AppCard {...appCardProps} pricingInfo={undefined} signifiers={[]} />
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Description Only
          </Text>
          <AppCard
            {...appCardProps}
            pricingInfo={undefined}
            starRating={undefined}
            signifiers={[]}
          />
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Title Only
          </Text>
          <AppCard
            {...appCardProps}
            title="Shopify Shop App (Title Only)"
            pricingInfo={undefined}
            description={undefined}
            starRating={undefined}
            signifiers={[]}
          />
        </BlockStack>
      </BlockStack>
    </div>
  );
}

export function Narrow() {
  return (
    <AppCard
      {...appCardProps}
      title="Shop App - Convert More Sales with Shop Pay's accelerated checkout"
      sizingMode={AppCardSizingMode.AlwaysNarrow}
    />
  );
}

export function AdaptiveSizing() {
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Narrow: Parent Container {'<='} Small Breakpoint
        </Text>
        <div style={{maxWidth: '400px'}}>
          <AppCard {...appCardProps} />
        </div>

        <Text as="h2" variant="headingSm">
          Standard: Parent Container {'>'} Small Breakpoint
        </Text>
        <div style={{maxWidth: '500px'}}>
          <AppCard {...appCardProps} />
        </div>
      </BlockStack>
    </BlockStack>
  );
}
