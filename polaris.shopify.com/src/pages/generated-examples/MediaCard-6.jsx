import { AppProvider, MediaCard,VideoThumbnail } from "@shopify/polaris";

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
  portrait
  title="Turn your side-project into a business"
  primaryAction={{
    content: 'Learn more',
    onAction: () => {},
  }}
  description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <VideoThumbnail
    videoLength={80}
    thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
  />
</MediaCard>
      </div>
    </AppProvider>
  );
}

export default Example;
