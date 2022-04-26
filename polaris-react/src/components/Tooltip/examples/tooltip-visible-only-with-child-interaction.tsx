import { AppProvider, ButtonGroup, Tooltip, Button, TextField } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div style={{width: '200px'}}>
  <ButtonGroup segmented fullWidth>
    <Tooltip content="Bold" dismissOnMouseOut>
      <Button>B</Button>
    </Tooltip>
    <Tooltip content="Italic" dismissOnMouseOut>
      <Button>I</Button>
    </Tooltip>
    <Tooltip content="Underline" dismissOnMouseOut>
      <Button>U</Button>
    </Tooltip>
    <Tooltip content="Strikethrough" dismissOnMouseOut>
      <Button>S</Button>
    </Tooltip>
  </ButtonGroup>
  <TextField label="Product title" autoComplete="off" labelHidden multiline />
</div>
    </AppProvider>
  );
}

export default Example;
    