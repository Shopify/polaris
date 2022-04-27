import { AppProvider, ButtonGroup,Tooltip,Button,TextField } from "@shopify/polaris";
import translations from '@shopify/polaris/locales/en.json';

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
      </div>
    </AppProvider>
  );
}

export default Example;
    