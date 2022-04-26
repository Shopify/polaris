import { AppProvider, Frame, Navigation } from "@shopify/polaris";
import { HomeMajor, OrdersMajor, ProductsMajor, CustomersMajor } from "@shopify/polaris-icons";
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
          icon: HomeMajor,
        },
        {
          url: '/path/to/place',
          label: 'Orders',
          icon: OrdersMajor,
          badge: '15',
        },
        {
          url: '/path/to/place',
          label: 'Products',
          icon: ProductsMajor,
        },
        {
          url: '/path/to/place',
          label: 'Customers',
          icon: CustomersMajor,
        },
      ]}
    />
  </Navigation>
</Frame>
    </AppProvider>
  );
}

export default Example;
    