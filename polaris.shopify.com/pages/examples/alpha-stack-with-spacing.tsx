import React from 'react';
import {AlphaStack} from '@shopify/polaris';
import Placeholder from './ExampleStyleGuideComponents/DefaultBlockComponent/Placeholder';
import SpacingBackground from './ExampleStyleGuideComponents/SpacingBackgroundExample';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithSpacingExample() {
  return (
    <SpacingBackground width="320px">
      <AlphaStack spacing="5">
        <Placeholder width="320px" label="Stack child" />
        <Placeholder width="320px" />
        <Placeholder width="320px" />
      </AlphaStack>
    </SpacingBackground>
  );
}

export default withPolarisExample(AlphaStackWithSpacingExample);
