import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ButtonExample() {
  return <Button outline>Add product</Button>;
}

export default withPolarisExample(ButtonExample);
