import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function BadgeExample() {
  return <Badge status="warning">Expired</Badge>;
}

export default withPolarisExample(BadgeExample);
