import { ButtonGroup, Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function ButtonGroupExample() {
  return (
    <ButtonGroup segmented>
      <Button outline>Bold</Button>
      <Button outline>Italic</Button>
      <Button outline>Underline</Button>
    </ButtonGroup>
  );
}

export default withPolarisExample(ButtonGroupExample);
