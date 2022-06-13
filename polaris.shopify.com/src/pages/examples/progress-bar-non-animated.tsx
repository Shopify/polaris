import { ProgressBar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ProgressBarExample() {
  return <ProgressBar progress={80} animated={false} />;
}

export default withPolarisExample(ProgressBarExample);
