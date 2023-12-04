import React from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Icon, Text, BlockStack, InlineStack} from '@shopify/polaris';
import * as polarisIcons from '@shopify/polaris-icons';
import iconMetadata from '@shopify/polaris-icons/metadata';

export default {
  component: Icon,
} as ComponentMeta<typeof Icon>;

interface Icons {
  [key: string]: any;
}
const icons: Icons = polarisIcons;

export function Default() {
  return <Icon source={icons.CirclePlusMinor} />;
}

export function Colored() {
  return (
    <BlockStack gap="200">
      <Text as="p" variant="bodyMd" alignment="center">
        Base tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="base" />
      <Text as="p" variant="bodyMd" alignment="center">
        Subdued tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="subdued" />
      <Text as="p" variant="bodyMd" alignment="center">
        Primary tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="primary" />
      <Text as="p" variant="bodyMd" alignment="center">
        Info tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="info" />
      <Text as="p" variant="bodyMd" alignment="center">
        Success tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="success" />
      <Text as="p" variant="bodyMd" alignment="center">
        Caution tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="caution" />
      <Text as="p" variant="bodyMd" alignment="center">
        Warning tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="warning" />
      <Text as="p" variant="bodyMd" alignment="center">
        Critical tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="critical" />
      <Text as="p" variant="bodyMd" alignment="center">
        Emphasis tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="emphasis" />
      <Text as="p" variant="bodyMd" alignment="center">
        Magic tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="magic" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Primary tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="textPrimary" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Caution tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="textCaution" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Warning tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="textWarning" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Critical tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="textCritical" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Info tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="textInfo" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Success tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="textSuccess" />
      <Text as="p" variant="bodyMd" alignment="center">
        Text Magic tone
      </Text>
      <Icon source={icons.CirclePlusMinor} tone="textMagic" />
    </BlockStack>
  );
}

export function WithPlaceholder() {
  return <Icon source="placeholder" />;
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

export function PolarisIconsLibrary() {
  return (
    <BlockStack gap="100" inlineAlign="start">
      {Object.keys(iconMetadata).map((icon) => (
        <InlineStack key={icon} gap="200">
          <Icon source={polarisIcons[icon]} />
          <Text as="span">{icon}</Text>
        </InlineStack>
      ))}
    </BlockStack>
  );
}
