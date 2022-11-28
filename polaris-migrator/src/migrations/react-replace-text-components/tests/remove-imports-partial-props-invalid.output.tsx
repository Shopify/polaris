import React from 'react';
import {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  Heading,
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  Subheading,
  Text,
} from '@shopify/polaris';

declare const element: string;

export function App() {
  return (
    <>
      <Text variant="heading4xl" as="p">
        DisplayText
      </Text>
      <Text variant="headingMd" as="h2">
        Heading - Default
      </Text>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Heading element="invalid">Heading - Invalid</Heading>
      <Text variant="headingMd" as="h2">
        Subheading - Default
      </Text>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Subheading element={element}>Subheading - Unknown</Subheading>
    </>
  );
}
