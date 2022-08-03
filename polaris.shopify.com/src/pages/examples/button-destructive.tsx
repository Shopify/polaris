import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ButtonExample() {
  return <Button destructive>Delete theme</Button>;
}

export default withPolarisExample(ButtonExample);
