import * as React from 'react';
import {ThemeProviderContext} from '../../types';

const {Provider, Consumer} = React.createContext<ThemeProviderContext>({
  logo: null,
});

export {Provider, Consumer};
