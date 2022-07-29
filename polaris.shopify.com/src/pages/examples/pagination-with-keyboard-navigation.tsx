import { Pagination } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function PaginationExample() {
  return (
    <div style={{ height: "100px" }}>
      <Pagination
        hasPrevious
        previousKeys={[74]}
        previousTooltip="j"
        onPrevious={() => {
          console.log("Previous");
        }}
        hasNext
        nextKeys={[75]}
        nextTooltip="k"
        onNext={() => {
          console.log("Next");
        }}
      />
    </div>
  );
}

export default withPolarisExample(PaginationExample);
