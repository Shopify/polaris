import {Icon, Text} from '@shopify/polaris';
import {CirclePlusMinor} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function IconExample() {
  return (
    <div>
      <Text as="p" tone="caution" variant="bodyMd" alignment="center">
        Caution tone
        <Icon source={CirclePlusMinor} tone="inherit" />
      </Text>
      <Text as="p" tone="critical" variant="bodyMd" alignment="center">
        Critical tone
        <Icon source={CirclePlusMinor} tone="inherit" />
      </Text>
      <Text as="p" tone="magic" variant="bodyMd" alignment="center">
        Magic tone
        <Icon source={CirclePlusMinor} tone="inherit" />
      </Text>
      <Text as="p" tone="magic-subdued" variant="bodyMd" alignment="center">
        Magic subdued tone
        <Icon source={CirclePlusMinor} tone="inherit" />
      </Text>
      <Text as="p" tone="subdued" variant="bodyMd" alignment="center">
        Subdued tone
        <Icon source={CirclePlusMinor} tone="inherit" />
      </Text>
      <Text as="p" tone="success" variant="bodyMd" alignment="center">
        Success tone
        <Icon source={CirclePlusMinor} tone="inherit" />
      </Text>
      <Text as="p" tone="text-inverse" variant="bodyMd" alignment="center">
        Text inverse tone
        <Icon source={CirclePlusMinor} tone="inherit" />
      </Text>
    </div>
  );
}

export default withPolarisExample(IconExample);
