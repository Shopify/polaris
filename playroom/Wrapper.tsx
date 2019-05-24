import React from 'react';
import faker from 'faker';
import {AppProvider} from '../src';

interface Props {
  children: React.ReactNode;
}

export default function PlayroomAppProvider({children}: Props) {
  return <AppProvider>{children}</AppProvider>;
}
