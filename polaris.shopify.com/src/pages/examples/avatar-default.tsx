import { Avatar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function AvatarExample() {
  return <Avatar customer name="Farrah" />;
}

export default withPolarisExample(AvatarExample);
