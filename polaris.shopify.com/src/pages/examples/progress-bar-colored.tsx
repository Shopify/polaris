import { ProgressBar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ProgressBarExample() {
  return (
    <div>
      <ProgressBar progress={70} color="primary" />
      <br />
      <ProgressBar progress={30} color="success" />
    </div>
  );
}

export default withPolarisExample(ProgressBarExample);
