import {Frame, ContextualSaveBar} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function Example() {
  return (
    <div style={{height: '250px'}}>
      <Frame
        logo={{
          width: 86,
          contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
        }}
      >
        <ContextualSaveBar
          fullWidth
          message="Unsaved changes"
          saveAction={{
            onAction: () => console.log('add form submit logic'),
            loading: false,
            disabled: false,
          }}
          discardAction={{
            onAction: () => console.log('add clear form logic'),
          }}
        />
      </Frame>
    </div>
  );
}

export default withPolarisExample(Example);
