import {Banner} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerExample() {
  return (
    <Banner
      title="USPS has updated their rates"
      action={{content: 'Update rates', url: ''}}
      secondaryAction={{content: 'Learn more'}}
      status="info"
      onDismiss={() => {}}
    >
      <p>Make sure you know how these changes affect your store.</p>
    </Banner>
  );
}

export default withPolarisExample(BannerExample);
