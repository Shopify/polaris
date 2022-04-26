import { AppProvider, MediaCard, VideoThumbnail } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <MediaCard
  title="Turn your side-project into a business"
  primaryAction={{
    content: 'Learn more',
    onAction: () => {},
  }}
  description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <VideoThumbnail
    videoLength={80}
    videoProgress={45}
    showVideoProgress
    thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
  />
</MediaCard>
    </AppProvider>
  );
}

export default Example;
    