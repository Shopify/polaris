import {Banner, BannerHandles} from '@shopify/polaris';
import React, {useEffect, useRef} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerWithFocusExample() {
  const banner = useRef<BannerHandles>(null);

  useEffect(() => banner.current?.focus(), []);

  return (
    <Banner
      title="High risk of fraud detected"
      onDismiss={() => {}}
      tone="critical"
      ref={banner}
    >
      <p>
        Before fulfilling this order or capturing payment, please review the
        fraud analysis and determine if this order is fraudulent
      </p>
    </Banner>
  );
}

export default withPolarisExample(BannerWithFocusExample);
