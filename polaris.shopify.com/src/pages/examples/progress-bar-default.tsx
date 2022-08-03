import { ProgressBar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ProgressBarExample() {
  return <ProgressBar progress={75} />;
}

export default withPolarisExample(ProgressBarExample);
