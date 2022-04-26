import { AppProvider, Frame, Navigation } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, CirclePlusOutlineMinor, ProductsMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Frame>
  <Navigation location="/">
    <Navigation.Section
      items={[
        {
          url: '/path/to/place',
          label: 'Home',
          icon: HomeMinor,
        },
        {
          url: '/path/to/place',
          label: 'Orders',
          icon: OrdersMinor,
          secondaryAction: {
            url: '/admin/orders/add',
            accessibilityLabel: 'Add an order',
            icon: CirclePlusOutlineMinor,
          },
        },
        {
          url: '/path/to/place',
          label: 'Products',
          icon: ProductsMinor,
        },
      ]}
    />
  </Navigation>
</Frame>
    </AppProvider>
  );
}

export default Example;
    