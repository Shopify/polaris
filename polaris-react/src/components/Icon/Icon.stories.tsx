import React from 'react';
import type {Meta} from '@storybook/react';
import {Icon, Text, BlockStack, InlineStack} from '@shopify/polaris';
import * as polarisIcons from '@shopify/polaris-icons';
import iconMetadata from '@shopify/polaris-icons/metadata';

export default {
  component: Icon,
} as Meta<typeof Icon>;

interface Icons {
  [key: string]: any;
}
const icons: Icons = polarisIcons;

export const Default = {
  render() {
    return <Icon source={icons.PlusCircleIcon} />;
  },
};

export const Colored = {
  render() {
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
        <Text as="p" variant="bodyMd" alignment="center">
          Text Primary tone
        </Text>
        <Icon source={icons.PlusCircleIcon} tone="textPrimary" />
        <Text as="p" variant="bodyMd" alignment="center">
          Text Caution tone
        </Text>
        <Icon source={icons.PlusCircleIcon} tone="textCaution" />
        <Text as="p" variant="bodyMd" alignment="center">
          Text Warning tone
        </Text>
        <Icon source={icons.PlusCircleIcon} tone="textWarning" />
        <Text as="p" variant="bodyMd" alignment="center">
          Text Critical tone
        </Text>
        <Icon source={icons.PlusCircleIcon} tone="textCritical" />
        <Text as="p" variant="bodyMd" alignment="center">
          Text Info tone
        </Text>
        <Icon source={icons.PlusCircleIcon} tone="textInfo" />
        <Text as="p" variant="bodyMd" alignment="center">
          Text Success tone
        </Text>
        <Icon source={icons.PlusCircleIcon} tone="textSuccess" />
        <Text as="p" variant="bodyMd" alignment="center">
          Text Magic tone
        </Text>
        <Icon source={icons.PlusCircleIcon} tone="textMagic" />
      </BlockStack>
    );
  },
};

export const WithToneInherit = {
  parameters: {
    a11y: {
      config: {
        rules: [{id: 'color-contrast', enabled: false}],
      },
    },
  },
  render() {
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
  },
};

export const WithPlaceholder = {
  render() {
    return <Icon source="placeholder" />;
  },
};

export const WithExternalIcon = {
  render() {
    return (
      <Icon source="%3Csvg%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.5%203.75a.75.75%200%200%201%20.75-.75h1.612a1.75%201.75%200%200%201%201.732%201.5h9.656a.75.75%200%200%201%20.748.808l-.358%204.653a2.75%202.75%200%200%201-2.742%202.539h-6.351l.093.78a.25.25%200%200%200%20.248.22h6.362a.75.75%200%200%201%200%201.5h-6.362a1.75%201.75%200%200%201-1.738-1.543l-1.04-8.737a.25.25%200%200%200-.248-.22h-1.612a.75.75%200%200%201-.75-.75Zm6.708%202.458a.625.625%200%200%200%200%20.884l1.408%201.408-1.408%201.408a.625.625%200%201%200%20.884.884l1.408-1.408%201.408%201.408a.625.625%200%201%200%20.884-.884l-1.408-1.408%201.408-1.408a.625.625%200%200%200-.884-.884l-1.408%201.408-1.408-1.408a.625.625%200%200%200-.884%200Z%22%20fill%3D%22%235C5F62%22%2F%3E%3Cpath%20d%3D%22M10%2017a1%201%200%201%201-2%200%201%201%200%200%201%202%200Z%22%20fill%3D%22%235C5F62%22%2F%3E%3Cpath%20d%3D%22M14%2018a1%201%200%201%200%200-2%201%201%200%200%200%200%202Z%22%20fill%3D%22%235C5F62%22%2F%3E%3C%2Fsvg%3E" />
    );
  },
};

export const WithCustomSVG = {
  render() {
    return (
      <Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
    );
  },
};

export const WithCustomSVGAndColor = {
  render() {
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
  },
};

export const PolarisIconsLibrary = {
  render() {
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
  },
};
