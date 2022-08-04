import { Toast, Frame, Page, ButtonGroup, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function MultipleToastExample() {
  const [activeOne, setActiveOne] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);

  const toggleActiveOne = useCallback(
    () => setActiveOne((activeOne) => !activeOne),
    []
  );

  const toggleActiveTwo = useCallback(
    () => setActiveTwo((activeTwo) => !activeTwo),
    []
  );

  const toastMarkup1 = activeOne ? (
    <Toast content="Message sent" onDismiss={toggleActiveOne} />
  ) : null;

  const toastMarkup2 = activeTwo ? (
    <Toast content="Image uploaded" onDismiss={toggleActiveTwo} />
  ) : null;

  return (
    <div style={{ height: "250px" }}>
      <Frame>
        <Page title="Toast example">
          <ButtonGroup segmented>
            <Button onClick={toggleActiveOne}>Show toast 1</Button>
            <Button onClick={toggleActiveTwo}>Show toast 2</Button>
          </ButtonGroup>
          {toastMarkup1}
          {toastMarkup2}
        </Page>
      </Frame>
    </div>
  );
}

export default withPolarisExample(MultipleToastExample);
