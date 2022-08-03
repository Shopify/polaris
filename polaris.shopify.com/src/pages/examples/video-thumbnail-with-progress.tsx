import { MediaCard, VideoThumbnail } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function VideoThumbnailExample() {
  return (
    <MediaCard
      title="Turn your side-project into a business"
      primaryAction={{
        content: "Learn more",
        onAction: () => {},
      }}
      description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
      popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
    >
      <VideoThumbnail
        videoLength={80}
        videoProgress={45}
        showVideoProgress
        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    </MediaCard>
  );
}

export default withPolarisExample(VideoThumbnailExample);
