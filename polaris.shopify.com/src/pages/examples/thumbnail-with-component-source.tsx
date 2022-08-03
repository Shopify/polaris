import { Thumbnail } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ThumbnailExample() {
  return <Thumbnail source={NoteMinor} size="large" alt="Small document" />;
}

export default withPolarisExample(ThumbnailExample);
