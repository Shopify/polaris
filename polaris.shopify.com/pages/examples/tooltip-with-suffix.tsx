import {Tooltip, Button, Inline, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TooltipExample() {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip
        content={
          <Inline gap="2">
            Bold
            <Text as="span" variant="bodyMd" color="subdued">
              ⌘B
            </Text>
          </Inline>
        }
      >
        <Button>B</Button>
      </Tooltip>
    </div>
  );
}

export default withPolarisExample(TooltipExample);
