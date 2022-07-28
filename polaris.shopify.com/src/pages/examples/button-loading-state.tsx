import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ButtonExample() {
  return <Button loading>Save product</Button>;
}

export default withPolarisExample(ButtonExample);
