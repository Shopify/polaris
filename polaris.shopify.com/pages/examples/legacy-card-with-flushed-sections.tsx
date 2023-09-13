import {LegacyCard, Image} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard>
      <LegacyCard.Section flush>
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
        />
      </LegacyCard.Section>
      <LegacyCard.Section subdued>
        <p>
          You can use sales reports to see information about your customers’
          orders based on criteria such as sales over time, by channel, or by
          staff.
        </p>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
