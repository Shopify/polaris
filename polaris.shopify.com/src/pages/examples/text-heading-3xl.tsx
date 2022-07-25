import { Text } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextExample() {
  return (
    <Text variant="heading3xl" as="h2">
      Online store dashboard
    </Text>
  );
}

export default withPolarisExample(TextExample);
