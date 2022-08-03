import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function BadgeExample() {
  return (
    <Badge progress="partiallyComplete" status="attention">
      Partially fulfilled
    </Badge>
  );
}

export default withPolarisExample(BadgeExample);
