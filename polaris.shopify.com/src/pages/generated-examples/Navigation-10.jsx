import { AppProvider, Frame,Navigation } from "@shopify/polaris";
import { HomeMajor,OrdersMajor,ProductsMajor,CustomersMajor } from "@shopify/polaris-icons";
import translations from '@shopify/polaris/locales/en.json';

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
      </div>
    </AppProvider>
  );
}

export default Example;
    