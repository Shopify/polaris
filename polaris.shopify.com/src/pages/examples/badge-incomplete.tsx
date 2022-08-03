import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function BadgeExample() {
  return (
    <Badge progress="incomplete" status="warning">
      Unfulfilled
    </Badge>
  );
}

export default withPolarisExample(BadgeExample);
