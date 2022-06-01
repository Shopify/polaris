import { AppProvider, ProgressBar } from "@shopify/polaris";
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
        <div>
          <ProgressBar progress={70} color="primary" />
          <br />
          <ProgressBar progress={30} color="success" />
        </div>
      </div>
    </AppProvider>
  );
}

export default Example;
