import { PageActions, Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function PageExample() {
  return (
    <PageActions
      primaryAction={
        <Button
          primary
          connectedDisclosure={{
            accessibilityLabel: "Other save actions",
            actions: [{ content: "Save as draft" }],
          }}
        >
          Save
        </Button>
      }
      secondaryActions={[
        {
          content: "Delete",
          destructive: true,
        },
      ]}
    />
  );
}

export default withPolarisExample(PageExample);
