import {Banner, Link} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerExample() {
  return (
    <Banner
      title="High risk of fraud detected"
      action={{content: 'Review risk analysis'}}
      tone="critical"
    >
      <p>
        Before fulfilling this order or capturing payment, please{' '}
        <Link url="">review the Risk Analysis</Link> and determine if this order
        is fraudulent.
      </p>
    </Banner>
  );
}

export default withPolarisExample(BannerExample);
