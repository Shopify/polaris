import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function BadgeExample() {
  return <Badge status="info">Published</Badge>;
}

export default withPolarisExample(BadgeExample);
