import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Badge, CalloutCard, Text} from '@shopify/polaris';

export default {
  component: CalloutCard,
} as ComponentMeta<typeof CalloutCard>;

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
      <p>Upload your store’s logo, change colors and fonts, and more.</p>
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
      <p>Upload your store’s logo, change colors and fonts, and more.</p>
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
      <p>Upload your store’s logo, change colors and fonts, and more.</p>
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
      <p>Upload your store’s logo, change colors and fonts, and more.</p>
    </CalloutCard>
  );
}
