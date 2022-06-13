import { DropZone } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function DropZoneExample() {
  return (
    <DropZone label="Theme files">
      <DropZone.FileUpload />
    </DropZone>
  );
}

export default withPolarisExample(DropZoneExample);
