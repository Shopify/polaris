import { AppProvider, Stack,Tag,TextField } from "@shopify/polaris";
import { useState,useCallback } from "react";
import translations from '@shopify/polaris/locales/en.json';
function VerticalContent() {
  const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const verticalContentMarkup =
    tags.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Stack>
    ) : null;

  return (
    <TextField
      label="Tags"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder="Search tags"
      autoComplete="off"
      verticalContent={verticalContentMarkup}
    />
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
        <VerticalContent />
      </div>
    </AppProvider>
  );
}

export default Example;
    