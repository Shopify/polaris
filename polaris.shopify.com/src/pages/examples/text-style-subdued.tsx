import { TextStyle } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextStyleExample() {
  return <TextStyle variation="subdued">No supplier listed</TextStyle>;
}

export default withPolarisExample(TextStyleExample);
