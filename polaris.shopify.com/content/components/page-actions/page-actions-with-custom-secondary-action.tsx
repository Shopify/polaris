import { PageActions, Button } from "@shopify/polaris";
import React from "react";

<PageActions
  primaryAction={{
    content: "Save",
  }}
  secondaryActions={
    <Button
      connectedDisclosure={{
        accessibilityLabel: "Other save actions",
        actions: [{ content: "Save as draft" }],
      }}
    >
      Save
    </Button>
  }
/>;
