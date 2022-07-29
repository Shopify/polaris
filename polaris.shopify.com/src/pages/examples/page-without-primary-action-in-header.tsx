import { Page, Card, Stack, Button } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function PageExample() {
  return (
    <Page
      breadcrumbs={[{ content: "Orders", url: "/orders" }]}
      title="#1085"
      secondaryActions={[
        { content: "Print" },
        { content: "Unarchive" },
        { content: "Cancel order" },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <Card sectioned title="Fulfill order">
        <Stack alignment="center">
          <Stack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </Stack.Item>
          <Button primary>Continue</Button>
        </Stack>
      </Card>
    </Page>
  );
}

export default withPolarisExample(PageExample);
