import { Card, SkeletonTabs } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function SkeletonExample() {
  return (
    <Card>
      <SkeletonTabs />
    </Card>
  );
}

export default withPolarisExample(SkeletonExample);
