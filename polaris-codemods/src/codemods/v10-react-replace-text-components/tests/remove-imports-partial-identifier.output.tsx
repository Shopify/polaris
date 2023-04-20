import React from 'react';
import {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  Caption,
  Text,
} from '@shopify/polaris';

export function App() {
  const MyCaption =
    /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
    /* Replace with: Text */
    Caption;

  return (
    <>
      <MyCaption>MyCaption</MyCaption>
      <Text variant="bodySm" as="p">
        Caption
      </Text>
      <Text variant="heading4xl" as="p">
        DisplayText
      </Text>
    </>
  );
}
