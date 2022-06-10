import { Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function BadgeExample() {
  return <Badge status="critical">Action required</Badge>;
}

export default withPolarisExample(BadgeExample);
