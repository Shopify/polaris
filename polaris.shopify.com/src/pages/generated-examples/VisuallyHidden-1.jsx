import { AppProvider, Card,VisuallyHidden,Heading,FormLayout,TextField } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

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
        <Card sectioned>
  <VisuallyHidden>
    <Heading>Title and description</Heading>
  </VisuallyHidden>
  <FormLayout>
    <TextField
      label="Title"
      value="Artisanal Wooden Spoon"
      onChange={() => {}}
      autoComplete="off"
    />
    <TextField
      label="Description"
      multiline
      onChange={() => {}}
      autoComplete="off"
    />
  </FormLayout>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
    