import React from 'react';
import {ContentBlock, Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ContentBlockWidthExample() {
  return (
    <ContentBlock width="md">
      <Box background="surface" borderRadius="2" padding="5" shadow="card">
        <Text variant="bodySm" as="h3">
          medium
        </Text>
      </Box>
    </ContentBlock>
  );
}

export default withPolarisExample(ContentBlockWidthExample);
