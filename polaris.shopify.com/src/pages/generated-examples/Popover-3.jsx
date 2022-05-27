import {
  AppProvider,
  Button,
  Popover,
  FormLayout,
  Select,
  TextField,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import translations from "@shopify/polaris/locales/en.json";
function PopoverFormExample() {
  const [popoverActive, setPopoverActive] = useState(true);
  const [tagValue, setTagValue] = useState("");

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const handleTagValueChange = useCallback((value) => setTagValue(value), []);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Filter
    </Button>
  );

  return (
    <div style={{ height: "280px" }}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
        sectioned
      >
        <FormLayout>
          <Select label="Show all customers where:" options={["Tagged with"]} />
          <TextField
            label="Tags"
            value={tagValue}
            onChange={handleTagValueChange}
            autoComplete="off"
          />
          <Button size="slim">Add filter</Button>
        </FormLayout>
      </Popover>
    </div>
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 50px",
        }}
      >
        <PopoverFormExample />
      </div>
    </AppProvider>
  );
}

export default Example;
