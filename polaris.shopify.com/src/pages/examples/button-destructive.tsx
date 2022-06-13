import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ButtonExample() {
  return <Button destructive>Delete theme</Button>;
}

export default withPolarisExample(ButtonExample);
