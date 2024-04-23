import React from 'react';
import type {Meta} from '@storybook/react';
import {Text, TextContainer} from '@shopify/polaris';

export default {
  component: TextContainer,
} as Meta<typeof TextContainer>;

export const Default = {
  render() {
    return (
      <TextContainer>
        <Text variant="headingMd" as="h2">
          Install the Shopify POS App
        </Text>
        <Text as="p" variant="bodyMd">
          Shopify POS is the easiest way to sell your products in person.
          Available for iPad, iPhone, and Android.
        </Text>
      </TextContainer>
    );
  },
};

export const Tight = {
  render() {
    return (
      <TextContainer spacing="tight">
        <Text variant="headingMd" as="h2">
          Install the Shopify POS App
        </Text>
        <Text as="p" variant="bodyMd">
          Shopify POS is the easiest way to sell your products in person.
          Available for iPad, iPhone, and Android.
        </Text>
      </TextContainer>
    );
  },
};

export const Loose = {
  render() {
    return (
      <TextContainer spacing="loose">
        <Text as="p" variant="bodyMd">
          Manage your Shopify store on-the-go with real-time notifications,
          access to your dashboard, and order management, all from your
          smartphone.
        </Text>
        <Text as="p" variant="bodyMd">
          Shopify POS is the fastest and easiest way to start accepting Visa,
          Mastercard, American Express, and Discover right from your smartphone
          or tablet.
        </Text>
      </TextContainer>
    );
  },
};
