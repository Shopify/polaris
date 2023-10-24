import {PageActions} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={[
        {
          content: 'Delete',
          tone: 'critical',
          variant: 'primary',
        },
      ]}
    />
  );
}

export default withPolarisExample(PageExample);
