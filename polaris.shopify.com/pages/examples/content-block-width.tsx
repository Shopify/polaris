import React from 'react';
import {ContentBlock, Box, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ContentBlockWidthExample() {
  return (
    <div style={{width: '500px'}}>
      <ContentBlock width="medium">
        <Box background="surface" borderRadius="2" padding="5" shadow="card">
          <Text variant="bodySm" as="h3" alignment="center">
            medium
          </Text>
        </Box>
      </ContentBlock>
      <br />
      <ContentBlock width="large">
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
