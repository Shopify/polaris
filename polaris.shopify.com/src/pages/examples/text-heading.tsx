import {Text, Stack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function TextExample() {
  return (
    <Stack vertical>
      <Text variant="heading4xl" as="h1">
        Online store dashboard
      </Text>
      <Text variant="heading3xl" as="h2">
        Online store dashboard
      </Text>
      <Text variant="heading2xl" as="h3">
        Online store dashboard
      </Text>
      <Text variant="headingXl" as="h4">
        Online store dashboard
      </Text>
      <Text variant="headingLg" as="h5">
        Online store dashboard
      </Text>
      <Text variant="headingMd" as="h6">
        Online store dashboard
      </Text>
      <Text variant="headingSm" as="h6">
        Online store dashboard
      </Text>
    </Stack>
  );
}

export default withPolarisExample(TextExample);
