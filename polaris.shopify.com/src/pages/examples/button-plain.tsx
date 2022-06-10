import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ButtonExample() {
  return <Button plain>View shipping settings</Button>;
}

export default withPolarisExample(ButtonExample);
