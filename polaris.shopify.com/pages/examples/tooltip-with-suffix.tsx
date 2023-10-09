import {Tooltip, Button, InlineStack, Text} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TooltipExample() {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip
        content={
          <InlineStack gap="200">
            Bold
            <Text as="span" variant="bodyMd" tone="subdued">
              ⌘B
            </Text>
          </InlineStack>
        }
      >
        <Button>B</Button>
      </Tooltip>
    </div>
  );
}

export default withPolarisExample(TooltipExample);
