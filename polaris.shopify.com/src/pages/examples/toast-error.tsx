import { Toast, Frame, Page, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ErrorToastExample() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Server error" error onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{ height: "250px" }}>
      <Frame>
        <Page title="Toast example">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}

export default withPolarisExample(ErrorToastExample);
