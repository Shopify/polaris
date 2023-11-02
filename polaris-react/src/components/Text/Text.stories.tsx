import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {LegacyStack, Text} from '@shopify/polaris';

export default {
  component: Text,
} as ComponentMeta<typeof Text>;

export const Variants = () => (
  <LegacyStack vertical>
    <Text as="h2" variant="heading3xl">
      Text with Heading3xl variant
    </Text>
    <Text as="h3" variant="heading2xl">
      Text with Heading2xl variant
    </Text>
    <Text as="h4" variant="headingXl">
      Text with HeadingXl variant
    </Text>
    <Text as="h5" variant="headingLg">
      Text with HeadingLg variant
    </Text>
    <Text as="h6" variant="headingMd">
      Text with HeadingMd variant
    </Text>
    <Text as="h6" variant="headingSm">
      Text with HeadingSm variant
    </Text>
    <Text as="p" variant="bodyLg">
      Text with BodyLg variant
    </Text>
    <Text as="p" variant="bodyMd">
      Text with BodyMd variant
    </Text>
    <Text as="p" variant="bodySm">
      Text with BodySm variant
    </Text>
    <Text as="p" variant="bodyXs">
      Text with BodyXs variant
    </Text>
    <Text as="strong" variant="bodySm">
      Text as a strong tag
    </Text>
  </LegacyStack>
);

export const WithAlignment = () => (
  <LegacyStack vertical>
    <Text as="p" variant="bodyLg" alignment="start">
      Manage your Shopify store on-the-go with real-time notifications, access
      to your dashboard, and order management, all from your smartphone.
    </Text>
    <Text as="p" variant="bodyLg" alignment="center">
      Manage your Shopify store on-the-go with real-time notifications, access
      to your dashboard, and order management, all from your smartphone.
    </Text>
    <Text as="p" variant="bodyLg" alignment="end">
      Manage your Shopify store on-the-go with real-time notifications, access
      to your dashboard, and order management, all from your smartphone.
    </Text>
    <Text as="p" variant="bodyLg" alignment="justify">
      Manage your Shopify store on-the-go with real-time notifications, access
      to your dashboard, and order management, all from your smartphone.
    </Text>
  </LegacyStack>
);

export const WithFontWeight = () => (
  <LegacyStack vertical>
    <Text as="p" fontWeight="bold">
      Sales this year
    </Text>
    <Text as="p" fontWeight="semibold">
      Sales this year
    </Text>
    <Text as="p" fontWeight="medium">
      Sales this year
    </Text>
    <Text as="p" fontWeight="regular">
      Sales this year
    </Text>
  </LegacyStack>
);

export const WithTone = () => (
  <LegacyStack vertical>
    <Text as="p" tone="subdued">
      Use to de-emphasize a piece of text that is less important to merchants
      than other nearby text. May also be used to indicate when normal content
      is absent, for example, “No supplier listed”. Don’t use only for aesthetic
      effect.
    </Text>
    <Text as="p" tone="success">
      Use in combination with a symbol showing an increasing value to indicate
      an upward trend.
    </Text>
    <Text as="p" tone="caution">
      Use to denote something that needs attention, or that merchants need to
      take action on.
    </Text>
    <Text as="p" tone="critical">
      Use in combination with a symbol showing a decreasing value to indicate a
      downward trend.
    </Text>
  </LegacyStack>
);

export const WithInheritance = () => (
  <Text as="p" variant="heading2xl" tone="caution">
    <Text as="span">This is a 2xl heading</Text>
    <br />
    <Text as="span">This is also a 2xl heading</Text>
  </Text>
);

export const WithTruncate = () => (
  <Text as="p" truncate>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tincidunt vel
    lorem nec pretium. Vestibulum ante ipsum primis in faucibus orci luctus et
    ultrices posuere cubilia curae; Morbi sollicitudin ex nec imperdiet
    pellentesque. Etiam dapibus ipsum non ligula molestie rhoncus. Vivamus eget
    iaculis lectus. Sed porttitor leo at nulla mollis malesuada. Vestibulum ante
    ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
    Vestibulum vestibulum porttitor mollis. Nam dictum ante sed lobortis
    commodo. Ut luctus ut metus vel bibendum.
  </Text>
);

export const ParentWithChild = () => (
  <Text as="p" variant="bodySm" tone="subdued">
    Parent Text component with{' '}
    <Text as="span" fontWeight="bold">
      bold
    </Text>{' '}
    children
  </Text>
);

export const InADefinitionList = () => (
  <dl>
    <Text as="dt" variant="bodyLg">
      Definition Title
    </Text>
    <Text as="dd" variant="bodySm">
      Definition Description
    </Text>
  </dl>
);

export const WithTextDecoration = () => (
  <LegacyStack vertical>
    <Text as="p" textDecorationLine="line-through">
      $100.00
    </Text>
  </LegacyStack>
);
