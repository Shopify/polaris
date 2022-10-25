// @ts-nocheck
import React from 'react';

import {Text} from '../Text';
import {InlineCode} from '../InlineCode';

export function App() {
  return (
    <>
      <Text variant="heading4xl" as="p">
        Display text
      </Text>
      <Text variant="heading3xl" as="p">
        Display text
      </Text>
      <Text variant="heading2xl" as="p">
        Display text
      </Text>
      <Text variant="headingXl" as="p">
        Display text
      </Text>
      <Text as="h1" variant="headingLg">
        Heading
      </Text>
      <Text variant="headingLg" as="h2">
        Heading
      </Text>
      <Text as="h2" variant="headingSm">
        Subheading
      </Text>
      <Text variant="headingSm" as="h3">
        Subheading
      </Text>
      <Text variant="bodySm" as="p">
        Caption
      </Text>
      <Text variant="bodyMd" fontWeight="bold" as="span">
        Strong
      </Text>
      <Text variant="bodyMd" color="success" as="span">
        Positive
      </Text>
      <Text variant="bodyMd" color="critical" as="span">
        Negative
      </Text>
      <Text variant="bodyMd" color="warning" as="span">
        Warning
      </Text>
      <Text variant="bodyMd" as="span">
        <InlineCode>Code</InlineCode>
      </Text>
      <Text variant="bodySm" as="span" visuallyHidden>
        Hidden text
      </Text>
    </>
  );
}
