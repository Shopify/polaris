import { Text } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextExample() {
  return <Text variant="headingXl" as="h6"> Online store dashboard</Text>;
}

export default withPolarisExample(TextExample);