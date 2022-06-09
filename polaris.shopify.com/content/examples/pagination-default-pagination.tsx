import { Pagination } from "@shopify/polaris";
import React from "react";

<Pagination
  hasPrevious
  onPrevious={() => {
    console.log("Previous");
  }}
  hasNext
  onNext={() => {
    console.log("Next");
  }}
/>;
