import { AppProvider, CustomProperties } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
import { ComponentType } from "react";
import { className } from "../../utils/various";
import styles from "./PolarisExamplePage.module.scss";

interface LayoutOptions {
  width?: "full" | "intrinsic";
  justifyContent?: "flex-start" | "center";
  alignItems?: "flex-start" | "center";
  padding?: "none" | "default";
}

const defaultLayoutOptions: LayoutOptions = {
  width: "intrinsic",
  justifyContent: "center",
  alignItems: "center",
  padding: "default",
};

interface ExampleProps {
  layoutOptions?: LayoutOptions;
  children: JSX.Element;
}

const stylesheetHref =
  "https://unpkg.com/@shopify/polaris@9.9.0-next.1/build/esm/styles.css";

function PolarisExamplePage({
  layoutOptions = defaultLayoutOptions,
  children,
}: ExampleProps) {
  const layoutOptionsWithDefaults: LayoutOptions = {
    ...defaultLayoutOptions,
    ...layoutOptions,
  };

  const isFullWidth =
    layoutOptionsWithDefaults.width === "full" ||
    layoutOptionsWithDefaults.justifyContent === "flex-start";

  return (
    <>
      <link rel="stylesheet" href={stylesheetHref} />
      <AppProvider i18n={translations}>
        <CustomProperties>
          <div
            className={className(styles.Container)}
            style={{
              justifyContent: layoutOptionsWithDefaults.justifyContent,
              alignItems: layoutOptionsWithDefaults.alignItems,
              padding:
                layoutOptionsWithDefaults.padding === "default"
                  ? "0 16px"
                  : undefined,
            }}
          >
            <div
              id="polaris-example"
              style={{
                flex: isFullWidth ? 1 : undefined,
              }}
            >
              {children}
            </div>
          </div>
        </CustomProperties>
      </AppProvider>
    </>
  );
}

export default PolarisExamplePage;

export const withPolarisExample = (
  Component: ComponentType,
  layoutOptions: LayoutOptions = defaultLayoutOptions
) => {
  const PolarisHOC = (props: any) => {
    return (
      <PolarisExamplePage layoutOptions={layoutOptions}>
        <Component {...props} />
      </PolarisExamplePage>
    );
  };

  if (Component.displayName) {
    PolarisHOC.displayName = `PolarisExample${Component.displayName}`;
  }

  return PolarisHOC;
};
