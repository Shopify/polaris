import {
  Button,
  Modal,
  LegacyStack,
  TextContainer,
  Frame,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ModalWithPrimaryActionExample() {
  const [active, setActive] = useState(true);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleModal}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Frame>
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
            <LegacyStack vertical>
              <LegacyStack.Item>
                <TextContainer>
                  <p>
                    You can share this discount link with your customers via
                    email or social media. Your discount will be automatically
                    applied at checkout.
                  </p>
                </TextContainer>
              </LegacyStack.Item>
            </LegacyStack>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}

export default withPolarisExample(ModalWithPrimaryActionExample);
