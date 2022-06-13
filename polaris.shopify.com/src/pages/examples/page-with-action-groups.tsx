import { Page, Card } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function PageExample() {
  return (
    <Page
      title="Products"
      actionGroups={[
        {
          title: "Copy",
          onClick: (openActions) => {
            alert("Copy action");
            openActions();
          },
          actions: [{ content: "Copy to clipboard" }],
        },
        {
          title: "Promote",
          disabled: true,
          actions: [{ content: "Share on Facebook" }],
        },
        {
          title: "More actions",
          actions: [
            { content: "Duplicate" },
            { content: "Print" },
            { content: "Unarchive" },
            { content: "Cancel order" },
          ],
        },
      ]}
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export default withPolarisExample(PageExample);
