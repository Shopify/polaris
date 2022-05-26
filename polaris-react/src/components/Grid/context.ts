import {createContext} from 'react';

import type {Breakpoints} from './Grid';

export const GridContext = createContext<Breakpoints>('');
