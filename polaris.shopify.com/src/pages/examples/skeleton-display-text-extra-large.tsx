import { SkeletonDisplayText } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function SkeletonExample() {
  return <SkeletonDisplayText size="extraLarge" />;
}

export default withPolarisExample(SkeletonExample);
