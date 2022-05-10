import { AppProvider, Button,Modal,Stack,TextContainer,TextField } from "@shopify/polaris";
import { useState,useCallback,useRef } from "react";
import translations from '@shopify/polaris/locales/en.json';
function ModalWithPrimaryActionExample() {
  const DISCOUNT_LINK = 'https://polaris.shopify.com/';

  const [active, setActive] = useState(true);
  const node = useRef(null);

  const handleClick = useCallback(() => {
    node.current && node.current.input.focus();
  }, []);

  const handleFocus = useCallback(() => {
    if (node.current == null) {
      return;
    }
    node.current.input.select();
    document.execCommand('copy');
  }, []);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleModal}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Modal
        activator={activator}
        open={active}
        onClose={toggleModal}
        title="Get a shareable link"
        primaryAction={{
          content: 'Close',
          onAction: toggleModal,
        }}
      >
        <Modal.Section>
          <Stack vertical>
            <Stack.Item>
              <TextContainer>
                <p>
                  You can share this discount link with your customers via email
                  or social media. Your discount will be automatically applied
                  at checkout.
                </p>
              </TextContainer>
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                ref={node}
                label="Discount link"
                onFocus={handleFocus}
                value={DISCOUNT_LINK}
                onChange={() => {}}
                autoComplete="off"
                connectedRight={
                  <Button primary onClick={handleClick}>
                    Copy link
                  </Button>
                }
              />
            </Stack.Item>
          </Stack>
        </Modal.Section>
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
        <ModalWithPrimaryActionExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    