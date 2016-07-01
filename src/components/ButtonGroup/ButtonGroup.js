// @flow

import React from 'react';

import Stack from '../Stack';
import {Spacing} from '../shared';

type Props = {
  children?: any,
};

export default function ButtonGroup({children}: Props) {
  return <Stack spacing={Spacing.tight}>{children}</Stack>;
}
