import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Icon, Text, BlockStack} from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';

export default {
  component: Icon,
} as ComponentMeta<typeof Icon>;

export function Default() {
  return <Icon source={CirclePlusMinor} />;
}

export function Colored() {
  return (
    <BlockStack gap="200">
      <Text as="p" variant="bodyMd" alignment="center">
        Base tone
      </Text>
      <Icon source={CirclePlusMinor} tone="base" />
      <Text as="p" variant="bodyMd" alignment="center">
        Subdued tone
      </Text>
      <Icon source={CirclePlusMinor} tone="subdued" />
      <Text as="p" variant="bodyMd" alignment="center">
        Primary tone
      </Text>
      <Icon source={CirclePlusMinor} tone="primary" />
      <Text as="p" variant="bodyMd" alignment="center">
        Info tone
      </Text>
      <Icon source={CirclePlusMinor} tone="info" />
      <Text as="p" variant="bodyMd" alignment="center">
        Success tone
      </Text>
      <Icon source={CirclePlusMinor} tone="success" />
      <Text as="p" variant="bodyMd" alignment="center">
        Caution tone
      </Text>
      <Icon source={CirclePlusMinor} tone="caution" />
      <Text as="p" variant="bodyMd" alignment="center">
        Warning tone
      </Text>
      <Icon source={CirclePlusMinor} tone="warning" />
      <Text as="p" variant="bodyMd" alignment="center">
        Critical tone
      </Text>
      <Icon source={CirclePlusMinor} tone="critical" />
      <Text as="p" variant="bodyMd" alignment="center">
        Emphasis tone
      </Text>
      <Icon source={CirclePlusMinor} tone="emphasis" />
      <Text as="p" variant="bodyMd" alignment="center">
        Magic tone
      </Text>
      <Icon source={CirclePlusMinor} tone="magic" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Primary tone
      </Text>
      <Icon source={CirclePlusMinor} tone="textPrimary" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Caution tone
      </Text>
      <Icon source={CirclePlusMinor} tone="textCaution" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Warning tone
      </Text>
      <Icon source={CirclePlusMinor} tone="textWarning" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Critical tone
      </Text>
      <Icon source={CirclePlusMinor} tone="textCritical" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Info tone
      </Text>
      <Icon source={CirclePlusMinor} tone="textInfo" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Success tone
      </Text>
      <Icon source={CirclePlusMinor} tone="textSuccess" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Magic tone
      </Text>
      <Icon source={CirclePlusMinor} tone="textMagic" />
    </BlockStack>
  );
}

export function WithCustomSVG() {
  return (
    <Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
  );
}

export function WithCustomSVGAndColor() {
  const iconContent = () => {
    return (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
  };

  return <Icon source={iconContent} tone="warning" />;
}
