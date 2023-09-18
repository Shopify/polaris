import {Button, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback, useRef} from 'react';

function ModalExample() {
  const [active, setActive] = useState(true);

  const button = useRef<HTMLDivElement>(null);

  const handleOpen = useCallback(() => setActive(true), []);

  const handleClose = useCallback(() => {
    setActive(false);
    requestAnimationFrame(() =>
      button.current?.querySelector('button')?.focus(),
    );
  }, []);

  return (
    <div style={{height: '500px'}}>
      <div ref={button}>
        <Button onClick={handleOpen}>Open</Button>
      </div>
      <Modal
        instant
        open={active}
        onClose={handleClose}
        title="Reach more shoppers with Instagram product tags"
        primaryAction={{
          content: 'Add Instagram',
          onAction: handleClose,
        }}
        secondaryActions={[
          {
            content: 'Learn more',
            onAction: handleClose,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
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

import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
export default withPolarisExample(() => <ModalExample />);
