import {Page, LegacyCard, LegacyStack, Button} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PageExample() {
  return (
    <Page
      breadcrumbs={[{content: 'Orders', url: '#'}]}
      title="#1085"
      secondaryActions={[
        {content: 'Print'},
        {content: 'Unarchive'},
        {content: 'Cancel order'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard sectioned title="Fulfill order">
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </LegacyStack.Item>
          <Button primary>Continue</Button>
        </LegacyStack>
      </LegacyCard>
    </Page>
  );
}

export default withPolarisExample(PageExample);
