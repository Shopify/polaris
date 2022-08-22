import {Tooltip, TextStyle} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TooltipExample() {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip active content="This order has shipping labels.">
        <TextStyle variation="strong">Order #1001</TextStyle>
      </Tooltip>
    </div>
  );
}

export default withPolarisExample(TooltipExample);
