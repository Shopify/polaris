import { Text } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextExample() {
  return (
    <Text variant="bodyMd" as="p" color="success">
      Orders increased
    </Text>
  );
}

export default withPolarisExample(TextExample);
