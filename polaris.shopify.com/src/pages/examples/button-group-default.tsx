import { ButtonGroup, Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ButtonGroupExample() {
  return (
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button primary>Save</Button>
    </ButtonGroup>
  );
}

export default withPolarisExample(ButtonGroupExample);
