import { Button, Modal, TextContainer, Banner } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function BannerInModalExample() {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <div style={{ height: "500px" }}>
      <Button onClick={handleChange}>Open</Button>
      <Modal
        open={active}
        onClose={handleChange}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: "Add Instagram",
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: "Learn more",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <Banner action={{ content: "Connect account" }} status="warning">
              <p>
                Connect your instagram account to your shop before proceeding.
              </p>
            </Banner>
            <p>
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default withPolarisExample(BannerInModalExample);
