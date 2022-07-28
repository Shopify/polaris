import { AppProvider, CustomProperties } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { ComponentType } from "react";
import styles from "./PolarisExamplePage.module.scss";

interface ExampleProps {
  children: JSX.Element;
}

const stylesheetHref =
  "https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css";

function PolarisExamplePage(props: ExampleProps) {
  return (
    <>
      <link rel="stylesheet" href={stylesheetHref} />
      <AppProvider i18n={translations}>
        <CustomProperties>
          <div className={styles.Container}>
            <div id="polaris-example">{props.children}</div>
          </div>
        </CustomProperties>
      </AppProvider>
    </>
  );
}

export default PolarisExamplePage;

export const withPolarisExample = (Component: ComponentType) => {
  const PolarisHOC = (props: any) => {
    return (
      <PolarisExamplePage>
        <Component {...props} />
      </PolarisExamplePage>
    );
  };

  if (Component.displayName) {
    PolarisHOC.displayName = `PolarisExample${Component.displayName}`;
  }

  return PolarisHOC;
};
