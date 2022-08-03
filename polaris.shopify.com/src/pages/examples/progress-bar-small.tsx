import { ProgressBar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function ProgressBarExample() {
  return <ProgressBar progress={40} size="small" />;
}

export default withPolarisExample(ProgressBarExample);
