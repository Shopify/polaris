import { Stack, Heading, Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function StackExample() {
  return (
    <Stack distribution="fill">
      <Heading>Order #1136</Heading>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export default withPolarisExample(StackExample);
