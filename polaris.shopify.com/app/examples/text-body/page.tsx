'use client';

import {Text, Stack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <Stack vertical>
      <Text variant="bodyLg" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
      <Text variant="bodyMd" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
      <Text variant="bodySm" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
    </Stack>
  );
}

export default withPolarisExample(TextExample);
