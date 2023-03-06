import {Text, LegacyStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <LegacyStack vertical>
      <Text variant="bodyLg" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
      <p>
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </p>
      <Text variant="bodySm" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
    </LegacyStack>
  );
}

export default withPolarisExample(TextExample);
