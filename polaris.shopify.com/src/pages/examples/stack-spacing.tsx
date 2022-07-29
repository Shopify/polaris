import { Stack, Badge } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function StackExample() {
  return (
    <Stack spacing="loose">
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </Stack>
  );
}

export default withPolarisExample(StackExample);
