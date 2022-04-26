import { AppProvider, Frame, Navigation } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor, OnlineStoreMinor, CirclePlusOutlineMinor } from "@shopify/polaris-icons";
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
        },
        {
          url: '/path/to/place',
          label: 'Products',
          icon: ProductsMinor,
        },
      ]}
    />
    <Navigation.Section
      title="Sales channels"
      items={[
        {
          url: '/path/to/place',
          label: 'Online Store',
          icon: OnlineStoreMinor,
        },
      ]}
      action={{
        accessibilityLabel: 'Add sales channel',
        icon: CirclePlusOutlineMinor,
        onClick: () => {},
      }}
    />
  </Navigation>
</Frame>
    </AppProvider>
  );
}

export default Example;
    