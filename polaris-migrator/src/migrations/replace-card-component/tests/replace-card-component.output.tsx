import React from 'react';
import {AlphaCard, Text, AlphaStack} from '@shopify/polaris';

export function App() {
  return (
    <AlphaCard>
      <AlphaStack spacing="5" fullWidth>
        <Text as="h3" variant="headingMd">
          Online store dashboard
        </Text>
        <p>View a summary of your online store's performance</p>
      </AlphaStack>
    </AlphaCard>
  );
}
