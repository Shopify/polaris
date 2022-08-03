import { Frame, Navigation } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function NavigationExample() {
  return (
    <Frame>
      <Navigation location="/">
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
            },
            {
              url: "/path/to/place",
              label: "Products",
              icon: ProductsMinor,
            },
          ]}
          rollup={{
            after: 2,
            view: "view",
            hide: "hide",
            activePath: "/",
          }}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
