import { DropZone } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function DropZoneExample() {
  return (
    <div style={{ width: 114, height: 114 }}>
      <DropZone>
        <DropZone.FileUpload />
      </DropZone>
    </div>
  );
}

export default withPolarisExample(DropZoneExample);
