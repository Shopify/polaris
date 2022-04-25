import { AppProvider, Frame,Navigation } from "@shopify/polaris";
import { HomeMinor,OrdersMinor,ProductsMinor,OnlineStoreMinor } from "@shopify/polaris-icons";

import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
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
      items={[
        {
          url: '/path/to/place',
          label: 'Online Store',
          icon: OnlineStoreMinor,
        },
      ]}
      separator
    />
  </Navigation>
</Frame>
      </div>
    </AppProvider>
  );
}

export default Example;
