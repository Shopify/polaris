import { Card } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function CardExample() {
  return (
    <Card title="Customer">
      <Card.Section>
        <p>John Smith</p>
      </Card.Section>
      <Card.Section
        title="Contact Information"
        actions={[
          { content: "Delete", destructive: true },
          { content: "Edit" },
        ]}
      >
        <p>john.smith@example.com</p>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
