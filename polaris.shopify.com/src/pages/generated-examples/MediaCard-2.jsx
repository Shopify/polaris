import { AppProvider, MediaCard } from "@shopify/polaris";

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
        <MediaCard
  title="Getting Started"
  primaryAction={{
    content: 'Learn about getting started',
    onAction: () => {},
  }}
  description="Discover how Shopify can power up your entrepreneurial journey."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
  size="small"
>
  <img
    alt=""
    width="100%"
    height="100%"
    style={{
      objectFit: 'cover',
      objectPosition: 'center',
    }}
    src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
  />
</MediaCard>
      </div>
    </AppProvider>
  );
}

export default Example;
