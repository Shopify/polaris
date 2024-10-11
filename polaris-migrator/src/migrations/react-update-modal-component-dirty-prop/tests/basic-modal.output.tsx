import React from 'react';
// @ts-expect-error
import {Modal, TextContainer} from '@shopify/polaris-internal';

export function App() {
  return (
    <Modal
      open={false}
      onClose={() => {}}
      title="Title"
      primaryAction={{
        content: 'Save',
        onAction: () => {},
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => {},
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>Lorem ipsum</TextContainer>
      </Modal.Section>
    </Modal>
  );
}
