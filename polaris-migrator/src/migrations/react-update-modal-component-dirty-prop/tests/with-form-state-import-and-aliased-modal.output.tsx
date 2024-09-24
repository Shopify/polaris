import React, {useState} from 'react';
// @ts-expect-error
import {Modal as PolarisModal, TextContainer} from '@shopify/polaris-internal';
// @ts-expect-error
import FormState from '~/shared/utilities/react-form-state';

export function App() {
  const [dirty, setDirty] = useState(false);
  return (
    <FormState>
      {(formDetails) => {
        return (
          <PolarisModal
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
            dirty={dirty}
          >
            <PolarisModal.Section>
              <TextContainer>Lorem ipsum</TextContainer>
            </PolarisModal.Section>
          </PolarisModal>
        );
      }}
    </FormState>
  );
}
