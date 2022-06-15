import { TextStyle } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextStyleExample() {
  return <TextStyle variation="negative">Orders decreased</TextStyle>;
}

export default withPolarisExample(TextStyleExample);
