import { Text } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextExample() {
  return (
    <Text variant="bodyLg" as="p">
      Shopify POS is the easiest way to sell your products in person. Available
      for iPad, iPhone, and Android.
    </Text>
  );
}

export default withPolarisExample(TextExample);
