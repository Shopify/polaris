// @ts-nocheck
import React from 'react';

import type {HeadingProps} from '../Heading';
import {TextStyle} from '../TextStyle';

const MyHeading = (_props: HeadingProps) => {
  return null;
};

export function App() {
  const headingProps: HeadingProps = {
    element: 'h3',
  };

  return (
    <>
      <TextStyle variation="warning">Warning</TextStyle>
      <MyHeading {...headingProps} />
    </>
  );
}
