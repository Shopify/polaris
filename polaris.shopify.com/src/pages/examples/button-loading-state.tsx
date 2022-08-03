import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ButtonExample() {
  return <Button loading>Save product</Button>;
}

export default withPolarisExample(ButtonExample);
