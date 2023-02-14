import {Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card title="Online store dashboard">
      <Card.Section>
        <p>View a summary of your online store’s performance.</p>
      </Card.Section>

      <Card.Section>
        <p>
          View a summary of your online store’s performance, including sales,
          visitors, top products, and referrals.
        </p>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
