import {Tooltip, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TooltipExample() {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip
        defaultOpen
        persistOnClick
        content="This order has shipping labels."
      >
        <Text fontWeight="bold" as="span">
          Order #1001
        </Text>
      </Tooltip>
    </div>
  );
}

export default withPolarisExample(TooltipExample);
