import { Stack, Heading, Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function StackExample() {
  return (
    <Stack distribution="fillEvenly">
      <Heading>Order #1136</Heading>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export default withPolarisExample(StackExample);
