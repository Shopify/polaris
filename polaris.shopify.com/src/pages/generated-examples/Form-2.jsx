import {
  AppProvider,
  Form,
  FormLayout,
  TextField,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import translations from "@shopify/polaris/locales/en.json";
function FormWithoutNativeValidationExample() {
  const [url, setUrl] = useState("");

  const handleSubmit = useCallback((_event) => setUrl(""), []);

  const handleUrlChange = useCallback((value) => setUrl(value), []);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={url}
          onChange={handleUrlChange}
          label="App URL"
          type="url"
          autoComplete="off"
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
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
        <FormWithoutNativeValidationExample />
      </div>
    </AppProvider>
  );
}

export default Example;
