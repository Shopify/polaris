import { AppProvider, CustomProperties } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { ComponentType, useEffect } from "react";

interface ExampleProps {
  children: JSX.Element;
}

const stylesheetHref =
  "https://unpkg.com/@shopify/polaris@9.9.0-next.1/build/esm/styles.css";

function PolarisExamplePage(props: ExampleProps) {
  // Alternative way of linking the sheet
  // useEffect(() => {
  //   let stylesheetElement = document.createElement("link");

  //   stylesheetElement.href = stylesheetHref;
  //   stylesheetElement.rel = "stylesheet";

  //   document.head.appendChild(stylesheetElement);
  // }, []);

  return (
    <>
      <link rel="stylesheet" href={stylesheetHref} />
      <AppProvider i18n={translations}>
        <CustomProperties>{props.children}</CustomProperties>
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
