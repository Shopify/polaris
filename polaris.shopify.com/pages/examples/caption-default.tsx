import {List, Caption} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function Example() {
  return (
    <List>
      <List.Item>
        Order #1001 <Caption>Received April 21, 2017</Caption>
      </List.Item>
      <List.Item>
        Order #1002 <Caption>Received April 22, 2017</Caption>
      </List.Item>
    </List>
  );
}

export default withPolarisExample(Example);
