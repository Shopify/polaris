// @flow

import React from 'react';

import Stack from '../Stack';

type Props = {
  children?: any,
};

export default function ButtonGroup({children}: Props) {
  return <Stack spacing="tight">{children}</Stack>;
}
