import { Select } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function SelectExample() {
  return (
    <Select
      label="Date range"
      disabled
      options={[
        { label: "Today", value: "today" },
        { label: "Yesterday", value: "yesterday" },
        { label: "Last 7 days", value: "lastWeek" },
      ]}
    />
  );
}

export default withPolarisExample(SelectExample);
