import { Stack, Tag, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function VerticalContentExample() {
  const tags = ["Rustic", "Antique", "Vinyl", "Refurbished"];
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
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

export default withPolarisExample(VerticalContentExample);
