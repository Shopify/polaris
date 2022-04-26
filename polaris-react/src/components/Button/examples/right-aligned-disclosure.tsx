import { AppProvider, Button } from "@shopify/polaris";
import { useState } from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function RightAlignedDisclosureButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{width: '200px'}}>
      <Button
        fullWidth
        textAlign="left"
        disclosure={expanded ? 'up' : 'down'}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show less' : 'Show more'}
      </Button>
    </div>
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <RightAlignedDisclosureButton />
    </AppProvider>
  );
}

export default Example;
    