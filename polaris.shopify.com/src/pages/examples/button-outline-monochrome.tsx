import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ButtonExample() {
  return (
    <div style={{ color: "#bf0711" }}>
      <Button monochrome outline>
        Retry
      </Button>
    </div>
  );
}

export default withPolarisExample(ButtonExample);
