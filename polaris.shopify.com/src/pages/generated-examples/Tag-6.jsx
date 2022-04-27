import { AppProvider, Tag,Stack } from "@shopify/polaris";
import { useState,useCallback } from "react";
import translations from '@shopify/polaris/locales/en.json';
function RemovableTagWithLinkExample() {
  const [selectedTags, setSelectedTags] = useState([
    'Rustic',
    'Antique',
    'Vinyl',
    'Refurbished',
  ]);

  const removeTag = useCallback(
    (tag) => () => {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag),
      );
    },
    [],
  );

  const tagMarkup = selectedTags.map((option) => (
    <Tag key={option} onRemove={removeTag(option)} url="/collections/wholesale">
      {option}
    </Tag>
  ));

  return <Stack spacing="tight">{tagMarkup}</Stack>;
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
        <RemovableTagWithLinkExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    