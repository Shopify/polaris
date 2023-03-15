import {Divider, Text, Stack} from '@shopify/polaris';

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DividerWithBorderStylesExample() {
  return (
    <Stack gap="5">
      <Text as="h1" variant="headingXs">
        Base
      </Text>
      <Divider borderStyle="base" />
      <Text as="h1" variant="headingXs">
        Dark
      </Text>
      <Divider borderStyle="dark" />
      <Text as="h1" variant="headingXs">
        Divider
      </Text>
      <Divider borderStyle="divider" />
      <Text as="h1" variant="headingXs">
        Divider on dark
      </Text>
      <Divider borderStyle="divider-on-dark" />
      <Text as="h1" variant="headingXs">
        Transparent
      </Text>
      <Divider borderStyle="transparent" />
    </Stack>
  );
}

export default withPolarisExample(DividerWithBorderStylesExample);
