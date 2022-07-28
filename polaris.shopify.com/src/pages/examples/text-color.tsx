import { Text, Stack } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextExample() {
  return (
    <Stack vertical>
      <Text variant="bodyMd" as="p" color="subdued">
        Orders increased
      </Text>
      <Text variant="bodyMd" as="p" color="success">
        Orders increased
      </Text>
      <Text variant="bodyMd" as="p" color="warning">
        Orders increased
      </Text>
      <Text variant="bodyMd" as="p" color="critical">
        Orders increased
      </Text>
    </Stack>
  );
}

export default withPolarisExample(TextExample);
