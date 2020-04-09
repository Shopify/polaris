import React from 'react';

import type {Theme} from './types';

export const ThemeContext = React.createContext<Theme | undefined>(undefined);
