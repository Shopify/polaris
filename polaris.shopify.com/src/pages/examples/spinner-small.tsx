import { Spinner } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function SpinnerExample() {
  return <Spinner accessibilityLabel="Small spinner example" size="small" />;
}

export default withPolarisExample(SpinnerExample);
