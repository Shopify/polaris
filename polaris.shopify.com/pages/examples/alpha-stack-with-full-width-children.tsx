import React from 'react';
import {AlphaStack} from '@shopify/polaris';
import {Placeholder} from './ExampleStyleGuideComponents/DefaultBlockComponent/Placeholder';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AlphaStackWithFullWidthChildrenExample() {
  return (
    <AlphaStack fullWidth>
      <Placeholder label="Stack child" childWidth="100%" />
      <Placeholder />
      <Placeholder />
    </AlphaStack>
  );
}

export default withPolarisExample(AlphaStackWithFullWidthChildrenExample);
