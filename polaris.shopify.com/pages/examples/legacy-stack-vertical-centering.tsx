import {LegacyStack, Badge, Text} from '@shopify/polaris';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyStackExample() {
  return (
    <LegacyStack alignment="center">
      <Text variant="headingMd" as="h2">
        Order
        <br />
        #1136
        <br />
        was paid
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}

export default withPolarisExample(LegacyStackExample);
