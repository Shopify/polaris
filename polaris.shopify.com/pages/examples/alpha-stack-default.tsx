import React from 'react';
import {AlphaStack} from '@shopify/polaris';
import {Placeholder} from './ExampleStyleGuideComponents/DefaultBlockComponent/Placeholder';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackExample() {
  return (
    <AlphaStack>
      <Placeholder width="320" label="Stack child" />
      <Placeholder width="320" />
      <Placeholder width="320" />
    </AlphaStack>
  );
}

export default withPolarisExample(AlphaStackExample);
