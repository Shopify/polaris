'use client';

import {Page, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      title="General"
      secondaryActions={
        <Button
          connectedDisclosure={{
            accessibilityLabel: 'Other save actions',
            actions: [{content: 'Save as new'}],
          }}
        >
          Save
        </Button>
      }
    >
      <p>Page content</p>
    </Page>
  );
}

export default withPolarisExample(PageExample);
