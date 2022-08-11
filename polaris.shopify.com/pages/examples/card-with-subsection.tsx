import {Card} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function CardExample() {
  return (
    <Card title="Customer">
      <Card.Section>
        <p>John Smith</p>
      </Card.Section>
      <Card.Section title="Addresses">
        <Card.Subsection>
          123 First St
          <br />
          Somewhere
          <br />
          The Universe
        </Card.Subsection>
        <Card.Subsection>
          123 Second St
          <br />
          Somewhere
          <br />
          The Universe
        </Card.Subsection>
      </Card.Section>
      <Card.Section>
        <Card.Subsection>
          A single subsection without a sibling has no visual appearance
        </Card.Subsection>
      </Card.Section>
    </Card>
  );
}

export default withPolarisExample(CardExample);
