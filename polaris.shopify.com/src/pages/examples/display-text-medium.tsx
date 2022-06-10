import { DisplayText } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function DisplayExample() {
  return <DisplayText size="medium">Good evening, Dominic.</DisplayText>;
}

export default withPolarisExample(DisplayExample);
