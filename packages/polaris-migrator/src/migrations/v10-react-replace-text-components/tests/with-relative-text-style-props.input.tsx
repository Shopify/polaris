// @ts-nocheck
import React from 'react';

import type {TextStyleProps} from '../TextStyle';

const MyTextStyle = (_props: TextStyleProps) => {
  return null;
};

export function App() {
  const textStyleProps: TextStyleProps = {
    variation: 'positive',
  };

  return <MyTextStyle {...textStyleProps} />;
}
