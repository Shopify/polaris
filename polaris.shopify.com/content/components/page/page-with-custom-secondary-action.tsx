import { Page, Button } from "@shopify/polaris";
import React from "react";

<Page
  title="General"
  secondaryActions={
    <Button
      connectedDisclosure={{
        accessibilityLabel: "Other save actions",
        actions: [{ content: "Save as new" }],
      }}
    >
      Save
    </Button>
  }
>
  <p>Page content</p>
</Page>;
