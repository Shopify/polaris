import { Frame, Navigation } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function NavigationExample() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          duplicateRootItem
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
              url: "/admin/products",
              label: "Products",
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: "/admin/products/collections",
                  disabled: false,
                  selected: false,
                  label: "Collections",
                },
                {
                  url: "/admin/products/inventory",
                  disabled: false,
                  label: "Inventory",
                },
              ],
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}

export default withPolarisExample(NavigationExample);
