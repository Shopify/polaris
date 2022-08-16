import {ProgressBar} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ProgressBarExample() {
  return (
    <div style={{width: 225}}>
      <ProgressBar progress={70} color="primary" />
      <br />
      <ProgressBar progress={30} color="success" />
    </div>
  );
}

export default withPolarisExample(ProgressBarExample);
