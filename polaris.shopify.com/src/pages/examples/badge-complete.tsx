import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function BadgeExample() {
  return <Badge progress="complete">Fulfilled</Badge>;
}

export default withPolarisExample(BadgeExample);
