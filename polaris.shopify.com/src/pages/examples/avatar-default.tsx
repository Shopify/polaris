import { Avatar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function AvatarExample() {
  return <Avatar customer name="Farrah" />;
}

export default withPolarisExample(AvatarExample);
