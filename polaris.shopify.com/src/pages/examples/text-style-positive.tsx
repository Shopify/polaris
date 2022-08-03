import { TextStyle } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function TextStyleExample() {
  return <TextStyle variation="positive">Orders increased</TextStyle>;
}

export default withPolarisExample(TextStyleExample);
