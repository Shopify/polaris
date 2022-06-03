import { AppProvider, Button, Modal, TextContainer } from "@shopify/polaris";
import { useState, useCallback } from "react";
import translations from "@shopify/polaris/locales/en.json";
function ModalWithScrollListenerExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleScrollBottom = useCallback(() => alert("Scrolled to bottom"), []);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{ height: "500px" }}>
      <Modal
        activator={activator}
        open={active}
        title="Scrollable content"
        onClose={handleChange}
        onScrolledToBottom={handleScrollBottom}
      >
        {Array.from({ length: 50 }, (_, index) => (
          <Modal.Section key={index}>
            <TextContainer>
              <p>
                Item <a href="#">#{index}</a>
              </p>
            </TextContainer>
          </Modal.Section>
        ))}
      </Modal>
    </div>
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
        <ModalWithScrollListenerExample />
      </div>
    </AppProvider>
  );
}

export default Example;
