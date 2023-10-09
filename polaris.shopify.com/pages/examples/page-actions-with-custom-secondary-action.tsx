import {PageActions, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={<Button>Save</Button>}
    />
  );
}

export default withPolarisExample(PageExample);
