import { Frame, Navigation } from "@shopify/polaris";
import {
  HomeMinor,
  OrdersMinor,
  MarketingMinor,
  ProductsMinor,
} from "@shopify/polaris-icons";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

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
              badge: "15",
              subNavigationItems: [
                {
                  url: "/admin/orders/collections",
                  disabled: false,
                  selected: false,
                  label: "Collections",
                },
                {
                  url: "/admin/orders/inventory",
                  disabled: false,
                  label: "Inventory",
                },
              ],
            },
            {
              url: "/path/to/place",
              label: "Marketing",
              icon: MarketingMinor,
              badge: "15",
              subNavigationItems: [
                {
                  url: "/admin/analytics/collections",
                  disabled: false,
                  selected: false,
                  label: "Reports",
                },
                {
                  url: "/admin/analytics/inventory",
                  disabled: false,
                  label: "Live view",
                },
              ],
            },
            {
              url: "/admin/products",
              label: "Products",
              icon: ProductsMinor,
              selected: true,
              subNavigationItems: [
                {
                  url: "/?path=/story/all-components-navigation--navigation-with-multiple-secondary-navigations",
                  disabled: false,
                  selected: false,
                  label: "Collections",
                },
                {
                  url: "/admin/products/inventory",
                  disabled: false,
                  selected: true,
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
