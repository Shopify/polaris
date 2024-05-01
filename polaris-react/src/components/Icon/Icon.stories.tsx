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
      <>
        <Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
        <Icon source={ShopifyIcon} />
      </>
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

const ShopifyIcon = () => {
  return (
    <svg
      width="123"
      height="140"
      viewBox="0 0 123 140"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M87.28 138.46l-.31-121.8c-.82-.83-2.42-.58-3.05-.4l-4.17 1.3a29.13 29.13 0 00-2-4.91C74.8 7 70.49 4.02 65.26 4h-.02c-.34 0-.7.03-1.04.06h-.04l-.47-.54a10.95 10.95 0 00-8.7-3.52C48.23.2 41.5 5.08 36.05 13.75c-3.84 6.1-6.75 13.77-7.58 19.7l-13.3 4.13c-3.9 1.23-4.03 1.35-4.54 5.04C10.23 45.42 0 124.7 0 124.7l85.81 14.86 1.47-1.1zM59.17 5.57A6.9 6.9 0 0055.1 4.5c-10.42.3-19.51 16.6-21.84 27.47l10-3.1 1.77-.55c1.31-6.9 4.6-14.05 8.88-18.66a19.59 19.59 0 015.25-4.09zm-9.2 21.22l14.34-4.44c.04-3.74-.36-9.27-2.23-13.17a14.49 14.49 0 00-4.87 3.55c-3.22 3.46-5.84 8.75-7.23 14.06zm18.82-5.84l6.66-2.06c-1.06-3.46-3.58-9.27-8.7-10.24 1.59 4.12 2 8.88 2.04 12.3z"
        fill="#95BF47"
      />
      <path
        d="M106.51 25.71c-.5-.04-10.43-.19-10.43-.19s-8.3-8.07-9.12-8.89c-.3-.3-.72-.46-1.15-.53v123.43l37.19-9.25-15.27-103.43c-.1-.7-.71-1.1-1.22-1.14z"
        fill="#5E8E3E"
      />
      <path
        d="M65.2 44.88l-4.32 16.18s-4.81-2.2-10.53-1.83c-8.37.53-8.46 5.82-8.38 7.14.46 7.24 19.47 8.82 20.54 25.77.84 13.33-7.06 22.46-18.45 23.18-13.67.86-21.2-7.22-21.2-7.22l2.9-12.33s7.57 5.72 13.63 5.34a5.36 5.36 0 005.24-5.76c-.6-9.44-16.08-8.88-17.06-24.4-.82-13.05 7.74-26.27 26.63-27.47 7.28-.46 11 1.4 11 1.4"
        fill="#fff"
      />
    </svg>
  );
};
