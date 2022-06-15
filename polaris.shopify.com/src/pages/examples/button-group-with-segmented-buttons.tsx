import { ButtonGroup, Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ButtonGroupExample() {
  return (
    <ButtonGroup segmented>
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
  );
}

export default withPolarisExample(ButtonGroupExample);
