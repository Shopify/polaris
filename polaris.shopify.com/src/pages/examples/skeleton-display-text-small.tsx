import { SkeletonDisplayText } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function SkeletonExample() {
  return <SkeletonDisplayText size="small" />;
}

export default withPolarisExample(SkeletonExample);
