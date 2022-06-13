import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function BadgeExample() {
  return <Badge status="attention">Inactive</Badge>;
}

export default withPolarisExample(BadgeExample);
