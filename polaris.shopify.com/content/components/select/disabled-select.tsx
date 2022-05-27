import { Select } from "@shopify/polaris";
import React from "react";

<Select
  label="Date range"
  disabled
  options={[
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ]}
/>;
