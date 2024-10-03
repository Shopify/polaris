import React, {useState} from 'react';
// @ts-expect-error
import {TextContainer} from '@shopify/polaris-internal';

import {ModalWrapper} from './components/ModalWrapper/ModalWrapper';

// @ts-expect-error
import FormState from '~/shared/utilities/react-form-state';

export function App() {
  const [dirty, setDirty] = useState(false);
  return (
    <FormState>
      {(formDetails) => {
        return (
          <ModalWrapper
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
            <ModalWrapper.Section>
              <TextContainer>Lorem ipsum</TextContainer>
            </ModalWrapper.Section>
          </ModalWrapper>
        );
      }}
    </FormState>
  );
}
