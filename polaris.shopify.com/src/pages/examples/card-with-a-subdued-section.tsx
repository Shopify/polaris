import { Card, List } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function CardExample() {
  return (
    <Card title="Staff accounts">
      <Card.Section>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </Card.Section>

      <Card.Section subdued title="Deactivated staff accounts">
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
