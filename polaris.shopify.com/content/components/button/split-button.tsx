import { Button } from "@shopify/polaris";
import React from "react";

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
</div>;
