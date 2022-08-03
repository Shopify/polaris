import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function BadgeExample() {
  return <Badge status="attention">Inactive</Badge>;
}

export default withPolarisExample(BadgeExample);
