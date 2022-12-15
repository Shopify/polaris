'use client';

import {Text, Stack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <Stack vertical>
      <Text variant="bodyLg" as="p" alignment="start">
        Manage your Shopify store on-the-go with real-time notifications, access
        to your dashboard, and order management, all from your smartphone.
      </Text>
      <Text variant="bodyLg" as="p" alignment="center">
        Manage your Shopify store on-the-go with real-time notifications, access
        to your dashboard, and order management, all from your smartphone.
      </Text>
      <Text variant="bodyLg" as="p" alignment="end">
        Manage your Shopify store on-the-go with real-time notifications, access
        to your dashboard, and order management, all from your smartphone.
      </Text>
      <Text variant="bodyLg" as="p" alignment="justify">
        Manage your Shopify store on-the-go with real-time notifications, access
        to your dashboard, and order management, all from your smartphone.
      </Text>
    </Stack>
  );
}

export default withPolarisExample(TextExample);
