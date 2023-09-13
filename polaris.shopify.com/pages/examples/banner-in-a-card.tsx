import {LegacyCard, Banner, Link, BlockStack} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BannerExample() {
  return (
    <LegacyCard title="Online store dashboard" sectioned>
      <BlockStack gap="4">
        <Banner onDismiss={() => {}}>
          <p>
            Use your finance report to get detailed information about your
            business. <Link url="">Let us know what you think</Link>
          </p>
        </Banner>

        <p>View a summary of your online store’s performance.</p>
      </BlockStack>
    </LegacyCard>
  );
}

export default withPolarisExample(BannerExample);
