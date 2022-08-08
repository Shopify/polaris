import {Page} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      title="General"
      secondaryActions={[{content: 'Delete', destructive: true}]}
    >
      <p>Page content</p>
    </Page>
  );
}

export default withPolarisExample(PageExample);
