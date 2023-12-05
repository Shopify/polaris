import {Button, Frame, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ModalWithScrollListenerExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleScrollBottom = useCallback(() => alert('Scrolled to bottom'), []);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Modal
          activator={activator}
          open={active}
          title="Scrollable content"
          onClose={handleChange}
          onScrolledToBottom={handleScrollBottom}
        >
          {Array.from({length: 50}, (_, index) => (
            <Modal.Section key={index}>
              <TextContainer>
                <p>
                  Item <a href="#">#{index}</a>
                </p>
              </TextContainer>
            </Modal.Section>
          ))}
        </Modal>
      </Frame>
    </div>
  );
}

export default withPolarisExample(ModalWithScrollListenerExample);
