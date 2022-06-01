import { AppProvider, Modal } from "@shopify/polaris";
import { useState, useCallback } from "react";
import translations from "@shopify/polaris/locales/en.json";
function EmbeddedAppModalExample() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = useCallback(() => setModalOpen(false), []);

  return (
    <AppProvider apiKey="YOUR_API_KEY" i18n={{}} shopOrigin="YOUR_SHOP_ORIGIN">
      <Modal
        src="https://my-app.com/upgrade-to-retail-package"
        open={modalOpen}
        title="Upgrade your Shopify POS with the Retail Package"
        primaryAction={{
          content: "Add Retail Package",
          onAction: handleModalClose,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleModalClose,
          },
        ]}
        onClose={handleModalClose}
      />
    </AppProvider>
  );
}

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
        <EmbeddedAppModalExample />
      </div>
    </AppProvider>
  );
}

export default Example;
