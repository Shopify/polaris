import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function ButtonExample() {
  return <Button destructive>Delete theme</Button>;
}

export default withPolarisExample(ButtonExample);
