import { Spinner } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function SpinnerExample() {
  return <Spinner accessibilityLabel="Spinner example" size="large" />;
}

export default withPolarisExample(SpinnerExample);
