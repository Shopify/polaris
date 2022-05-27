import { AppProvider, ButtonGroup, Button } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

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
          <span style={{ color: "#bf0711" }}>
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
      </div>
    </AppProvider>
  );
}

export default Example;
