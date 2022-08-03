import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ButtonExample() {
  return <Button fullWidth>Add customer</Button>;
}

export default withPolarisExample(ButtonExample);
