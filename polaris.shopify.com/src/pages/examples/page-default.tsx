import { Page, Badge, Card } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function PageExample() {
  return (
    <Page
      breadcrumbs={[{ content: "Products", url: "/products" }]}
      title="3/4 inch Leather pet collar"
      titleMetadata={<Badge status="success">Paid</Badge>}
      subtitle="Perfect for any pet"
      compactTitle
      primaryAction={{ content: "Save", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          content: "View on your store",
          onAction: () => alert("View on your store action"),
        },
      ]}
      actionGroups={[
        {
          title: "Promote",
          accessibilityLabel: "Action group label",
          actions: [
            {
              content: "Share on Facebook",
              accessibilityLabel: "Individual action label",
              onAction: () => alert("Share on Facebook action"),
            },
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Card title="Credit card" sectioned>
        <p>Credit card information</p>
      </Card>
    </Page>
  );
}

export default withPolarisExample(PageExample);
