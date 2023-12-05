import {LegacyCard} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LegacyCardExample() {
  return (
    <LegacyCard title="Customer">
      <LegacyCard.Section>
        <p>John Smith</p>
      </LegacyCard.Section>
      <LegacyCard.Section title="Addresses">
        <LegacyCard.Subsection>
          123 First St
          <br />
          Somewhere
          <br />
          The Universe
        </LegacyCard.Subsection>
        <LegacyCard.Subsection>
          123 Second St
          <br />
          Somewhere
          <br />
          The Universe
        </LegacyCard.Subsection>
      </LegacyCard.Section>
      <LegacyCard.Section>
        <LegacyCard.Subsection>
          A single subsection without a sibling has no visual appearance
        </LegacyCard.Subsection>
      </LegacyCard.Section>
    </LegacyCard>
  );
}

export default withPolarisExample(LegacyCardExample);
