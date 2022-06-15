import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function BadgeExample() {
  return <Badge status="success">Funds recovered</Badge>;
}

export default withPolarisExample(BadgeExample);
