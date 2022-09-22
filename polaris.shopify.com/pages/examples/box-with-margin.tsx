import React from 'react';
import {Box, Stack, Text} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BoxWithPaddingExample() {
  return (
    <>
      <div style={{border: 'var(--p-border-base'}}>
        <Box
          background="surface"
          borderRadius="2"
          margin="4"
          padding="5"
          shadow="card"
        >
          <Text as="h2" variant="headingMd">
            Box with uniform margin
          </Text>
        </Box>
      </div>
      <div style={{border: 'var(--p-border-base'}}>
        <Box
          background="surface"
          borderRadius="2"
          margin="4"
          marginTop="2"
          padding="5"
          shadow="card"
        >
          <Text as="h2" variant="headingMd">
            Box with top margin overwritten
          </Text>
        </Box>
      </div>
      <div style={{border: 'var(--p-border-base'}}>
        <Box
          background="surface"
          borderRadius="2"
          marginLeft="4"
          padding="5"
          shadow="card"
        >
          <Text as="h2" variant="headingMd">
            Box with left margin only
          </Text>
        </Box>
      </div>
    </>
  );
}

export default withPolarisExample(BoxWithPaddingExample);
