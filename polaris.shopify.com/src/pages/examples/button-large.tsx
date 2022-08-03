import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ButtonExample() {
  return <Button size="large">Create store</Button>;
}

export default withPolarisExample(ButtonExample);
