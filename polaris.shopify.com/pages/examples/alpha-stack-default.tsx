import React from 'react';
import {AlphaStack} from '@shopify/polaris';
import Placeholder from './ExampleStyleGuideComponents/DefaultBlockComponent/Placeholder';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackExample() {
  return (
    <AlphaStack>
      <Placeholder width="320px" label="Stack child" />
      <Placeholder width="320px" />
      <Placeholder width="320px" />
    </AlphaStack>
  );
}

export default withPolarisExample(AlphaStackExample);
