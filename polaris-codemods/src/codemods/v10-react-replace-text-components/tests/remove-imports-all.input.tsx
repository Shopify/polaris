import React from 'react';
import {
  Caption,
  DisplayText,
  Heading,
  Subheading,
  TextStyle,
  VisuallyHidden,
} from '@shopify/polaris';

export function App() {
  return (
    <>
      <Caption>Caption</Caption>
      <DisplayText size="extraLarge">DisplayText</DisplayText>
      <Heading>Heading</Heading>
      <Subheading>Subheading</Subheading>
      <TextStyle>TextStyle - Default</TextStyle>
      <TextStyle variation="code">TextStyle - InlineCode</TextStyle>
      <VisuallyHidden>VisuallyHidden</VisuallyHidden>
    </>
  );
}
