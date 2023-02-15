import React from 'react';
import type {
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  TextStyleProps,
} from '@shopify/polaris';

const MyTextStyle = (
  _props: /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  TextStyleProps,
) => {
  return null;
};

export function App() {
  const textStyleProps: /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  /* Replace with: TextProps */
  TextStyleProps = {
    variation: 'positive',
  };

  return <MyTextStyle {...textStyleProps} />;
}
