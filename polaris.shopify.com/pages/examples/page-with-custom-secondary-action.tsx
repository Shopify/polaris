import {Page, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page title="General" secondaryActions={<Button>Save</Button>}>
      <p>Page content</p>
    </Page>
  );
}

export default withPolarisExample(PageExample);
