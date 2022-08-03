import { Card, List } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function CardExample() {
  return (
    <Card
      title="Shipment 1234"
      secondaryFooterActions={[
        { content: "Cancel shipment", destructive: true },
      ]}
      primaryFooterAction={{ content: "Add tracking number" }}
    >
      <Card.Section title="Items">
        <List>
          <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
          <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
