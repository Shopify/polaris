import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ButtonExample() {
  return (
    <div style={{ height: "100px" }}>
      <Button disclosure="select" onClick={() => console.log("Open Popover")}>
        Select options
      </Button>
    </div>
  );
}

export default withPolarisExample(ButtonExample);
