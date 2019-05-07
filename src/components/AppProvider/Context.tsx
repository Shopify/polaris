import * as React from 'react';
import {AppProviderContextType} from './types';
import createPolarisContext from './utilities/createPolarisContext';

const AppProviderContext = React.createContext<AppProviderContextType>(
  createPolarisContext(),
);

export default AppProviderContext;
