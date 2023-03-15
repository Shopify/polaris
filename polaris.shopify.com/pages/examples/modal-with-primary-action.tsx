import {
  Button,
  Modal,
  LegacyStack,
  TextContainer,
  TextField,
} from '@shopify/polaris';
import {useState, useCallback, useRef} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ModalWithPrimaryActionExample() {
  const DISCOUNT_LINK = 'https://polaris.shopify.com/';

  const [active, setActive] = useState(true);
  const node = useRef<HTMLInputElement>(null);

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
          <LegacyStack vertical>
            <LegacyStack.Item>
              <TextContainer>
                <p>
                  You can share this discount link with your customers via email
                  or social media. Your discount will be automatically applied
                  at checkout.
                </p>
              </TextContainer>
            </LegacyStack.Item>
          </LegacyStack>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default withPolarisExample(ModalWithPrimaryActionExample);
