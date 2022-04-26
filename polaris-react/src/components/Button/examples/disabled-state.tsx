import { AppProvider, ButtonGroup, Button } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <ButtonGroup>
  <Button disabled>Buy shipping label</Button>
  <Button primary disabled>
    Buy shipping label
  </Button>
  <Button destructive disabled>
    Buy shipping label
  </Button>
  <Button outline disabled>
    Buy shipping label
  </Button>
  <span style={{color: '#bf0711'}}>
    <Button outline monochrome disabled>
      Buy shipping label
    </Button>
  </span>
  <Button plain disabled>
    Buy shipping label
  </Button>
  <Button plain destructive disabled>
    Buy shipping label
  </Button>
</ButtonGroup>
    </AppProvider>
  );
}

export default Example;
    