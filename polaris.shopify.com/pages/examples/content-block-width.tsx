import React from 'react';
import {ContentBlock, Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ContentBlockWidthExample() {
  return (
    <div style={{width: '100%'}}>
      <ContentBlock width="md">
        <Box background="surface" borderRadius="2" padding="5" shadow="card">
          <Text variant="bodySm" as="h3" alignment="center">
            medium
          </Text>
        </Box>
      </ContentBlock>
      <br />
      <ContentBlock width="lg">
        <Box background="surface" borderRadius="2" padding="5" shadow="card">
          <Text variant="bodySm" as="h3" alignment="center">
            large
          </Text>
        </Box>
      </ContentBlock>
    </div>
  );
}

export default withPolarisExample(ContentBlockWidthExample);
