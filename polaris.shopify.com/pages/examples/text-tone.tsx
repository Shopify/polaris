import {Text, LegacyStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextExample() {
  return (
    <LegacyStack vertical>
      <Text as="p" tone="subdued">
        Use to de-emphasize a piece of text that is less important to merchants
        than other nearby text. May also be used to indicate when normal content
        is absent, for example, “No supplier listed”. Don’t use only for
        aesthetic effect.
      </Text>
      <Text as="p" tone="success">
        Use in combination with a symbol showing an increasing value to indicate
        an upward trend.
      </Text>
      <Text as="p" tone="caution">
        Use to denote something that needs attention, or that merchants need to
        take action on.
      </Text>
      <Text as="p" tone="critical">
        Use in combination with a symbol showing a decreasing value to indicate
        a downward trend.
      </Text>
    </LegacyStack>
  );
}

export default withPolarisExample(TextExample);
