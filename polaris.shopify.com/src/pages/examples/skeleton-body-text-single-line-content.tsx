import { SkeletonBodyText } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function SkeletonExample() {
  return <SkeletonBodyText lines={1} />;
}

export default withPolarisExample(SkeletonExample);
