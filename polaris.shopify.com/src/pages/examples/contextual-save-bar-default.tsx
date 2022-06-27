import { Frame, ContextualSaveBar } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function Example() {
  return (
    <Frame
      logo={{
        width: 124,
        contextualSaveBarSource:
          "https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999",
      }}
    >
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          onAction: () => console.log("add form submit logic"),
          loading: false,
          disabled: false,
        }}
        discardAction={{
          onAction: () => console.log("add clear form logic"),
        }}
      />
    </Frame>
  );
}

export default withPolarisExample(Example);
