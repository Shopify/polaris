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
  return <Icon source={icons.PlusCircleIcon} />;
}

export function Colored() {
  return (
    <BlockStack gap="200">
      <Text as="p" variant="bodyMd" alignment="center">
        Base tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="base" />
      <Text as="p" variant="bodyMd" alignment="center">
        Subdued tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="subdued" />
      <Text as="p" variant="bodyMd" alignment="center">
        Primary tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="primary" />
      <Text as="p" variant="bodyMd" alignment="center">
        Info tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="info" />
      <Text as="p" variant="bodyMd" alignment="center">
        Success tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="success" />
      <Text as="p" variant="bodyMd" alignment="center">
        Caution tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="caution" />
      <Text as="p" variant="bodyMd" alignment="center">
        Warning tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="warning" />
      <Text as="p" variant="bodyMd" alignment="center">
        Critical tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="critical" />
      <Text as="p" variant="bodyMd" alignment="center">
        Emphasis tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="emphasis" />
      <Text as="p" variant="bodyMd" alignment="center">
        Magic tone
      </Text>
      <Icon source={icons.PlusCircleIcon} tone="magic" />
    </BlockStack>
  );
}

export function WithToneInherit() {
  return (
    <BlockStack gap="200">
      <Text as="p" tone="caution" variant="bodyMd" alignment="center">
        Caution tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="critical" variant="bodyMd" alignment="center">
        Critical tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="magic" variant="bodyMd" alignment="center">
        Magic tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="magic-subdued" variant="bodyMd" alignment="center">
        Magic subdued tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="subdued" variant="bodyMd" alignment="center">
        Subdued tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="success" variant="bodyMd" alignment="center">
        Success tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
      <Text as="p" tone="text-inverse" variant="bodyMd" alignment="center">
        Text inverse tone
        <Icon source={icons.PlusCircleIcon} tone="inherit" />
      </Text>
    </BlockStack>
  );
}

export function WithCustomSVG() {
  const CustomSVG = () => (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0" />
    </svg>
  );

  return <Icon source={CustomSVG} />;
}

export function WithCustomSVGAndColor() {
  const CustomSVG = () => {
    return (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
  };

  return <Icon source={CustomSVG} tone="warning" />;
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
