import { PageActions, Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function PageExample() {
  return (
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
    />
  );
}

export default withPolarisExample(PageExample);
