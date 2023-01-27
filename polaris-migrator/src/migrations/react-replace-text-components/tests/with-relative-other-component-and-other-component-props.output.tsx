// @ts-nocheck
import React from 'react';

import type {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  HeadingProps,
} from '../Heading';
import {Text} from '../Text';

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
      <Text variant="bodyMd" as="span" color="warning">
        Warning
      </Text>
      <MyHeading {...headingProps} />
    </>
  );
}
