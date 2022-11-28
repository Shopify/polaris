import React from 'react';
import {DisplayText, Heading, Subheading} from '@shopify/polaris';

declare const element: string;

export function App() {
  return (
    <>
      <DisplayText size="extraLarge">DisplayText</DisplayText>
      <Heading>Heading - Default</Heading>
      <Heading element="invalid">Heading - Invalid</Heading>
      <Heading>Subheading - Default</Heading>
      <Subheading element={element}>Subheading - Unknown</Subheading>
    </>
  );
}
