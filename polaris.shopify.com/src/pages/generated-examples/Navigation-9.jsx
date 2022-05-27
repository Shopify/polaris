import {
  AppProvider,
  Frame,
  Navigation,
  VisuallyHidden,
} from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";
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
        <Frame>
          <Navigation location="/" ariaLabelledBy="label-id">
            <VisuallyHidden>
              <p id="label-id">Hidden label</p>
            </VisuallyHidden>
            <Navigation.Section
              items={[
                {
                  url: "/path/to/place",
                  label: "Home",
                  icon: HomeMinor,
                },
                {
                  url: "/path/to/place",
                  label: "Orders",
                  icon: OrdersMinor,
                  badge: "15",
                },
                {
                  url: "/path/to/place",
                  label: "Products",
                  icon: ProductsMinor,
                },
              ]}
            />
          </Navigation>
        </Frame>
      </div>
    </AppProvider>
  );
}

export default Example;
