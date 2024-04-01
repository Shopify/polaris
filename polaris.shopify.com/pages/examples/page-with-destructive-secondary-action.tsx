import {Page} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';
import {DeleteIcon} from '@shopify/polaris-icons';

function PageExample() {
  return (
    <Page
      title="General"
      secondaryActions={[
        {content: 'Delete', destructive: true, icon: DeleteIcon},
      ]}
    >
      <p>Page content</p>
    </Page>
  );
}

export default withPolarisExample(PageExample);
