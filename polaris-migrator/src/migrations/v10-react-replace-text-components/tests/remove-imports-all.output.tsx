import React from 'react';
import {Text, InlineCode} from '@shopify/polaris';

export function App() {
  return (
    <>
      <Text variant="bodySm" as="p">
        Caption
      </Text>
      <Text variant="heading4xl" as="p">
        DisplayText
      </Text>
      <Text variant="headingMd" as="h2">
        Heading
      </Text>
      <Text variant="headingXs" as="h3">
        Subheading
      </Text>
      <Text variant="bodyMd" as="span">
        TextStyle - Default
      </Text>
      <Text variant="bodyMd" as="span">
        <InlineCode>TextStyle - InlineCode</InlineCode>
      </Text>
      <Text variant="bodySm" as="span" visuallyHidden>
        VisuallyHidden
      </Text>
    </>
  );
}
