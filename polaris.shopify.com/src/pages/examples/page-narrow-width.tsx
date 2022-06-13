import { Page, Card, PageActions } from "@shopify/polaris";
import React from "react";

<Page
  narrowWidth
  breadcrumbs={[{ content: "Orders", url: "/orders" }]}
  title="Add payment method"
  primaryAction={{ content: "Save", disabled: true }}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
  <PageActions
    primaryAction={{ content: "Save", disabled: true }}
    secondaryActions={[{ content: "Delete" }]}
  />
</Page>;

import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p />);
