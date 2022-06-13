import { SkeletonDisplayText } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function SkeletonExample() {
  return <SkeletonDisplayText size="small" />;
}

export default withPolarisExample(SkeletonExample);
