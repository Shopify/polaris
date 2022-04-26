import { AppProvider, Button } from "@shopify/polaris";
import { useState } from "react";
import '@shopify/polaris/build/esm/styles.css';
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
      <DisclosureButtion />
    </AppProvider>
  );
}

export default Example;
    