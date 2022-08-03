import { TextStyle } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function TextStyleExample() {
  return <TextStyle variation="warning">Scheduled maintenance</TextStyle>;
}

export default withPolarisExample(TextStyleExample);
