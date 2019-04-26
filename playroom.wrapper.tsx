import React from 'react';
import {AppProvider} from './src';

export default ({children}) => (
  <AppProvider>{children}</AppProvider>
);

