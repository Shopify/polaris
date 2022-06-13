import { Pagination } from "@shopify/polaris";
import React from "react";

<Pagination
  label="Results"
  hasPrevious
  onPrevious={() => {
    console.log("Previous");
  }}
  hasNext
  onNext={() => {
    console.log("Next");
  }}
/>;

import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p />);
