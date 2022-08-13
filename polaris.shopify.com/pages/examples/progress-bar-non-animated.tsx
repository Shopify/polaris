import {ProgressBar} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ProgressBarExample() {
  return <ProgressBar progress={80} animated={false} />;
}

export default withPolarisExample(ProgressBarExample);
