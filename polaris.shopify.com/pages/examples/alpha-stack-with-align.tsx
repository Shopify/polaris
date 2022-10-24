import React from 'react';
import {AlphaStack, Box, Page, Inline} from '@shopify/polaris';
import Placeholder from './ExampleStyleGuideComponents/AlignBlockComponent/Placeholder';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithAlignExample() {
  return (
    <Page>
      <Box paddingBottom="20">
        <AlphaStack align="start">
          <Placeholder width="320px" label="Start" childAlign="start" />
          <Placeholder width="320px" />
          <Placeholder width="320px" />
        </AlphaStack>
      </Box>
      <Box paddingBottom="20">
        <AlphaStack align="center">
          <AlphaStack>
            <Placeholder width="320px" label="Center" childAlign="center" />
            <Placeholder width="320px" />
            <Placeholder width="320px" />
          </AlphaStack>
        </AlphaStack>
      </Box>
      <Box>
        <AlphaStack align="end">
          <Placeholder width="320px" label="End" childAlign="end" />
          <Placeholder width="320px" />
          <Placeholder width="320px" />
        </AlphaStack>
      </Box>
    </Page>
  );
}

export default withPolarisExample(AlphaStackWithAlignExample);
