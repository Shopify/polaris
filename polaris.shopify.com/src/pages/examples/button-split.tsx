import { Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ButtonExample() {
  return (
    <div style={{ height: "100px" }}>
      <Button
        primary
        connectedDisclosure={{
          accessibilityLabel: "Other save actions",
          actions: [{ content: "Save as draft" }],
        }}
      >
        Save
      </Button>
    </div>
  );
}

export default withPolarisExample(ButtonExample);
