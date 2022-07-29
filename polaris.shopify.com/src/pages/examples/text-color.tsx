import { Text, Stack } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function TextExample() {
  return (
    <Stack vertical>
      <Text variant="bodyMd" as="p" color="subdued">Use to de-emphasize a piece of text that is less important to merchants than other nearby text. May also be used to indicate when normal content is absent, for example, “No supplier listed”. Don’t use only for aesthetic effect.</Text>
      <Text variant="bodyMd" as="p" color="success">Use in combination with a symbol showing an increasing value to indicate an upward trend.</Text>
      <Text variant="bodyMd" as="p" color="warning">Use to denote something that needs attention, or that merchants need to take action on.</Text>
      <Text variant="bodyMd" as="p" color="critical">Use in combination with a symbol showing a decreasing value to indicate a downward trend.</Text>
    </Stack>
  );
}

export default withPolarisExample(TextExample);
