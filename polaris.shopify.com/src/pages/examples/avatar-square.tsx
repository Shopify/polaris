import { Avatar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function AvatarExample() {
  return <Avatar name="Shop One" shape="square" />;
}

export default withPolarisExample(AvatarExample);
