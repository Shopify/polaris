import {Page, LegacyCard} from '@shopify/polaris';
import {ExternalIcon} from '@shopify/polaris-icons';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      title="Jar With Lock-Lid"
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Promote',
          external: true,
          icon: ExternalIcon,
          url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}

export default withPolarisExample(PageExample);
