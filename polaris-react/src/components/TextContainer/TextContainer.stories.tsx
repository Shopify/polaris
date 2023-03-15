import type {ComponentMeta} from '@storybook/react';
import {Text, TextContainer} from '@shopify/polaris';

export default {
  component: TextContainer,
} as ComponentMeta<typeof TextContainer>;

export function Default() {
  return (
    <TextContainer>
      <Text variant="headingMd" as="h2">
        Install the Shopify POS App
      </Text>
      <p>
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </p>
    </TextContainer>
  );
}

export function Tight() {
  return (
    <TextContainer spacing="tight">
      <Text variant="headingMd" as="h2">
        Install the Shopify POS App
      </Text>
      <p>
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </p>
    </TextContainer>
  );
}

export function Loose() {
  return (
    <TextContainer spacing="loose">
      <p>
        Manage your Shopify store on-the-go with real-time notifications, access
        to your dashboard, and order management, all from your smartphone.
      </p>
      <p>
        Shopify POS is the fastest and easiest way to start accepting Visa,
        Mastercard, American Express, and Discover right from your smartphone or
        tablet.
      </p>
    </TextContainer>
  );
}
