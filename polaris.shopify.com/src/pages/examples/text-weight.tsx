import { Text, Stack } from "@shopify/polaris";
import React from "react";
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function TextExample() {
  return (
    <Stack vertical>
      <Text variant="bodyMd" as="p" fontWeight="bold">
        Sales this year
      </Text>
      <Text variant="bodyMd" as="p" fontWeight="semibold">
        Sales this year
      </Text>
      <Text variant="bodyMd" as="p" fontWeight="medium">
        Sales this year
      </Text>
      <Text variant="bodyMd" as="p" fontWeight="regular">
        Sales this year
      </Text>
    </Stack>
  );
}

export default withPolarisExample(TextExample);
