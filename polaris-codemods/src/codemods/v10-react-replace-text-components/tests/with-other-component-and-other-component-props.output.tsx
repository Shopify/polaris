import React from 'react';
import type {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  HeadingProps,
} from '@shopify/polaris';
import {Text} from '@shopify/polaris';

const MyHeading = (
  _props: /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  HeadingProps,
) => {
  return null;
};

export function App() {
  const headingProps: /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  HeadingProps = {
    element: 'h3',
  };

  return (
    <>
      <Text variant="headingXs" as="h3">
        Subheading
      </Text>
      <MyHeading {...headingProps} />
    </>
  );
}
