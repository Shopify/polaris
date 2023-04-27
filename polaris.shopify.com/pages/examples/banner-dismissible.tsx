import {Banner, Link} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerExample() {
  return (
    <Banner onDismiss={() => {}}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link href="">Let us know what you think</Link>
      </p>
    </Banner>
  );
}

export default withPolarisExample(BannerExample);
