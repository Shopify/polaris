import {PageActions, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <PageActions
      primaryAction={<Button variant="primary">Save</Button>}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}

export default withPolarisExample(PageExample);
