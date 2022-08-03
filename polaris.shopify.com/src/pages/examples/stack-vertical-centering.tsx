import { Stack, Heading, Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function StackExample() {
  return (
    <Stack alignment="center">
      <Heading>
        Order
        <br />
        #1136
        <br />
        was paid
      </Heading>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export default withPolarisExample(StackExample);
