'use client';

import {TextContainer} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../../src/components/PolarisExampleWrapper';

function TextContainerExample() {
  return (
    <TextContainer spacing="loose">
      <p>
        Manage your Shopify store on-the-go with real-time notifications, access
        to your dashboard, and order management, all from your smartphone.
      </p>
      <p>
        Shopify POS is the fastest and easiest way to start accepting Visa,
        Mastercard, American Express, and Discover right from your smartphone or
        tablet.
      </p>
    </TextContainer>
  );
}

export default withPolarisExample(TextContainerExample);
