import React from 'react';
import {Card, Tooltip, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TooltipExample() {
  return (
    <div style={{padding: '75px 0'}}>
      <Card padding="400">
        <Tooltip active content="This tooltip has an underline" hasUnderline>
          <Text variant="bodyLg" fontWeight="bold" as="span">
            Order #1001
          </Text>
        </Tooltip>
      </Card>
    </div>
  );
}

export default withPolarisExample(TooltipExample);
