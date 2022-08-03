import { Form, FormLayout, TextField, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

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

export default withPolarisExample(FormWithoutNativeValidationExample);
