import React from 'react';
import {AppProvider} from './src';

export default function AppProviderWrapper({children}: any) {
  return <AppProvider>{children}</AppProvider>;
}
