import React from 'react';
// @ts-expect-error
import {Modal, TextContainer} from '@shopify/polaris-internal';
// @ts-expect-error
import FormState from '~/shared/utilities/react-form-state';

export function App() {
  return (
    <FormState>
      {(formDetails) => {
        return (
          /* Verify if `dirty` variable exists in the file */
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
      }}
    </FormState>
  );
}
