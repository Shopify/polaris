import { Card, Stack, Icon, Subheading, List } from "@shopify/polaris";
import { ProductsMajor } from "@shopify/polaris-icons";
import React from "react";

<Card title="Products">
  <Card.Section
    title={
      <Stack>
        <Icon source={ProductsMajor} />
        <Subheading>New Products</Subheading>
      </Stack>
    }
  >
    <List>
      <List.Item>Socks</List.Item>
      <List.Item>Super Shoes</List.Item>
    </List>
  </Card.Section>
</Card>;
