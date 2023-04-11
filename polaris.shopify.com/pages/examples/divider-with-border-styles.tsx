import React from 'react';
import {Divider, Text, AlphaStack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithBorderStylesExample() {
  return (
    <AlphaStack gap="5">
      <Text as="p" variant="bodyMd">
        Base
      </Text>
      <Divider borderStyle="base" />
      <Text as="p" variant="bodyMd">
        Dark
      </Text>
      <Divider borderStyle="dark" />
      <Text as="p" variant="bodyMd">
        Divider
      </Text>
      <Divider borderStyle="divider" />
      <Text as="p" variant="bodyMd">
        Divider on dark
      </Text>
      <Divider borderStyle="divider-on-dark" />
      <Text as="p" variant="bodyMd">
        Transparent
      </Text>
      <Divider borderStyle="transparent" />
    </AlphaStack>
  );
}

export default withPolarisExample(DividerWithBorderStylesExample);
