import { Card, SkeletonTabs } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function SkeletonExample() {
  return (
    <Card>
      <SkeletonTabs />
    </Card>
  );
}

export default withPolarisExample(SkeletonExample);
