import { Text } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextExample() {
  return (
    <Text variant="bodyMd" as="p" fontWeight="semibold">
      Sales this year
    </Text>
  );
}

export default withPolarisExample(TextExample);
