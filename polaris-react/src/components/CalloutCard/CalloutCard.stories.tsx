import React from 'react';
import type {Meta} from '@storybook/react';
import {Badge, CalloutCard, Text} from '@shopify/polaris';
import {SmileyHappyIcon, SmileySadIcon} from '@shopify/polaris-icons';

export default {
  component: CalloutCard,
} as Meta<typeof CalloutCard>;

export function Default() {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: 'Customize checkout',
        url: 'https://www.shopify.com',
      }}
    >
      <Text as="p" variant="bodyMd">
        Upload your store’s logo, change colors and fonts, and more.
      </Text>
    </CalloutCard>
  );
}

export function WithSecondaryAction() {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{content: 'Customize checkout'}}
      secondaryAction={{content: 'Learn more about customizing checkout'}}
    >
      <Text as="p" variant="bodyMd">
        Upload your store’s logo, change colors and fonts, and more.
      </Text>
    </CalloutCard>
  );
}

export function Dismissable() {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{content: 'Customize checkout'}}
      onDismiss={() => {}}
    >
      <Text as="p" variant="bodyMd">
        Upload your store’s logo, change colors and fonts, and more.
      </Text>
    </CalloutCard>
  );
}

export function WithCustomTitle() {
  const customTitle = (
    <>
      <span>Customize the style of your checkout </span>
      <Badge tone="new">New</Badge>
    </>
  );

  return (
    <CalloutCard
      title={customTitle}
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{content: 'Customize checkout'}}
    >
      <Text as="p" variant="bodyMd">
        Upload your store’s logo, change colors and fonts, and more.
      </Text>
    </CalloutCard>
  );
}

export function WithIconableActions() {
  return (
    <CalloutCard
      title="Tell us how we're doing"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: 'Good',
        icon: SmileyHappyIcon,
      }}
      secondaryAction={{
        content: 'Bad',
        icon: SmileySadIcon,
        variant: 'secondary',
      }}
    >
      <Text as="p" variant="bodyMd">
        How do you like our app?
      </Text>
    </CalloutCard>
  );
}
