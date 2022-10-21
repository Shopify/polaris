import React from 'react';
import {AlphaStack} from '@shopify/polaris';
import {Placeholder} from './ExampleStyleGuideComponents/DefaultBlockComponent/Placeholder';
import {SpacingBackground} from './ExampleStyleGuideComponents/SpacingBackgroundExample';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithSpacingExample() {
  return (
    <SpacingBackground width="320">
      <AlphaStack spacing="5">
        <Placeholder width="320" label="Stack child" />
        <Placeholder width="320" />
        <Placeholder width="320" />
      </AlphaStack>
    </SpacingBackground>
  );
}

export default withPolarisExample(AlphaStackWithSpacingExample);
