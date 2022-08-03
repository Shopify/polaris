import { Tag, Stack, Icon } from "@shopify/polaris";
import { WandMinor } from "@shopify/polaris-icons";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function TagExample() {
  return (
    <Tag url="/collections/wholesale">
      <Stack spacing="extraTight">
        <Icon source={WandMinor} />
        <span>Wholesale</span>
      </Stack>
    </Tag>
  );
}

export default withPolarisExample(TagExample);
