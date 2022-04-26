import { AppProvider, Button } from "@shopify/polaris";
import { useState } from "react";

import translations from '@shopify/polaris/locales/en.json';
function DisclosureButtion() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Button
      plain
      disclosure={expanded ? 'up' : 'down'}
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      {expanded ? 'Show less' : 'Show more'}
    </Button>
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <DisclosureButtion />
      </div>
    </AppProvider>
  );
}

export default Example;
