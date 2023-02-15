import React from 'react';
import type {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  CaptionProps,
} from '@shopify/polaris';
import {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: Text */
  Caption,
  Text,
} from '@shopify/polaris';

declare function MyCaption(
  props: /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  CaptionProps,
): JSX.Element;

export function App() {
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
