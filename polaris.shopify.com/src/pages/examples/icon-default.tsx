import { Icon } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function IconExample() {
  return <Icon source={CirclePlusMinor} />;
}

export default withPolarisExample(IconExample);
