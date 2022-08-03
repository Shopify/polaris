import { Avatar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function AvatarExample() {
  return <Avatar name="Shop One" shape="square" />;
}

export default withPolarisExample(AvatarExample);
