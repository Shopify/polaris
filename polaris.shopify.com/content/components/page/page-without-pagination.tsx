import { Page, Card } from "@shopify/polaris";
import React from "react";

<Page
  breadcrumbs={[{ content: "Settings", url: "/settings" }]}
  title="General"
  primaryAction={{ content: "Save" }}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>;
